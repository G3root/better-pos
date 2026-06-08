import { baseLocale, locales } from "@better-pos/i18n/runtime";

// We load it in vite.config.ts because they are originally from ENV_WEB_SERVER variables
declare const __BUILD_SOURCE_COMMIT__: string;

export const appConfig = Object.freeze({
  i18n: {
    baseLocale,
    cookieName: "LOCALE",
    locales,
  },
  site: {
    version: __BUILD_SOURCE_COMMIT__,
  },
});
