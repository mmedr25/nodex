import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { API_ROUTES } from '@/lib/constants';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/router';
import { headers } from 'next/headers';



async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: API_ROUTES.trpc,
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req })
  });
}
export { handler as GET, handler as POST };