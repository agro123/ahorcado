import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite: Vercel detecta este framework automáticamente
// y usa `npm run build` con la carpeta de salida `dist`.
export default defineConfig({
  plugins: [react()],
  // Rutas relativas en el build: dist/index.html funciona aunque se sirva
  // desde una subcarpeta (p. ej. Live Server abierto en la raíz del proyecto).
  base: './',
  // Puerto propio para no chocar con otros proyectos Vite (que usan 5173).
  server: { port: 3100, strictPort: true, open: true },
  preview: { port: 3101, strictPort: true },
});
