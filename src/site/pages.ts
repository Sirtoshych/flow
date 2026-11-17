import type { Lang } from './i18n.js'

export const LANGS: Lang[] = ['pl', 'en']
export const PAGES = ['home', 'history', 'trainings', 'players', 'media', 'calendar'] as const
export type Page = (typeof PAGES)[number]

export const pagePath = (lang: Lang, page: Page) => `${lang === 'en' ? 'en/' : ''}${page === 'home' ? '' : `${page}/`}`
export const pageHref = (lang: Lang, page: Page) => `${import.meta.env.BASE_URL}${pagePath(lang, page)}`
