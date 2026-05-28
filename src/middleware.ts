import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["en", "ar", "tr"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  const skipPaths = [
    "/llms.txt",
    "/llms-full.txt",
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
    "/logo.png",
    "/google25a857f9c98e0560.html",
    "/Hamed_Mohamed_CV.pdf",
    "/icon.png",
  ];

  if (skipPaths.some((p) => pathname === p)) return;

  // Check if there is any supported locale in the pathname
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
    "/((?!_next|api|icon\\.png|logo\\.png|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt|google25a857f9c98e0560\\.html|favicon\\.ico|Hamed_Mohamed_CV\\.pdf).*)",
  ],
};
