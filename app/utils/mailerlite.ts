const MAILERLITE_API_BASE = 'https://connect.mailerlite.com/api';
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWNkYTQyNTMwOTBiNWIwYmIzZGQwYTFhNjkzMDZmNDAxNjZlOWExNGM5MGRiMzI5YTNhOGY0MjM1MGU4NWM4MjQwOTMwZGQwNmE0Y2YzODkiLCJpYXQiOjE3ODMyNDE4NjkuNTk4ODE2LCJuYmYiOjE3ODMyNDE4NjkuNTk4ODIzLCJleHAiOjQ5Mzg5MTU0NjkuNTg2ODQyLCJzdWIiOiIyNDE4NTMwIiwic2NvcGVzIjpbXX0.GU-j9FUtny3UR2QTJ9gsaTJ84oMKDO0JHexe7rP6wBvUryHrknrlNYpnUeF7DoAq1Q6aujPhuXwUlLb5IOuKHceftY3YFOTyYhRn95mVVfCDl8mQSeoL8S0WbngcrZy9XoaYx7H0naOAsAtLXa5vfE_Z9NzUUnPLOcy1WaeI-VHjJpUBBgBI6dSk9ElESLh5o5igr2rJ3YKDSriErCLARkOdmZKbmy1Fj-Gu0IkWg6gqSo7wplWQeum7r-h_OIa2Vf1CCHo7vWHNXWSn6ePScPhRySEBaKkVKWIOQMuxVdWABYApqUjofdQjDVCVpQeg2AAzQuFqlx8P5BWHN0iOebn_gdlM8Ml5ibTDsqlHGoOikIO2EdXvb8mFvmW081joTXFzSoXk8FIEtppFa7c8M3iU46-mpo30RpqgYK25W9fmO3-EDpPilV7N9HvCRqQr0h-_RqEAKphKwUy9CPtj_eaPkV_F1-oKvM52fuS-gX0bxCFabY9GxWXcjA3Xh98hMs7exXN6ozU3onPrKeJvUwA0Xbd9BfWNKJKabATq-YPaZskpTIA4Iiqq7x--ySR95BrnR2OZwIJNb23QJniJ1Kl4wWE0NFzMwyqDqC-HqqsnWM7JtB0qklXtZmEw9ht8jsPwohLwcQI6CrwUP4BQ8rSB1I17fmcZw00LoT8pDgY';

// Types for MailerLite API responses
export interface MailerLiteSubscriber {
  id: string;
  email: string;
  status: string;
  source: string;
  sent: number;
  opens_count: number;
  clicks_count: number;
  open_rate: number;
  click_rate: number;
  ip_address: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
  fields: Record<string, any>;
  groups: any[];
  location: any;
  opted_in_at: string | null;
  optin_ip: string | null;
}

export interface MailerLiteCampaign {
  id: string;
  account_id: string;
  name: string;
  type: string;
  status: string;
  missing_data: any[];
  settings: {
    track_opens: boolean;
    use_google_analytics: boolean;
    ecommerce_tracking: boolean;
  };
  delivery_schedule: string;
  language_id: string;
  created_at: string;
  updated_at: string;
  scheduled_for: string | null;
  queued_at: string | null;
  started_at: string | null;
  finished_at: string | null;
  stopped_at: string | null;
  default_email_id: string;
  emails: MailerLiteEmail[];
  type_for_humans: string;
  stats: {
    sent: number;
    opens_count: number;
    unique_opens_count: number;
    open_rate: {
      float: number;
      string: string;
    };
    clicks_count: number;
    unique_clicks_count: number;
    click_rate: {
      float: number;
      string: string;
    };
    unsubscribes_count: number;
    unsubscribe_rate: {
      float: number;
      string: string;
    };
    spam_count: number;
    spam_rate: {
      float: number;
      string: string;
    };
    hard_bounces_count: number;
    hard_bounce_rate: {
      float: number;
      string: string;
    };
    soft_bounces_count: number;
    soft_bounce_rate: {
      float: number;
      string: string;
    };
    forwards_count: number;
    click_to_open_rate?: {
      float: number;
      string: string;
    };
  };
}

