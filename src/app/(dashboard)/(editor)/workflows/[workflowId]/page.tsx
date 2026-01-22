import Board from "@/features/editor/board";
import { prefetchOneWorkflows } from "@/features/workflow/prefetch";
import { HydrateClient } from "@/trpc/server";

interface ExecutionPageProps extends PageProps<"/workflows/[workflowId]"> {}

async function WorkflowPage({ params }: ExecutionPageProps) {
  const { workflowId } = await params;
  const queryParams = {id: workflowId}
  prefetchOneWorkflows(queryParams)

  return (
    <div className="flex flex-col size-full">
      <p className="border">WorkflowPage id: {workflowId}</p>
      <HydrateClient>
        <Board queryParams={queryParams}/>
      </HydrateClient>
    </div>
  );
}

export default WorkflowPage;
