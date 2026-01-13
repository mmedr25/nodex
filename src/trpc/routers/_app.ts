
import { google } from '@ai-sdk/google';
import { createTRPCRouter, protectedProcedure } from '../init';
import {generateText} from "ai"

export const appRouter = createTRPCRouter({
    helloAi: protectedProcedure.mutation(async () => {

        const { text } = await generateText({
            model: google("gemini-2.5-flash"),
            prompt: "How to bake the best chocolate cake"
        })

        return text
    }),


    hello: protectedProcedure
        .query(async ({ ctx }) => ({
            user: (await (ctx.auth))?.session.userId,
            greeting: `hello hello project`,
        })),
});
// export type definition of API
export type AppRouter = typeof appRouter;