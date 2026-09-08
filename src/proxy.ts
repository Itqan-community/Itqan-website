import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["ar", "en"];

function hasLocalePrefix(pathname: string): boolean {
  const first = pathname.split("/")[1] ?? "";
  return LOCALES.includes(first);
}

/** Matches "ar" as a standalone language tag in Accept-Language, e.g.
    "ar-SA,ar;q=0.9,en;q=0.8" but not "en" or "az". */
function prefersArabic(acceptLanguage: string): boolean {
  return /(?:^|,)\s*ar(?:[-;,]|$)/.test(acceptLanguage);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasLocalePrefix(pathname)) return;

  const url = request.nextUrl.clone();
  if (pathname === "/") {
    const locale = prefersArabic(request.headers.get("accept-language") ?? "")
      ? "ar"
      : "en";
    url.pathname = `/${locale}`;
  } else {
    // Legacy bare paths (pre-localization bookmarks) → the Arabic site.
    url.pathname = `/ar${pathname}`;
  }
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
