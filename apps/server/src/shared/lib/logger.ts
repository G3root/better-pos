import { ENV_SERVER } from "@better-pos/env/server";
import { LOG_SERVICES, initLogger } from "@better-pos/logger/server";

initLogger({
  env: {
    environment: ENV_SERVER.NODE_ENV,
    service: LOG_SERVICES.SERVER,
    version: ENV_SERVER.SOURCE_COMMIT,
  },
});
