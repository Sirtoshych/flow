import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import type { Lang } from './i18n.js'
import { PAGES } from './pages.js'
import { Site } from './Site.js'
import './site.css'

const root = document.getElementById('root')
if (root === null) throw new Error('#root element missing from index.html')

const lang: Lang = document.documentElement.lang === 'en' ? 'en' : 'pl'

const page = PAGES.find(candidate => candidate === document.documentElement.dataset.page) ?? 'home'

createRoot(root).render(<StrictMode><Site lang={lang} page={page} /></StrictMode>)
