import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  optimizeDeps: {
    include: ["@mui/material", "@mui/styled-engine", "@mui/system"],
  },
});
