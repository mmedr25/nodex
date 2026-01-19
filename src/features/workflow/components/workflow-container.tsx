import EntityContainer from "@/components/shared/entity/container";
import WorkflowList from "./workflow-list";
import { WorkflowHeader } from "./workflow-header";

function WorkflowContainer() {
  return (
    <EntityContainer
      header={
        <WorkflowHeader />
      }
    >
      <WorkflowList />
    </EntityContainer>
  );
}

export default WorkflowContainer;
