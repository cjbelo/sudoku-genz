import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      devOptions: { enabled: false },
      includeAssets: ["**/*"],
      name: "Sudoku Gen Z",
      short_name: "Sudoku Gen Z",
      description: "Play the classic puzzle game with a modern twist",
      theme_color: "#fbf9fa",
      background_color: "#fbf9fa",
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        { src: "/pwa-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/pwa-icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: "/pwa-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/pwa-icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
});
