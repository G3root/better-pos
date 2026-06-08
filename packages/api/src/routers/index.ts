import { type RouterClient } from "@orpc/server";

import { privateRouter } from "#@/routers/private/index";

export const appRouter = {
  private: privateRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
