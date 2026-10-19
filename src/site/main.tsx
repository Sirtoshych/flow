import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import type { Lang } from './i18n.js'
import { Site } from './Site.js'
import './site.css'

const root = document.getElementById('root')
if (root === null) throw new Error('#root element missing from index.html')

const lang: Lang = document.documentElement.lang === 'en' ? 'en' : 'pl'

createRoot(root).render(<StrictMode><Site lang={lang} /></StrictMode>)
