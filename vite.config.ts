import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { LANGS, PAGES, pagePath } from './src/site/pages.js'

const siteDirs = LANGS.flatMap(lang => PAGES.map(page => pagePath(lang, page)))
const entry = (dir: string) => fileURLToPath(new URL(`${dir}index.html`, import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: [...siteDirs, 'stats/'].map(entry),
    },
  },
})
