import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

console.debug("⏳ [ENV_WEB_SERVER] Loading environment variables...", {
  SOURCE_COMMIT: process.env.SOURCE_COMMIT,
});

export const ENV_SERVER = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    SOURCE_COMMIT: z.string().min(1).default("unknown"),
    VITE_SERVER_URL: z.url(),
    ENABLE_OPEN_API_DOCS: z.stringbool().default(false),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
