import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // --- ESTE ES EL BLOQUE QUE FALTABA ---
  server: {
    proxy: {
      // Cualquier petición a /api-iam será reenviada a IBM Cloud
      '/api-iam': {
        target: 'https://iam.cloud.ibm.com',
        changeOrigin: true, // Necesario para que el servidor de IBM acepte la petición
        rewrite: (path) => path.replace(/^\/api-iam/, ''), // Quita /api-iam del path
      },
      // Proxy para la URL de SCORING (corregido)
      '/api-scoring': {
        target: 'https://us-south.ml.cloud.ibm.com', // El target debe ser solo el dominio
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-scoring/, ''), // Quita /api-scoring
      }
    }
  }
  // --- FIN DEL BLOQUE ---
});