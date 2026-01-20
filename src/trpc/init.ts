import "server-only"
import { auth } from '@/features/auth/auth';
import { polarClient } from '@/features/payment/polar/init';
import type { NotNull } from '@/lib/types';
import { initTRPC, TRPCError } from '@trpc/server';
import { SuperJSON } from 'superjson';
import { cache } from "react";


type Context = Awaited<ReturnType<typeof createTRPCContext>>

type AuthUser = NotNull<Awaited<Context["auth"]>>



const context = async (opts: { req: Request | { headers: Headers } }) => {
  return { auth: await auth.api.getSession({ headers: opts.req.headers }) };
};
export const createTRPCContext = cache(context)


const t = initTRPC.context<Context>().create({
  transformer: SuperJSON
});


const authUse = t.middleware(async ({ ctx, next }) => {
  const auth = ctx.auth

  if (!auth?.user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'unauthorized' });
  }

  return next({ ctx: { ...ctx, auth: auth as AuthUser } });
})


const premiumUserMiddleware = t.middleware(async ({ ctx, next }) => {
  const customer = await polarClient.customers.getStateExternal({
    externalId: (ctx.auth as AuthUser).user.id
  })

  if (!customer?.activeSubscriptions || customer?.activeSubscriptions?.length === 0) {
    throw new TRPCError({ code: 'PAYMENT_REQUIRED', message: 'subscription required' });
  }

  return next({ ctx: { ...ctx, customer, auth: ctx.auth as NotNull<Awaited<Context["auth"]>> } })
})


export const tRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(authUse);
export const premiumProcedure = protectedProcedure.use(premiumUserMiddleware)