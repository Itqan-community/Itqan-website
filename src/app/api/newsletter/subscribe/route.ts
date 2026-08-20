import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/mailerlite";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeBody {
  email?: string;
  name?: string;
  sourcepage?: string;
}

export async function POST(request: NextRequest) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, name, sourcepage } = body ?? {};

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    const subscriber = await subscribeToNewsletter(
      email,
      name || undefined,
      sourcepage || "api"
    );

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: subscriber,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { error: "Failed to subscribe to newsletter. Please try again." },
      { status: 502 }
    );
  }
}
