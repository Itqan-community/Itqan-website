/**
 * Cloudflare Turnstile: public site key + server-side token check.
 *
 * The secret is read at request time from TURNSTILE_SECRET_KEY (Worker secret).
 */

// Public by design. Override at build time to use Cloudflare's dummy keys locally.
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAFaBUhqKLgoURocj";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** True only when Cloudflare confirms the token. Fails closed on any error. */
export async function verifyTurnstile(
  token: string,
  ip?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set; rejecting subscribe request");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const response = await fetch(SITEVERIFY_URL, { method: "POST", body });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}
