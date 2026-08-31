import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/HSAY-Tennis-Club/",
  build: {
    outDir: "static-dist",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        home: "static-entry.tsx",
        member: "static-member-entry.tsx",
        about: "static-about-entry.tsx",
      },
    },
  },
});
