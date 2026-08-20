import { NextResponse } from "next/server";
import { getNewsletterArchive } from "@/lib/mailerlite";

export const dynamic = "force-dynamic";

/** Confirms the server can see MAILERLITE_API_KEY and reach MailerLite. Does not expose the key. */
export async function GET() {
  try {
    const response = await getNewsletterArchive(1, 3);
    return NextResponse.json({
      configured: true,
      ok: true,
      count: response.data?.length ?? 0,
      total: response.meta?.total ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "MailerLite request failed";
    const missing = message.includes("MAILERLITE_API_KEY is not set");
    return NextResponse.json(
      { configured: !missing, ok: false, error: message },
      { status: missing ? 503 : 502 }
    );
  }
}
