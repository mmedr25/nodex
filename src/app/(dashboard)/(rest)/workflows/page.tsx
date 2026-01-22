import WorkflowContainer from "@/features/workflow/components/workflow-container";
import { prefetchWorkflows } from "@/features/workflow/prefetch";
import { PAGINATION } from "@/lib/constants";
import { HydrateClient } from "@/trpc/server";

async function WorkflowsPage() {
  prefetchWorkflows({
    page: PAGINATION.DEFAULT_PAGE,
    size: PAGINATION.DEFAULT_PAGE_SIZE,
    search: "",
  });

  return (
    <HydrateClient>
      <WorkflowContainer />
    </HydrateClient>
  );
}

export default WorkflowsPage;
