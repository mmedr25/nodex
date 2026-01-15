interface ExecutionPageProps
  extends PageProps<"/executions/[executionId]"> {}

async function ExecutionPage({ params }: ExecutionPageProps) {
  const { executionId } = await params;
  return <div>ExecutionPage id: {executionId}</div>;
}

export default ExecutionPage;
