import WorkflowContainer from "@/features/workflow/components/workflow-container";
import { prefetchWorkflows } from "@/features/workflow/query";
import { HydrateClient } from "@/trpc/helper";

function WorkflowsPage() {
  prefetchWorkflows();

  return (
    <HydrateClient>
      <WorkflowContainer />
    </HydrateClient>
  );
}

export default WorkflowsPage;
