
import { createTRPCRouter, protectedProcedure } from '../init';

export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .query(async ({ctx}) => ({
        user:  (await (ctx.auth))?.session.userId,
        greeting: `hello hello project`,
    })),
});
// export type definition of API
export type AppRouter = typeof appRouter;