import { type RouterClient } from "@orpc/server";

import { organizationRouter } from "#@/domains/organization/index";

export const appRouter = {
  organization: organizationRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
