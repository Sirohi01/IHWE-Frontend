import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/sitemap.xml': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/sitemap/xml': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/robots.txt': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
    //           return 'vendor-react';
    //         }
    //         if (id.includes('lucide-react')) {
    //           return 'vendor-icons';
    //         }
    //         if (id.includes('framer-motion')) {
    //           return 'vendor-animation';
    //         }
    //         return 'vendor-libs';
    //       }
    //     }
    //   }
    // },
    chunkSizeWarningLimit: 2000,
  },
}));
