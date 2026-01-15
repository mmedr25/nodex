interface ExecutionPageProps
  extends PageProps<"/workflows/[workflowId]"> {}

async function WorkflowPage({ params }: ExecutionPageProps) {
  const { workflowId } = await params;
  return <div>WorkflowPage id: {workflowId}</div>;
}

export default WorkflowPage;
