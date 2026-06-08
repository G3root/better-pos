import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./routeTree.gen";

import { CLIENT_ENV } from "@better-pos/env/web";
import { getQueryClient, QueryClientProvider } from "./providers/query-client.provider";
import { LOG_SERVICES, initLog } from "@better-pos/logger/client";

const browserLogEndpoint = `${CLIENT_ENV.VITE_SERVER_URL.replace(/\/$/, "")}/_logs/ingest`;

initLog({
  batchedTransport: {
    drain: {
      credentials: "include",
      endpoint: browserLogEndpoint,
    },
    pipeline: {
      batch: {
        intervalMs: 2000,
        size: 25,
      },
      retry: {
        maxAttempts: 3,
      },
    },
  },
  console: false,
  service: LOG_SERVICES.WEB_CLIENT,
});

export const getRouter = () => {
  const queryClient = getQueryClient();

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { queryClient },
    defaultPendingComponent: () => null,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  // Required when setting up React Query with SSR, see: https://tanstack.com/router/v1/docs/integrations/query
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    handleRedirects: true,
    // Since we have our own QueryClientProvider implementation, we need to disable the default one from the integration
    wrapQueryClient: false,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
