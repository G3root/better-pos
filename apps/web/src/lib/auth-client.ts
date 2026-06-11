import { CLIENT_ENV } from "@better-pos/env/web";
import { createAuthClient } from "better-auth/react";
import { createCollection, localOnlyCollectionOptions } from "@tanstack/react-db";
import { z } from "zod";

export const authClient = createAuthClient({
  baseURL: CLIENT_ENV.VITE_SERVER_URL,
});

const authStateSchema = z.object({
  id: z.string(),
  session: z.any().nullable(),
  user: z.any().nullable(),
});

export const authStateCollection = createCollection(
  localOnlyCollectionOptions({
    id: "auth-state",
    getKey: (item) => item.id,
    schema: authStateSchema,
  }),
);

export function getAuthState() {
  const auth = authStateCollection.get("auth");
  if (auth && auth.session && new Date(auth.session.expiresAt) > new Date()) {
    return auth;
  }
  return null;
}
