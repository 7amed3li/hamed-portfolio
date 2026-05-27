import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["en", "ar", "tr"];

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|logo\\.png|robots\\.txt|sitemap\\.xml|google25a857f9c98e0560\\.html|favicon\\.ico).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
