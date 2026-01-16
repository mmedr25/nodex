import { auth } from '@/features/auth/auth';
import { polarClient } from '@/features/payment/polar/init';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import superjson from 'superjson';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});


// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

// auth user
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'unauthorized' });
  }
  
  return next({ ctx: { ...ctx, auth: session, } });
});

// payed user
export const premiumProcedure = protectedProcedure.use(async ({ctx, next}) => {
  const customer = await polarClient.customers.getStateExternal({
    externalId: ctx.auth.user.id
  })
  if (!customer?.activeSubscriptions || customer?.activeSubscriptions?.length === 0) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'subscription required' });
  }

  return next({ctx: {...ctx, customer}})

})
