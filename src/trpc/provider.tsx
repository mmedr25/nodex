"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getQueryClient } from "./react-query-client";
import { trpcClient } from "./helper";
import { TRPCProvider } from "./client";

export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [client] = useState(trpcClient);
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={client} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
