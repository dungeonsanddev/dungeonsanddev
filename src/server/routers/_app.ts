/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { courseRouter } from './course';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  course: courseRouter,
});

export type AppRouter = typeof appRouter;
