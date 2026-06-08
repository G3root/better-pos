import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { ENV_SERVER } from "@better-pos/env/server";
import babel from "@rolldown/plugin-babel";
import { paraglideVitePlugin } from "@better-pos/i18n/vite/plugin";

export default defineConfig({
  /**
   * FIXME: This is needed for prerendering to work in Docker Compose builds
   * @see {@link https://github.com/TanStack/router/issues/6275}
   */
  preview: {
    host: "127.0.0.1",
  },
  define: {
    __BUILD_NODE_ENV__: JSON.stringify(ENV_SERVER.NODE_ENV),
    __BUILD_SOURCE_COMMIT__: JSON.stringify(ENV_SERVER.SOURCE_COMMIT),
  },
  server: {
    port: 3001,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    /** @see {@link https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#react-compiler} */
    babel({
      presets: [reactCompilerPreset()],
    }),
    paraglideVitePlugin(),
    /** @see {@link https://tanstack.com/start/latest/docs/framework/react/guide/hosting} */
    nitro({
      /**
       * We need to add this or else we will get `Error: Cannot find module 'react'` during prod.
       * FIXME: I haven't found a fix or related issue yet, but this is where I got the idea to trace the deps:
       * @see {@link https://github.com/nuxt/nuxt/issues/20773}
       * Recent Discord discussion on the matter
       * @see {@link https://discord.com/channels/719702312431386674/1490005967067414608}
       */
      traceDeps: ["react", "react-dom"],
    }),
  ],
});
