import { workflowRouter } from '@/features/workflow/router';
import { tRouter } from './init';
 
export const appRouter = tRouter({
  workflows: workflowRouter
});
 
export type AppRouter = typeof appRouter;