export interface MailerLiteEmail {
  id: string;
  account_id: string;
  emailable_id: string;
  emailable_type: string;
  type: string;
  from: string;
  from_name: string;
  reply_to: string;
  name: string | null;
  subject: string;
  plain_text: string;
  screenshot_url: string | null;
  preview_url: string | null;
  created_at: string;
  updated_at: string;
  is_designed: boolean;
  language_id: string | null;
  is_winner: boolean;
  stats: {
    sent: number;
    opens_count: number;
    unique_opens_count: number;
    open_rate: {
      float: number;
      string: string;
    };
    clicks_count: number;
    unique_clicks_count: number;
    click_rate: {
      float: number;
      string: string;
    };
    unsubscribes_count: number;
    unsubscribe_rate: {
      float: number;
      string: string;
    };
    spam_count: number;
    spam_rate: {
      float: number;
      string: string;
    };
    hard_bounces_count: number;
    hard_bounce_rate: {
      float: number;
      string: string;
    };
    soft_bounces_count: number;
    soft_bounce_rate: {
      float: number;
      string: string;
    };
    forwards_count: number;
  };
  send_after: string | null;
  track_opens: boolean;
  preheader: string;
}

export interface MailerLiteApiResponse<T> {
  data: T;
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    aggregations?: Record<string, any>;
  };
}

// Create headers for MailerLite API requests
const getHeaders = () => ({
  'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${MAILERLITE_API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`MailerLite API Error: ${response.status} - ${errorData}`);
  }

  return response.json();
}

/**
 * Get a list of campaigns
 * @param status - Filter by status: 'sent', 'draft', 'ready'
 * @param type - Filter by type: 'regular', 'ab', 'resend', 'rss'
 * @param limit - Number of campaigns per page (default: 25)
 * @param page - Page number (default: 1)
 * @param folder - Filter by folder ID (optional)
 */
export async function getCampaigns(
  status: 'sent' | 'draft' | 'ready' = 'sent',
  type?: 'regular' | 'ab' | 'resend' | 'rss',
  limit = 25,
  page = 1,
  folder?: string
): Promise<MailerLiteApiResponse<MailerLiteCampaign[]>> {
  const params = new URLSearchParams({
    'filter[status]': status,
    limit: limit.toString(),
    page: page.toString(),
    sort: '-created_at',
  });

  if (type) {
    params.append('filter[type]', type);
  }

  if (folder) {
    params.append('filter[folder]', folder);
  }

  return apiRequest<MailerLiteApiResponse<MailerLiteCampaign[]>>(`/campaigns?${params}`);
}

/**
 * Get a specific campaign by ID
 * @param campaignId - The campaign ID
 */
export async function getCampaign(campaignId: string): Promise<MailerLiteApiResponse<MailerLiteCampaign>> {
  return apiRequest<MailerLiteApiResponse<MailerLiteCampaign>>(`/campaigns/${campaignId}`);
}

/**
 * Subscribe a user to the newsletter with source tracking
 * @param email - User's email address
 * @param name - User's name (optional)
 * @param sourcepage - Source page identifier for tracking
 */
export async function subscribeToNewsletter(
  email: string,
  name?: string,
  sourcepage = 'homepage'
): Promise<MailerLiteApiResponse<MailerLiteSubscriber>> {
  const subscriberData: any = {
    email,
    fields: {
      sourcepage,
    },
  };

  if (name) {
    subscriberData.fields.name = name;
  }

  return apiRequest<MailerLiteApiResponse<MailerLiteSubscriber>>('/subscribers', {
    method: 'POST',
    body: JSON.stringify(subscriberData),
  });
}

/** Folder ID for newsletter campaigns in MailerLite */
const NEWSLETTER_FOLDER_ID = '176476919924000220';

