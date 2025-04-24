import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

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
  
  // For debugging
  console.log(`Using base: ${base} and outDir: ${outDir} for mode: ${mode}`);
  
  // Ensure output directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`Created directory: ${outDir}`);
  }
  
  return {
    plugins: [react()],
    base,
    build: {
      // Output directory based on build mode
      outDir,
      // Ensure clean build without overwriting .git folder
      emptyOutDir: true
    }
  };
});