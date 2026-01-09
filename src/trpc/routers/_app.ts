
import { publicProcedure, createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .query(() => ({
        greeting: `hello hello project`,
    })),
});
// export type definition of API
export type AppRouter = typeof appRouter;