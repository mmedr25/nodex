"use client"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import type { PrefetchOneWorkflowsProps } from "./prefetch"

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions({}))
}

export const useSuspenseOneWorkflow = (params: PrefetchOneWorkflowsProps) => {
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions(params))
}


export const useCreateWorkflows = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({})
            )
            toast.success(`workflow ${data.name} created`)
        },
        onError: () => {
            toast.error(`failed to create workflow`)
        }
    }))
}