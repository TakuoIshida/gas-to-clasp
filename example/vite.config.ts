import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/main.ts', // エントリポイントを適宜修正
      output: {
        entryFileNames: '[name].js',
        format: 'cjs', // GAS用なら 'cjs' か 'iife' 推奨
      },
    },
    emptyOutDir: true,
    target: 'es2015',
    minify: false,
  },
});