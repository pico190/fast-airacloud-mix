import { defineConfig } from 'vite';
import terser from 'terser';

const minify = false; // Cambia esto a true para minificar y ofuscar

let chunkCounter = 1;

export default defineConfig({
  build: {
    minify: minify ? 'terser' : false,
    rollupOptions: {
      output: {
        entryFileNames: () => `aira-chunk-${chunkCounter++}.js`,
        chunkFileNames: () => `aira-chunk-${chunkCounter++}.js`,
        assetFileNames: () => `aira-asset-${chunkCounter++}[extname]`,
      },
    },
    terserOptions: minify
      ? {
          compress: true,
          mangle: true,
          format: {
            comments: false,
          },
        }
      : {
          compress: false,
          mangle: false,
          format: {
            comments: true,
          },
        },
  },
});
