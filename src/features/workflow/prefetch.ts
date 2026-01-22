import { prefetch, trpc } from "@/trpc/server"
import type { inferInput } from "@trpc/tanstack-react-query"

export type PrefetchWorkflowsProps = inferInput<typeof trpc.workflows.getMany>
export type PrefetchOneWorkflowsProps = inferInput<typeof trpc.workflows.getOne>

export const prefetchWorkflows = async (params: PrefetchWorkflowsProps) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}

export const prefetchOneWorkflows = async (params: PrefetchOneWorkflowsProps) => {
    return prefetch(trpc.workflows.getOne.queryOptions(params))
}