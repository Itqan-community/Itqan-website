import { subscribeToNewsletter } from "@/app/utils/mailerlite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, sourcepage } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Subscribe to MailerLite
    const result = await subscribeToNewsletter(
      email,
      name || undefined,
      sourcepage || "api"
    );

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: result
    });

  } catch (error) {
    console.error("Newsletter subscription API error:", error);
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : "Failed to subscribe to newsletter" 
      },
      { status: 500 }
    );
  }
}
