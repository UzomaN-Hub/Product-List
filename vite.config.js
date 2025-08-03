// NEW / CORRECT for v4
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss' // <-- 1. Import from the new package

export default defineConfig({
  plugins: [
    react() // <-- 2. Remove tailwindcss() from here
  ],
  // 3. Add this new 'css' section
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
      ],
    },
  },
})