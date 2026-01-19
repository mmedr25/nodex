import { prefetch } from "@/trpc/helper"
import { trpc } from "@/trpc/server"
import type { inferInput } from "@trpc/tanstack-react-query"

type PrefetchWorkflowsProps = inferInput<typeof trpc.workflows.getMany> 

export const prefetchWorkflows = (params: PrefetchWorkflowsProps) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}