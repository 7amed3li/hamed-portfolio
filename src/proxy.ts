import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar", "tr"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle Chrome DevTools workspace inspection gracefully
  if (pathname.includes("com.chrome.devtools.json")) {
    return NextResponse.json({}, { status: 200 });
  }

  // Skip static files and API routes
  const skipPaths = [
    "/llms.txt",
    "/llms-full.txt",
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
    "/logo.png",
    "/google25a857f9c98e0560.html",
    "/Hamed_Mohamed_FullStack_NodeJS_CV.pdf",
    "/Hamed_Mohamed_CV.pdf",
    "/icon.png",
    "/rss.xml",
  ];

  if (skipPaths.some((p) => pathname === p)) return;
  
  // Skip any path that starts with /apps/ or /case-studies/ or /.well-known/ (for static assets)
  if (
    pathname.startsWith("/apps/") ||
    pathname.startsWith("/case-studies/") ||
    pathname.startsWith("/.well-known/")
  ) {
    return;
  }

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
    "/((?!_next|static|api|apps|case-studies|\\.well-known|icon\\.png|logo\\.png|robots\\.txt|sitemap\\.xml|rss\\.xml|llms\\.txt|llms-full\\.txt|google25a857f9c98e0560\\.html|favicon\\.ico|Hamed_Mohamed_FullStack_NodeJS_CV\\.pdf|Hamed_Mohamed_CV\\.pdf).*)",
  ],
};
