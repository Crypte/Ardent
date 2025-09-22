import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";
import fs from 'fs';

// Plugin pour précharger les fichiers markdown au build
function markdownPreloader() {
  return {
    name: 'markdown-preloader',
    load(id: string) {
      if (id.endsWith('.md?raw')) {
        const filePath = id.replace('?raw', '');
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          return `export default ${JSON.stringify(content)}`;
        } catch (error) {
          return `export default "";`;
        }
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), markdownPreloader()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md']
})