import { type AuthSession } from "@better-pos/auth";
import type { RequestLogger } from "@better-pos/logger/server";

export type OrpcContext = {
  session: AuthSession | null;
  logger: RequestLogger;
};
