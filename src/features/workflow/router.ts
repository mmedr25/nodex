import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import z from "zod/v3";
import { workflowRepo } from "./repository";

export const workflowRouter = createTRPCRouter({
    create: premiumProcedure
        .mutation(async ({ ctx }) => {
            return (await workflowRepo.insert.execute({ userId: ctx.auth.user.id }))[0]
        }),

    remove: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            return (await workflowRepo.delete.execute({ id: input.id, userId: ctx.auth.user.id }))[0]
        }),

    getOne: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            return (await workflowRepo.findById.execute({ id: input.id, userId: ctx.auth.user.id }))[0]
        }),

    getMany: protectedProcedure
        .query(async ({ ctx }) => {
            return await workflowRepo.findAll.execute({ userId: ctx.auth.user.id })
        }),
})
