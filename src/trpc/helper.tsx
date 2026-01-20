import { API_ROUTES } from "@/lib/constants";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import type { AppRouter } from "./router";


const baseURl = () => {
  if (process.env.NEXT_PUBLIC_BASE_API_URL)
    return process.env.NEXT_PUBLIC_BASE_API_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (typeof window !== "undefined") return "";
  return "http://localhost:3000";
};


export function getTRPCUrl() {
  const url = new URL(baseURl());
  url.pathname = API_ROUTES.trpc;
  return url.toString();
}


export const trpcClient = () => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: getTRPCUrl(),
        transformer: SuperJSON,
        fetch: typeof window === 'undefined' ? serverFetch : fetch,
      }),
    ],
  });
};


export async function serverFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {

  const {headers} = await import("next/headers")
  const headersList = await headers();
  const cookie = headersList.get('cookie');
  
  const initWithCookies = {
    ...init,
    headers: {
      ...init?.headers,
      ...(cookie ? { cookie } : {}),
    },
  };
  
  return fetch(input, initWithCookies);
}
