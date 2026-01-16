import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./features/auth/auth";
import { AUTH_FORM_ROUTES, PUBLIC_ROUTES } from "./lib/constants";
import type { Route } from "next";


const AUTH_LIST = Object.values(AUTH_FORM_ROUTES)

function isPublicRoute(pathname: string) {
    return PUBLIC_ROUTES.some(
        (route) =>
            pathname === route || pathname.startsWith(route + "/")
    );
}

export async function proxy(req: NextRequest) {
    const { pathname }  = req.nextUrl;
    const isAuthFormRoute = AUTH_LIST.includes(pathname as Route) 
    // ✅ Allow public routes
    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

   const session = await auth.api.getSession({
        headers: await headers()
    })

    // 🔒 Not authenticated → redirect to sign-in
    if (!isAuthFormRoute && !session) {
        const signInUrl = new URL(AUTH_FORM_ROUTES.signin, req.url);
        signInUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(signInUrl);
    }

    // 🔒 Authenticated user should not access auth forms
    if (isAuthFormRoute && session) {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}