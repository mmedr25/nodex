import "server-only";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { appRouter } from "./router";
import { makeQueryClient } from "./react-query-client";
import { cache } from "react";
import { createTRPCContext } from "./init";
import { cookies } from "next/headers";
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { trpcClient } from "./helper";

async function createFreshHeaders(header?: HeadersInit) {
  const h = new Headers(header);

  // Forward ONLY the cookies you want.
  // Used for server rendering.
  // The cookie is not set for server request
  if (typeof window === "undefined") {
    h.set("cookie", (await cookies()).toString());
  }
  return h;
}

const context = async () => {
  return createTRPCContext({ req: { headers: await createFreshHeaders() } });
};


export const getQueryClientServer = cache(makeQueryClient);


export const trpc = createTRPCOptionsProxy({
  ctx: context,
  queryClient: getQueryClientServer,
  router: appRouter,
  client: trpcClient(),
});

// future use??
// export const caller = appRouter.createCaller(context);

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClientServer();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}


export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClientServer();

  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}
