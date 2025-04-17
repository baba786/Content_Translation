# Claude Component Visualization Guide

This document provides instructions for visualizing Claude-generated TSX components using GitHub Pages.

## Quick Reference Commands

```bash
# Create a new React project with Vite
npx create-vite my-project --template react-ts
cd my-project

# Install dependencies
npm install

# Set up GitHub Pages
npm install gh-pages --save-dev

# Deploy to GitHub Pages
npm run deploy
```

## Step-by-Step Setup Process

### 1. Create a React Project with Vite

```bash
# Create a new React + TypeScript project with Vite
npx create-vite my-project --template react-ts
cd my-project

# Install dependencies
npm install
```

### 2. Configure for GitHub Pages

Edit `package.json` to add GitHub Pages configuration:

```json
{
  "name": "your-project-name",
  "private": true,
  "version": "0.0.0",
  "homepage": "https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  // ...dependencies
}
```

Edit `vite.config.ts` to add the base path:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',
})
```

### 3. Install GitHub Pages Deployment Package

```bash
npm install gh-pages --save-dev
```

### 4. Create Component Structure

```bash
# Create component directory
mkdir -p src/components/MyComponent

# Create component files
touch src/components/MyComponent/MyComponent.tsx
touch src/components/MyComponent/MyComponent.css
```

### 5. Update App.tsx

```tsx
import './App.css'
import MyComponent from './components/MyComponent/MyComponent'

function App() {
  return (
    <div className="app-container">
      <h1>Claude Component Demo</h1>
      <MyComponent />
    </div>
  )
}

export default App
```

### 6. Git Setup and Deployment

```bash
# Initialize git repo
git init
git add .
git commit -m "Initial setup"

# Create and push to GitHub repo
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

## CSS Strategy for Claude-Generated Components

### Option 1: Use Tailwind CSS (Recommended for most components)

```bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Option 2: Use Regular CSS

Create a CSS file for your component and import it in the component file:

```css
/* MyComponent.css */
.my-component {
  /* styles */
}
```

```tsx
// MyComponent.tsx
import './MyComponent.css'

const MyComponent = () => {
  return <div className="my-component">...</div>
}
```

## Common Issues and Solutions

### Issue: 404 Error After Deployment

**Solution:**
1. Ensure `homepage` in `package.json` has a trailing slash
2. Ensure the repository name in `vite.config.ts` matches your GitHub repo name exactly (case-sensitive)
3. In GitHub repository settings → Pages, ensure deployment source is set to "gh-pages" branch
4. Check for any GitHub Pages build errors in the Actions tab

### Issue: Tailwind CSS Not Working

**Solution:**
1. Ensure Tailwind directives are in your CSS file
2. Check `tailwind.config.js` content array is correctly set
3. For Vite projects, use the ES modules syntax in config files:

```js
// tailwind.config.js
export default {
  // config
}

// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Issue: TypeScript Errors with External Libraries

**Solution:**
1. Install the missing package: `npm install package-name`
2. Add proper TypeScript types for parameters and state variables
3. Remove unused state variables to avoid warnings

## Migration Strategy

When adding a Claude-generated component to your project:

1. Start with a component that uses Tailwind CSS if possible
2. Verify all required dependencies are installed
3. Add explicit TypeScript types to fix any type errors
4. If converting from Tailwind to regular CSS:
   - Create a comprehensive CSS file first
   - Change classes in small sections, testing frequently
   - Don't try to convert everything at once

## Lessons Learned

1. **Always test incrementally:** Make small changes and verify they work before proceeding
2. **Check for dependencies:** Claude may generate components that use libraries not included in your project
3. **Be careful with CSS conversions:** Converting between CSS frameworks (e.g., Tailwind to regular CSS) requires careful mapping of all classes
4. **For private repos:** GitHub Pages has limitations with private repositories; consider Netlify or Vercel instead
5. **Add proper TypeScript types:** Always add explicit types to props, state variables, and functions to avoid TypeScript errors