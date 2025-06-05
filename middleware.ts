import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { locales } from "./locales";

const defaultLocale = "en"; // Default language fallback (English)
const localeCookieName = "NEXT_LOCALE"; // Name of the cookie to store user locale preference

export function middleware(req: NextRequest) {
    console.log('in the middleware')
    const { pathname } = req.nextUrl; // Get the requested URL path
    const localeFromCookie = req.cookies.get(localeCookieName)?.value; // Retrieve locale from the user's cookie (if set)

    // Ignore middleware for Next.js internals, API routes, and static files
    if (
        pathname.startsWith("/_next") || // Ignore Next.js internal files
        pathname.startsWith("/api") || // Ignore API routes
        pathname.startsWith("/static") || // Ignore static files
        pathname.startsWith("/public") || // Ignore public assets
        pathname.startsWith("/images") || // Ignore image files
        locales.some(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) // Ignore already localized paths
    ) {
        return createMiddleware(routing)(req); // Continue with Next.js internationalization routing
    }

    console.log('pathname: ',pathname)
    let preferredLocale = localeFromCookie; // Use locale from the cookie if available

    console.log('locale in the cookie: ', preferredLocale)

    // Detect locale from the 'Accept-Language' header if no cookie is set
    if (!preferredLocale) {
        const acceptLanguage = req.headers.get("accept-language");
        preferredLocale = acceptLanguage
            ?.split(",")
            .map(lang => lang.split(";")[0]) // Extract language code without quality value (e.g., "en-US;q=0.9" → "en-US")
            .find(lang => locales.includes(lang)) || defaultLocale; // Match supported locales or fallback to default
    }

    console.log('preferred locale: ', preferredLocale)

    // Ensure no duplicate locales in the URL
    const segments = pathname.split("/").filter(seg => !locales.includes(seg));
    const cleanPath = `/${segments.join("/")}`; // Construct a cleaned-up path without redundant locales

    console.log('clean path: ',cleanPath);

    // Redirect if the URL does not already include a locale
    if (!locales.some(locale => pathname.startsWith(`/${locale}`))) {
        const localePath = `/${preferredLocale}${cleanPath}`;
        const response = NextResponse.redirect(new URL(localePath, req.nextUrl.origin));

        // Set the locale preference in a cookie for future visits
        response.cookies.set(localeCookieName, preferredLocale, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // Cookie expires in 30 days
            httpOnly: false, // Allow client-side access
            sameSite: "lax", // Helps prevent CSRF attacks while allowing cross-site navigation
        });

        return response;
    }

    return createMiddleware(routing)(req); // Continue with the request normally if locale is already present
}

// Configuration for Next.js middleware
export const config = {
    matcher: ["/((?!api|_next|static|images|public|favicon.ico).*)"], // Exclude static assets and Next.js internals from middleware processing
};
