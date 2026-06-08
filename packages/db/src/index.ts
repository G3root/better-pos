import { ENV_SERVER } from "@better-pos/env/server";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

export function createDb() {
  return drizzle(ENV_SERVER.DATABASE_URL, { schema });
}

export const db = createDb();
