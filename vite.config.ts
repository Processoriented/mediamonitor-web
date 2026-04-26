import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  /** LAN URL of mediamonitor-api (Docker on your server). Used only by `vite` dev server proxy. */
  const target = env.VITE_DEV_API_TARGET?.trim() || "http://127.0.0.1:8787";

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Browser calls same-origin `/api/...`; Vite forwards to the real API (no CORS in dev).
        "/api": {
          target,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  };
});