/** Original send row (kept in archive for correct order); “Read” points at the corrected campaign below. */
const NEWSLETTER_ARCHIVE_REDIRECT_SOURCE_CAMPAIGN_ID = '179450149729208120';
const NEWSLETTER_ARCHIVE_REDIRECT_SOURCE_EMAIL_ID = '179450149758568250';

/** Corrected resend — omitted from archive so only the original row shows. */
const NEWSLETTER_ARCHIVE_HIDDEN_RESEND_CAMPAIGN_ID = '183367375509259543';
const NEWSLETTER_ARCHIVE_HIDDEN_RESEND_EMAIL_ID = '183367375552251177';
const NEWSLETTER_ARCHIVE_FORCE_HIDDEN_CAMPAIGN_IDS = new Set([
  NEWSLETTER_ARCHIVE_HIDDEN_RESEND_CAMPAIGN_ID,
  '183621222929532334',
]);

const NEWSLETTER_ARCHIVE_REDIRECT_BAREED_URL =
  'https://bareed.itqan.dev/preview/1744457/emails/183367375552251177';

function newsletterId(v: string | number | undefined | null): string {
  return v == null ? '' : String(v);
}

function isNewsletterArchiveRedirectSourceRow(c: MailerLiteCampaign): boolean {
  if (newsletterId(c.id) === NEWSLETTER_ARCHIVE_REDIRECT_SOURCE_CAMPAIGN_ID) return true;
  if (newsletterId(c.default_email_id) === NEWSLETTER_ARCHIVE_REDIRECT_SOURCE_EMAIL_ID) return true;
  return c.emails?.some((e) => newsletterId(e.id) === NEWSLETTER_ARCHIVE_REDIRECT_SOURCE_EMAIL_ID) ?? false;
}

function isNewsletterArchiveHiddenResendRow(c: MailerLiteCampaign): boolean {
  if (NEWSLETTER_ARCHIVE_FORCE_HIDDEN_CAMPAIGN_IDS.has(newsletterId(c.id))) return true;
  if (newsletterId(c.default_email_id) === NEWSLETTER_ARCHIVE_HIDDEN_RESEND_EMAIL_ID) return true;
  return c.emails?.some((e) => newsletterId(e.id) === NEWSLETTER_ARCHIVE_HIDDEN_RESEND_EMAIL_ID) ?? false;
}

/** Drop the duplicate corrected send; the original campaign row stays and links to the fix. */
export function filterNewsletterArchiveForDisplay(campaigns: MailerLiteCampaign[]): MailerLiteCampaign[] {
  return campaigns.filter((c) => !isNewsletterArchiveHiddenResendRow(c));
}

/** Bareed URL to open for this campaign (redirect row uses the hardcoded preview URL for the corrected email). */
export function getBareedNewsletterReadUrl(campaign: MailerLiteCampaign): string {
  if (isNewsletterArchiveRedirectSourceRow(campaign)) {
    return NEWSLETTER_ARCHIVE_REDIRECT_BAREED_URL;
  }
  const primary = campaign.emails[0];
  if (primary?.preview_url) {
    return primary.preview_url
      .replace('preview.mailerlite.com', 'bareed.itqan.dev')
      .replace('preview.mailerlite.io', 'bareed.itqan.dev');
  }
  return `https://bareed.itqan.dev/campaigns/${newsletterId(campaign.id)}`;
}

/** Whether to show “Read newsletter” (same as before, plus redirect-only rows without a usable preview). */
export function shouldShowNewsletterReadLink(campaign: MailerLiteCampaign): boolean {
  return Boolean(campaign.emails[0]?.preview_url) || isNewsletterArchiveRedirectSourceRow(campaign);
}

/**
 * Get all sent campaigns for newsletter archive
 * This function specifically gets sent campaigns from the newsletter folder, sorted by newest first
 */
export async function getNewsletterArchive(page = 1, limit = 10): Promise<MailerLiteApiResponse<MailerLiteCampaign[]>> {
  return getCampaigns('sent', 'regular', limit, page, NEWSLETTER_FOLDER_ID);
}
