import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose to LAN
    port: 5173, // Use port 5173
    strictPort: true, // Fail if 5173 is not available
  },
});
