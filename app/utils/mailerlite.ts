const MAILERLITE_API_BASE = 'https://connect.mailerlite.com/api';
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWE2NzNhZjg0ZGU0ZWRiYWY5Y2MxZWI1MzM4MDE5ZThjZWZiMDg0ZTJjNGFlMzM4YTY5MDkzNTVlNjgyNjZhMDcyMWQ4NDRjODVkOTdmNDgiLCJpYXQiOjE3NTY2NTAwNzkuOTQzNzg3LCJuYmYiOjE3NTY2NTAwNzkuOTQzNzg5LCJleHAiOjQ5MTIzMjM2NzkuOTQwNDg5LCJzdWIiOiIxNzYwODI0Iiwic2NvcGVzIjpbXX0.BWycnrFNBRr2RDqDI8iF-puJQ9KSPnI29ZM6xZoBACNSD_UvGat7qtcWzgy_SngKPoOiuTgrtXp7Y1U1-NX-4M3i9ZRJeN0xLg-4J3CosBnScbaZlCMO7Rtm_GBy0sUp4pC-XF4_sTMKzMcLG_GrecsCgxKBc1E8LPN-5JZl3V8lVVYKw8AIf9aWh4dzojn040tMp16pvm00NMtACGeb8rdwxG9A0NoeCL7RP-OsGEkhqoNwgi-yXYT7dlpCaopoSB8ZKcF-e6gcOUD2qd5jviajI15tbXq0Wmr66l6kJ6zaIJs2FSTO297-ro7D_tBy0L-UD-xrpTHp-Vg7TSNWqxejxDzKSB9iIjojKEUxiZ9HYurSfPk7-gPppKNaKb2suLTRlqdsqickklvTIjvswq9c1OE7Q-tc2xnwD3PN1m64ifhlNVXPL5TY2yTP4tpR1Dvi_8z_xi2DxNuJ9Z7NOA_4lV3LD64Kv5eiC4QRaVzpf-oN0UI92QmFX3PkazO33H7jeh5NPnlNSsZVWHRkmPsoWqUMbOYVqe9sn-3PjGu3lSYF7CfxhK8FlLeoG6EvyZ77Xl5u_MyK7M9eG8ADWTSCw-YIu9Q0vB_KVBimuBc9FbT9caT_l85mtcQJbupKx89lTWAx6c84hSBBH2kc7uH8osbB49Gj3Jt0KNsWpCk';

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
 */
export async function getCampaigns(
  status: 'sent' | 'draft' | 'ready' = 'sent',
  type?: 'regular' | 'ab' | 'resend' | 'rss',
  limit = 25,
  page = 1
): Promise<MailerLiteApiResponse<MailerLiteCampaign[]>> {
  const params = new URLSearchParams({
    'filter[status]': status,
    limit: limit.toString(),
    page: page.toString(),
    sort: 'created_at',
  });

  if (type) {
    params.append('filter[type]', type);
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

/**
 * Get all sent campaigns for newsletter archive
 * This function specifically gets sent campaigns sorted by newest first
 */
export async function getNewsletterArchive(page = 1, limit = 10): Promise<MailerLiteApiResponse<MailerLiteCampaign[]>> {
  return getCampaigns('sent', 'regular', limit, page);
}
