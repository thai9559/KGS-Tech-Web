import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows Vite to accept connections from outside the container
    port: 5173, // The port Vite will run on
    strictPort: true, // If the port is already used, Vite will fail instead of picking another port
    watch: {
      usePolling: true, // This is needed to work well inside Docker
    },
    optimizeDeps: {
      include: ["jwt-decode"], // Đảm bảo Vite xử lý đúng module này
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
