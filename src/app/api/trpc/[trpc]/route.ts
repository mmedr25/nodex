import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
import { API_ROUTES } from '@/lib/constants';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: API_ROUTES.trpc,
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };