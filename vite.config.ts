import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  root: path.join(__dirname, './src/renderer'),
  build: {
    outDir: path.join(__dirname, './dist'),
    minify: true,
    rollupOptions: {
      treeshake: true,
    },
  },
});
