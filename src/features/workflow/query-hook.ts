"use client"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions({
        // page: 1,
        // size: 10,
        // search: "test"
    }))
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