import type { Route } from 'next'

type API_ROUTES_KEYS = "auth" | "trpc"
type AUTH_FORM_ROUTES_KEYS = "signin" | "signup"

export const API_ROUTES = {
    auth: "/api/auth",
    trpc: "/api/trpc",
} as unknown as Record<API_ROUTES_KEYS, Route>

// If user is authenticated will return to home page
export const AUTH_FORM_ROUTES = {
    signin: "/sign-in",
    signup: "/sign-up",
    forgot: "/forgot-password",
} as Record<AUTH_FORM_ROUTES_KEYS, Route>
// add public routes here don't change the proxy file on less needed
export const PUBLIC_ROUTES = [
    
] as Route[]

export const MOBILE_BREAKPOINT = 768
