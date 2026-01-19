"use client"

import { useSuspenseWorkflows } from "../query-hook"

function WorkflowList() {
  const {data} = useSuspenseWorkflows()
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default WorkflowList