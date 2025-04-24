import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine base path based on build mode
  let base = '/Content_Translation/';
  let outDir = 'docs';
  
  if (mode === 'dev') {
    base = '/Content_Translation/dev/';
    outDir = 'docs/dev';
  } else if (mode === 'responsive') {
    base = '/Content_Translation/responsive/';
    outDir = 'docs/responsive';
  }
  
  return {
    plugins: [react()],
    base,
    build: {
      // Output directory based on build mode
      outDir
    }
  };
});