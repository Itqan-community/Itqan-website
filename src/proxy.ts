import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "ar"] as const;

/**
 * Temporary 302 redirects for old locale-prefixed URLs.
 *
 * The previous site version used /en/* and /ar/* routes. The current version
 * uses flat routes with Arabic as the default language. These redirects keep
 * old Google/search-engine links working while preserving the option to
 * reintroduce locale-prefixed URLs in the future.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const localePrefix = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!localePrefix) {
    return NextResponse.next();
  }

  const newPath = pathname === `/${localePrefix}`
    ? "/"
    : pathname.slice(`/${localePrefix}`.length);

  const redirectUrl = new URL(`${newPath}${search}`, request.url);
  return NextResponse.redirect(redirectUrl, 302);
}

export const config = {
  matcher: [
    /*
     * Run on all request paths except for:
     * - API routes
     * - Next.js internals (_next/static, _next/image, _next/data)
     * - Static assets (images, fonts, icons)
     * - Metadata files (favicon, sitemap, robots)
     */
    "/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|svg|jpg|jpeg|gif|webp|ico|css|js|json|woff2|ttf|otf)$).*)",
  ],
};
