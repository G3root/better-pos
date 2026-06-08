import { auth } from "@better-pos/auth";
import type { RequestLogger } from "@better-pos/logger/server";
import { type Context as HonoContext } from "hono";
import type { OrpcContext } from "../types";
export type CreateContextOptions = {
  context: HonoContext;
  logger: RequestLogger;
};

export async function createContext({
  context,
  logger,
}: CreateContextOptions): Promise<OrpcContext> {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  return {
    logger,
    session,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
