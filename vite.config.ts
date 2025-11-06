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
  server: {
    proxy: {
      // Cualquier petición a /api-iam será reenviada a IBM Cloud
      '/api-iam': {
        target: 'https://iam.cloud.ibm.com',
        changeOrigin: true, // Necesario para que el servidor de IBM acepte la petición
        rewrite: (path) => path.replace(/^\/api-iam/, ''), // Quita /api-iam del path
      },
      // Proxy para la URL de SCORING (opcional, pero recomendado)
      '/api-scoring': {
        target: 'https://us-south.ml.cloud.ibm.com/ml/v4/deployments/a460c30f-d67c-46d8-97ac-cf1dc15085e7/predictions?version=2021-05-01',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-scoring/, ''),
      }
    }
  }
});