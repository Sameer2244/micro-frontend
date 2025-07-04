import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host-app",
      remotes: {
        admin: "http://localhost:4174/assets/adminEntry.js",
      },
      filename: "hostEntry.js",
      exposes: {
        "./GlobalContext": "./src/context/GlobalContext.tsx",
        "./Link": "./src/components/LinkComponent.tsx",
        "./useNavigate": "./src/utilities/customNavigate.ts",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
