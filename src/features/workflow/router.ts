import { tRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import z from "zod/v3";
import { workflowRepo } from "./repository";
import { PAGINATION } from "@/lib/constants";
import { TRPCError } from "@trpc/server";

export const workflowRouter = tRouter({
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

    getMany: premiumProcedure
        .input(z.object({
            page: z.number().default(PAGINATION.DEFAULT_PAGE),
            search: z.string().default(""),
            size: z
                .number()
                .min(PAGINATION.MIN_PAGE_SIZE)
                .max(PAGINATION.MAX_PAGE_SIZE)
                .default(PAGINATION.DEFAULT_PAGE_SIZE)

        }))
        .query(async ({ ctx, input }) => {
            const { page, size, search } = input

            return await workflowRepo.findAll.execute({ 
                userId: ctx.auth.user.id,
                search: `%${search}%`,
                size: size,
                offset: calcPaginationOffset(page, size)
            })
        }),
})

const calcPaginationOffset = (page: number, size: number) => {
    if (isNaN(page) || isNaN(size)) {
        throw new TRPCError({code: "BAD_REQUEST", message: "size and page should be numbers"})
    }
    return (page - 1) * size
}