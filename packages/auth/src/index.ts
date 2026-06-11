import { createDb } from "@better-pos/db";
import * as schema from "@better-pos/db/schema/auth";
import { ENV_SERVER } from "@better-pos/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization, admin, openAPI } from "better-auth/plugins";
import { join } from "node:path";

export function createAuth() {
  const db = createDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",

      schema: schema,
    }),
    trustedOrigins: [ENV_SERVER.CORS_ORIGIN],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
    },
    secret: ENV_SERVER.BETTER_AUTH_SECRET,
    baseURL: new URL(ENV_SERVER.VITE_SERVER_URL).origin,
    basePath: join(new URL(ENV_SERVER.VITE_SERVER_URL).pathname, "auth"),

    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
    },
    plugins: [
      organization({
        allowUserToCreateOrganization: false,
      }),
      admin(),
      openAPI({
        theme: "deepSpace",
      }),
    ],
    telemetry: {
      enabled: false,
    },
  });
}

export const auth = createAuth();

export type AuthSession = typeof auth.$Infer.Session;
