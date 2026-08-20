/**
 * MailerLite API client — server-only.
 *
 * The API key must stay on the server: it is read from MAILERLITE_API_KEY
 * (never NEXT_PUBLIC_*) and every call goes through a server component or a
 * route handler. The browser only ever talks to /api/newsletter/subscribe.
 */

const MAILERLITE_API_BASE = "https://connect.mailerlite.com/api";

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
  return process.env.MAILERLITE_API_KEY ?? "";
}

export function isMailerLiteConfigured(): boolean {
  return apiKey().length > 0;
}

async function apiRequest<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
  if (!isMailerLiteConfigured()) {
    throw new MailerLiteError("MAILERLITE_API_KEY is not set");
  }

  const response = await fetch(`${MAILERLITE_API_BASE}${endpoint}`, {
    ...init,
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

/** Sent, regular campaigns from the newsletter folder, newest first. */
export async function getNewsletterArchive(
  page = 1,
  limit = 10
): Promise<MailerLiteApiResponse<MailerLiteCampaign[]>> {
  const params = new URLSearchParams({
    "filter[status]": "sent",
    "filter[type]": "regular",
    "filter[folder]": NEWSLETTER_FOLDER_ID,
    limit: String(limit),
    page: String(page),
    sort: "-created_at",
  });

  return apiRequest<MailerLiteApiResponse<MailerLiteCampaign[]>>(`/campaigns?${params}`);
}

/*
 * One-off archive corrections (carried over from the previous site):
 * - campaign 179450149729208120 was sent with a broken email; the corrected
 *   resend (183367375509259543 / email 183367375552251177) is hidden so only
 *   the original row shows, and its "read" link points at the corrected email.
 */
const REDIRECT_SOURCE_CAMPAIGN_ID = "179450149729208120";
const REDIRECT_SOURCE_EMAIL_ID = "179450149758568250";
const HIDDEN_RESEND_EMAIL_ID = "183367375552251177";
const FORCE_HIDDEN_CAMPAIGN_IDS = new Set(["183367375509259543", "183621222929532334"]);
const REDIRECT_BAREED_URL = "https://bareed.itqan.dev/preview/1744457/emails/183367375552251177";

function campaignHasEmail(campaign: MailerLiteCampaign, emailId: string): boolean {
  return campaign.emails?.some((e) => String(e.id) === emailId) ?? false;
}

function isHiddenResendRow(campaign: MailerLiteCampaign): boolean {
  if (FORCE_HIDDEN_CAMPAIGN_IDS.has(String(campaign.id))) return true;
  if (String(campaign.default_email_id) === HIDDEN_RESEND_EMAIL_ID) return true;
  return campaignHasEmail(campaign, HIDDEN_RESEND_EMAIL_ID);
}

function isRedirectSourceRow(campaign: MailerLiteCampaign): boolean {
  if (String(campaign.id) === REDIRECT_SOURCE_CAMPAIGN_ID) return true;
  if (String(campaign.default_email_id) === REDIRECT_SOURCE_EMAIL_ID) return true;
  return campaignHasEmail(campaign, REDIRECT_SOURCE_EMAIL_ID);
}

/** Drop duplicate corrected resends; the original campaign row stays. */
export function filterNewsletterArchiveForDisplay(
  campaigns: MailerLiteCampaign[]
): MailerLiteCampaign[] {
  return campaigns.filter((c) => !isHiddenResendRow(c));
}

/** Reader URL on bareed.itqan.dev for a campaign's primary email. */
export function getBareedNewsletterReadUrl(campaign: MailerLiteCampaign): string {
  if (isRedirectSourceRow(campaign)) {
    return REDIRECT_BAREED_URL;
  }

  const primary = campaign.emails[0];
  if (primary?.preview_url) {
    return primary.preview_url
      .replace("preview.mailerlite.com", "bareed.itqan.dev")
      .replace("preview.mailerlite.io", "bareed.itqan.dev");
  }

  return `https://bareed.itqan.dev/campaigns/${campaign.id}`;
}
