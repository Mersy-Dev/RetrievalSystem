import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { locales } from "./locales";

const defaultLocale = "en";
const localeCookieName = "NEXT_LOCALE";

const intlMiddleware = createMiddleware(routing); // Create once, reuse

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Hard exit for Next.js internals and static assets — return nothing (pass through)
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") // catches favicon.ico, images, etc.
    ) {
        return NextResponse.next();
    }

    console.log("in the middleware");

    // If path is already localized, just run intl middleware
    if (locales.some(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
        return intlMiddleware(req);
    }

    const localeFromCookie = req.cookies.get(localeCookieName)?.value;
    let preferredLocale = localeFromCookie;

    if (!preferredLocale) {
        const acceptLanguage = req.headers.get("accept-language");
        preferredLocale = acceptLanguage
            ?.split(",")
            .map(lang => lang.split(";")[0].trim())
            .find(lang => locales.includes(lang)) || defaultLocale;
    }

    // Clean path of any stray locale segments
    const segments = pathname.split("/").filter(seg => seg && !locales.includes(seg));
    const cleanPath = `/${segments.join("/")}`;

    const localePath = `/${preferredLocale}${cleanPath}`;
    const response = NextResponse.redirect(new URL(localePath, req.nextUrl.origin));

    response.cookies.set(localeCookieName, preferredLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: false,
        sameSite: "lax",
    });

    return response;
}

export const config = {
    matcher: ["/((?!_next|api|.*\\..*).*)"], // Cleaner: skips _next, api, and any file with an extension
};