import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "comments-likes",
      filename: "CommentSectionEntry.js",
      exposes: {
        "./LikesComments": "./src/components/LikesComments.tsx",
      },
      shared: ["react", "react-dom"],
      remotes: {
        "host-app": "http://localhost:4173/assets/hostEntry.js",
      },
    }),
  ],
});
