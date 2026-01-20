// import { prefetch } from "@/trpc/helper"
// import { prefetch } from "@/trpc/helper"
import { prefetch, trpc } from "@/trpc/server"
// import type { trpc } from "@/trpc/server"
// import { trpcServer } from "@/trpc/server"
import type { inferInput } from "@trpc/tanstack-react-query"

type PrefetchWorkflowsProps = inferInput<typeof trpc.workflows.getMany> 

export const prefetchWorkflows = async (params: PrefetchWorkflowsProps) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}