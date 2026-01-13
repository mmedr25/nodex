"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC()
  const aiRecipe = useMutation(trpc.helloAi.mutationOptions())

  return (
    <div>
      <Button disabled={aiRecipe.isPending} onClick={() => aiRecipe.mutate()}>test recipe</Button>
      <p>home page</p>
      <p>{aiRecipe.data}</p>
    </div>
  );
}
