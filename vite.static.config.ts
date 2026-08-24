import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/HSAY-Tennis-Club/",
  build: { outDir: "static-dist", emptyOutDir: true, rollupOptions: { input: "static-entry.tsx" } },
});
