import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locales = ["en", "ar"];
  const defaultLocale = "en";

  const pathIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathIsMissingLocale) {
    const cookieLocale = req.cookies.get("i18next")?.value;
    const headerLocale = req.headers
      .get("accept-language")
      ?.split(",")[0]
      .split("-")[0];

    let localeToUse = defaultLocale;
    if (cookieLocale && locales.includes(cookieLocale)) {
      localeToUse = cookieLocale;
    } else if (headerLocale && locales.includes(headerLocale)) {
      localeToUse = headerLocale;
    }

    return NextResponse.redirect(
      new URL(`/${localeToUse}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
