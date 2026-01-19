"use client";

import EntityHeader from "@/components/shared/entity/header";
import { useCreateWorkflows } from "../query-hook";
import { useUpgradeModal } from "@/features/payment/hook";

export const WorkflowHeader = () => {
  const { handleError, modal } = useUpgradeModal();
  const { mutate, isPending } = useCreateWorkflows();

  return (
    <>
      {modal}
      <EntityHeader
        title="workflows"
        description="Create and manage your workflows"
        action={
          <EntityHeader.Action
            label="new workflow"
            disabled={isPending}
            onClick={() => mutate(undefined, {
              onError: (error) => handleError(error)
            })}
          />
        }
      />
    </>
  );
};
