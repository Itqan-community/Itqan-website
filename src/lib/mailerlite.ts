/**
 * MailerLite API client — server-only.
 *
 * The API key must stay on the server: it is read from MAILERLITE_API_KEY
 * (never NEXT_PUBLIC_*) and every call goes through a server component or a
 * route handler. The browser only ever talks to /api/newsletter/subscribe.
 */

import { connection } from "next/server";
import {
  extractHiddenPreheader,
  newsletterPreviewHtmlUrl,
} from "@/lib/newsletter-preheader";

const MAILERLITE_API_BASE = "https://connect.mailerlite.com/api";

type NetlifyEnvHost = {
  env?: { get?: (key: string) => string | undefined };
};

/**
 * Read a server secret at request time.
 *
 * Static `process.env.NAME` can be inlined to "" during `next build` when
 * Netlify only injects the value into Functions, not the build. Dynamic
 * lookup + Netlify.env.get keep the runtime value. Trim handles paste noise.
 */
function readServerSecret(name: "MAILERLITE_API_KEY"): string {
  const candidates = [
    process.env.MAILERLITE_API_KEY,
    process.env[name],
    (globalThis as { Netlify?: NetlifyEnvHost }).Netlify?.env?.get?.(name),
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return "";
}

/** Folder that holds the إتقان newsletter campaigns in MailerLite. */
const NEWSLETTER_FOLDER_ID = "176476919924000220";

export interface MailerLiteEmail {
  id: string;
  subject: string;
  preheader: string;
  screenshot_url: string | null;
  preview_url: string | null;
}

export interface MailerLiteCampaign {
  id: string;
  name: string;
  status: string;
  created_at: string;
  scheduled_for: string | null;
  default_email_id: string;
  emails: MailerLiteEmail[];
}

export interface MailerLiteSubscriber {
  id: string;
  email: string;
  status: string;
}

export interface MailerLiteApiResponse<T> {
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export class MailerLiteError extends Error {}

function apiKey(): string {
  return readServerSecret("MAILERLITE_API_KEY");
}

export function isMailerLiteConfigured(): boolean {
  return apiKey().length > 0;
}

async function apiRequest<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
  // Request-time read so Netlify Function env is used, not a baked empty build value.
  await connection();

  if (!isMailerLiteConfigured()) {
    throw new MailerLiteError("MAILERLITE_API_KEY is not set");
  }

  const response = await fetch(`${MAILERLITE_API_BASE}${endpoint}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new MailerLiteError(`MailerLite API error ${response.status}: ${body}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Subscribe an email address to the newsletter with source tracking.
 * MailerLite is idempotent here: an existing subscriber is returned as-is.
 */
export async function subscribeToNewsletter(
  email: string,
  name?: string,
  sourcepage = "homepage"
): Promise<MailerLiteSubscriber> {
  const fields: Record<string, string> = { sourcepage };
  if (name) fields.name = name;

  const result = await apiRequest<MailerLiteApiResponse<MailerLiteSubscriber>>("/subscribers", {
    method: "POST",
    body: JSON.stringify({ email, fields }),
  });

  return result.data;
}

function campaignListParams(
  page: number,
  limit: number,
  folder?: string
): URLSearchParams {
  const params = new URLSearchParams({
    "filter[status]": "sent",
    "filter[type]": "regular",
    limit: String(limit),
    page: String(page),
    sort: "-created_at",
  });
  if (folder) params.set("filter[folder]", folder);
  return params;
}

/** Sent, regular campaigns from the newsletter folder, newest first. */
export async function getNewsletterArchive(
  page = 1,
  limit = 10
): Promise<MailerLiteApiResponse<MailerLiteCampaign[]>> {
  const withFolder = await apiRequest<MailerLiteApiResponse<MailerLiteCampaign[]>>(
    `/campaigns?${campaignListParams(page, limit, NEWSLETTER_FOLDER_ID)}`
  );

  if (page === 1 && (withFolder.data?.length ?? 0) === 0) {
    // filter[folder] is not in the public MailerLite docs; some tokens return [].
    console.warn(
      "MailerLite folder filter returned no campaigns; retrying without folder."
    );
    return apiRequest<MailerLiteApiResponse<MailerLiteCampaign[]>>(
      `/campaigns?${campaignListParams(page, limit)}`
    );
  }

  return withFolder;
}

/**
 * Visual-editor issues already have emails[].preheader. Custom HTML issues
 * leave it blank and hide the sentence in the body (#itqan-preheader, else
 * an mso-hide cell). Fill only the blank ones; leave a populated field.
 * When a card is redirected to a corrected send, parse that HTML instead.
 */
export async function enrichCampaignPreheaders(
  campaigns: MailerLiteCampaign[]
): Promise<MailerLiteCampaign[]> {
  return Promise.all(campaigns.map(enrichCampaignPreheader));
}

async function enrichCampaignPreheader(
  campaign: MailerLiteCampaign
): Promise<MailerLiteCampaign> {
  const primary = campaign.emails?.[0];
  const previewUrl =
    correctedPreviewUrl(campaign) ?? primary?.preview_url ?? null;
  if (!primary || primary.preheader?.trim() || !previewUrl) {
    return campaign;
  }

  try {
    const response = await fetch(newsletterPreviewHtmlUrl(previewUrl), {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "text/html" },
    });
    if (!response.ok) return campaign;

    const preheader = extractHiddenPreheader(await response.text());
    if (!preheader) return campaign;

    const emails = campaign.emails.slice();
    emails[0] = { ...primary, preheader };
    return { ...campaign, emails };
  } catch (error) {
    console.error(`Failed to read preheader for campaign ${campaign.id}:`, error);
    return campaign;
  }
}

/*
 * One-off archive corrections:
 * - Keep the original public campaign row (date / name).
 * - Hide the corrected resend so it does not appear as a second issue.
 * - Point "read" (and preheader HTML) at the corrected email.
 *
 * 179450149729208120: broken send; corrected email 183367375552251177.
 * 199479050565060301: newsletter 31 original; corrected email 200112311506044525.
 * 183621222929532334: meetup message, hidden with no redirect.
 */
const HIDDEN_IDS = new Set([
  "183367375509259543", // broken send resend campaign ID
  "183367375552251177", // broken send resend email ID
  "183621222929532334", // meetup message campaign ID
  "200112311506044525", // issue 31 self-resend email/campaign ID
]);

const PREVIEW_REDIRECTS: {
  sourceIds: string[];
  url: string;
}[] = [
  {
    // Issue 179450149729208120 (campaign/email 179450149758568250)
    sourceIds: ["179450149729208120", "179450149758568250"],
    url: "https://bareed.itqan.dev/preview/1744457/emails/183367375552251177",
  },
  {
    // Issue 31 (campaign/email 199479050565060301)
    sourceIds: ["199479050565060301"],
    url: "https://bareed.itqan.dev/preview/1744457/emails/200112311506044525",
  },
];

function campaignMatchesAnyId(campaign: MailerLiteCampaign, ids: Iterable<string>): boolean {
  const set = ids instanceof Set ? ids : new Set(ids);
  if (set.has(String(campaign.id))) return true;
  if (set.has(String(campaign.default_email_id))) return true;
  return campaign.emails?.some((e) => set.has(String(e.id))) ?? false;
}

function isHiddenResendRow(campaign: MailerLiteCampaign): boolean {
  return campaignMatchesAnyId(campaign, HIDDEN_IDS);
}

function correctedPreviewUrl(campaign: MailerLiteCampaign): string | null {
  for (const redirect of PREVIEW_REDIRECTS) {
    if (campaignMatchesAnyId(campaign, redirect.sourceIds)) {
      return redirect.url;
    }
  }
  return null;
}

/** Drop duplicate corrected resends; the original campaign row stays. */
export function filterNewsletterArchiveForDisplay(
  campaigns: MailerLiteCampaign[]
): MailerLiteCampaign[] {
  return campaigns.filter((c) => !isHiddenResendRow(c));
}

/** Reader URL on bareed.itqan.dev for a campaign's primary email. */
export function getBareedNewsletterReadUrl(campaign: MailerLiteCampaign): string {
  const redirected = correctedPreviewUrl(campaign);
  if (redirected) return redirected;

  const primary = campaign.emails[0];
  if (primary?.preview_url) {
    return primary.preview_url
      .replace("preview.mailerlite.com", "bareed.itqan.dev")
      .replace("preview.mailerlite.io", "bareed.itqan.dev");
  }

  return `https://bareed.itqan.dev/campaigns/${campaign.id}`;
}
