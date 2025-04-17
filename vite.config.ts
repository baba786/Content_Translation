import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine base path based on build mode
  const base = mode === 'dev'
    ? '/Content_Translation/dev/'
    : '/Content_Translation/';
  return {
    plugins: [react()],
    base,
    build: {
      // Output to docs for production, docs/dev for development build
      outDir: mode === 'dev' ? 'docs/dev' : 'docs'
    }
  };
});