import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./features/auth/auth";
import { API_ROUTES, AUTH_FORM_ROUTES, PUBLIC_ROUTES } from "./lib/constants";


const AUTH_LIST = Object.values(AUTH_FORM_ROUTES)

const PUBLIC_PATHS: string[] = [
    ...PUBLIC_ROUTES, //add public routes in constants.ts,
    ...AUTH_LIST,
    ...Object.values(API_ROUTES),

    // Next.js internals
    "/_next",
    "/favicon.ico",
];

function isPublicRoute(pathname: string) {
    return PUBLIC_PATHS.some(
        (route) =>
            pathname === route || pathname.startsWith(route + "/")
    );
}

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isAuthFormRoute = AUTH_LIST.includes(pathname)
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
    matcher: ["/((?!_next/static|_next/image).*)"],
};
