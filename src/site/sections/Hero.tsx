import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { HERO_PHOTOS, HERO_PHOTOS_MOBILE, asset } from '../data.js'
import type { Copy, Lang } from '../i18n.js'
import { LOCALE, countdown, nextTraining, type SiteEvent } from '../time.js'
import { Cta } from './Cta.js'

const NAV_IDS = ['trainings', 'history', 'achievements', 'players', 'media', 'calendar', 'sponsors']
const LANG_HREF: Record<Lang, string> = { pl: import.meta.env.BASE_URL, en: `${import.meta.env.BASE_URL}en/` }
const LANGS: Lang[] = ['pl', 'en']
const MOBILE_QUERY = window.matchMedia('(max-width: 640px)')
const isMobile = () => MOBILE_QUERY.matches
const subscribeMobile = (onChange: () => void) => {
  MOBILE_QUERY.addEventListener('change', onChange)
  return () => MOBILE_QUERY.removeEventListener('change', onChange)
}

type Props = { t: Copy; lang: Lang; now: number; next: SiteEvent | undefined }

export function Hero({ t, lang, now, next }: Props) {
  const [hero, setHero] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobile = useSyncExternalStore(subscribeMobile, isMobile)
  const photos = mobile ? HERO_PHOTOS_MOBILE : HERO_PHOTOS

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setHero(h => h + 1), 5000)
    return () => clearInterval(id)
  }, [])

  const locale = LOCALE[lang]
  const training = nextTraining(now).toLocaleString(locale, { weekday: 'long' })
  const links = [...NAV_IDS.map((id, i) => ({ href: `#${id}`, label: t.nav[i] })), { href: `${import.meta.env.BASE_URL}stats/`, label: t.stats }]
  const closeMenu = () => menuRef.current?.hidePopover()

  return (
    <header id="top" className="hero">
      {photos.map((p, i) => (
        <img
          key={p.file}
          src={asset(p.file)}
          alt={p.alt}
          className={`cover hero__photo${i === hero % photos.length ? ' is-active' : ''}`}
          style={{ objectPosition: p.pos }}
          fetchPriority={i === 0 ? 'high' : 'auto'}
        />
      ))}
      <div className="hero__shade" />

      <div className="hero__bar">
        <nav className="hero__nav">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <button type="button" className="menu-btn" popoverTarget="menu">
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2" />
          </svg>
          {t.menu}
        </button>
        <div id="menu" ref={menuRef} popover="auto" className="menu">
          <div className="menu__head">
            <span className="menu__title">Flow Wrocław</span>
            <button type="button" className="menu__close" popoverTarget="menu" popoverTargetAction="hide" aria-label={t.close}>×</button>
          </div>
          <nav className="menu__nav" onClick={closeMenu}>
            {links.map(l => (
              <a key={l.href} href={l.href}>
                {l.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="lang">
          {LANGS.map(l => (
            <a key={l} href={LANG_HREF[l]} hrefLang={l} aria-current={l === lang ? 'page' : undefined}>{l.toUpperCase()}</a>
          ))}
        </div>
      </div>

      <div className="hero__cards">
        <div className="glass glass--training">
          <div className="glass__info glass__info--white">
            <span className="glass__eyebrow">{t.nextP}</span>
            <span className="glass__title">{training} · 20:00</span>
            <span className="glass__meta">{t.prSched}</span>
          </div>
          <div className="glass__action">
            <Cta href="#trainings" variant="blue" large>{t.join}</Cta>
          </div>
        </div>
        {next !== undefined && (
          <div className="glass">
            <div className="glass__info glass__info--blue">
              <span className="glass__eyebrow">{t.nextT}</span>
              <span className="glass__title">{next.title}</span>
              <span className="glass__meta">{next.date.toLocaleString(locale, { month: 'short', day: 'numeric' })} · {next.desc}</span>
            </div>
            <div className="countdown">
              {countdown(next.date.getTime(), now).map((v, i) => (
                <div key={t.units[i]}>
                  <b>{v}</b>
                  <span>{t.units[i]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="hero__bottom">
        <span className="hero__eyebrow">{t.teamEyebrow}</span>
        <div className="hero__row">
          <h1>Flow Wrocław</h1>
          <img src={asset('flow-badge.webp')} alt="Flow Wrocław Ultimate logo" className="hero__badge" />
        </div>
      </div>
    </header>
  )
}
