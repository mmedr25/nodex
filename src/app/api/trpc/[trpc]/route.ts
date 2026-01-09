import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
import { TRPC_PATHNAME } from '@/lib/constants';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: TRPC_PATHNAME,
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };