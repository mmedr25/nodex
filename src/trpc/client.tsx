import type { AppRouter } from "./router";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { useTRPC, TRPCProvider, useTRPCClient } =
  createTRPCContext<AppRouter>();
