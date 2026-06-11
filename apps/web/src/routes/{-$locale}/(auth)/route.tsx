import { createFileRoute, Outlet } from "@tanstack/react-router";
import { authClient, authStateCollection, getAuthState } from "~/lib/auth-client";
import { stripLocalePrefix } from "@better-pos/i18n/tanstack-start/lib/strip-locale-prefix";
import { validateNavigateTo } from "@better-pos/i18n/tanstack-start/lib/validate-navigate-to";
import { redirect } from "@better-pos/i18n/tanstack-start/lib/redirect";

import { routeTree } from "~/routeTree.gen";

export const Route = createFileRoute("/{-$locale}/(auth)")({
  component: RouteComponent,
  beforeLoad: async () => {
    const cachedAuth = getAuthState();
    if (cachedAuth) {
      return cachedAuth;
    }
    const result = await authClient.getSession();
    if (!result.data) {
      const currentHref = stripLocalePrefix(location.href);
      const redirectTo = validateNavigateTo({
        fallbackTo: "/",
        routeTree,
        shouldIncludeRoute: (route) => !route.id.includes("(guest)"),
        to: currentHref,
      });

      throw redirect({
        search: {
          redirect: redirectTo,
        },
        to: "/login",
      });
    }
    authStateCollection.insert({ id: "auth", ...result.data });
    return result.data;
  },
});

function RouteComponent() {
  return <Outlet />;
}
