import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "article",
      filename: "ArticleEntry.js",
      exposes: {
        "./ArticleForm": "./src/components/ArticleForm.tsx",
      },
      shared: ["react", "react-dom", "tailwindcss"],
      remotes: {
        "host-app": "http://localhost:4173/assets/hostEntry.js",
      },
    }),
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        assetFileNames: "assets/tailwind.css",
      },
    },
  },
});
