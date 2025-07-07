import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle root path explicitly
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ar", request.url));
  }
  
  // Use the intl middleware for all other paths
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};