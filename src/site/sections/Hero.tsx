import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { HERO_PHOTOS, HERO_PHOTOS_MOBILE, asset } from '../data.js'
import type { Copy, Lang } from '../i18n.js'
import { LOCALE, countdown, nextTraining, type SiteEvent } from '../time.js'
import { ArrowIcon } from './ArrowIcon.js'
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

type Props = { copy: Copy; lang: Lang; now: number; next: SiteEvent | undefined }

export function Hero({ copy, lang, now, next }: Props) {
  const [hero, setHero] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobile = useSyncExternalStore(subscribeMobile, isMobile)
  const photos = mobile ? HERO_PHOTOS_MOBILE : HERO_PHOTOS

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setHero(current => current + 1), 5000)
    return () => clearInterval(id)
  }, [])

  const locale = LOCALE[lang]
  const training = nextTraining(now).toLocaleString(locale, { weekday: 'long' })
  const links = NAV_IDS.map((id, index) => ({ href: `#${id}`, label: copy.nav[index] }))
  const closeMenu = () => menuRef.current?.hidePopover()

  return (
    <header id="top" className="hero">
      {photos.map((photo, index) => (
        <img
          key={photo.file}
          src={asset(photo.file)}
          alt={photo.alt}
          className={`cover hero__photo${index === hero % photos.length ? ' is-active' : ''}`}
          style={{ objectPosition: photo.pos }}
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
      ))}
      <div className="hero__shade" />

      <div className="hero__bar">
        <nav className="hero__nav">
          {links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <button type="button" className="menu-btn" popoverTarget="menu">
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2" />
          </svg>
          {copy.menu}
        </button>
        <div id="menu" ref={menuRef} popover="auto" className="menu">
          <div className="menu__head">
            <span className="menu__title">Flow Wrocław</span>
            <button type="button" className="menu__close" popoverTarget="menu" popoverTargetAction="hide" aria-label={copy.close}>×</button>
          </div>
          <nav className="menu__nav" onClick={closeMenu}>
            {links.map(link => (
              <a key={link.href} href={link.href}>
                {link.label}
                <ArrowIcon />
              </a>
            ))}
          </nav>
        </div>
        <div className="lang">
          {LANGS.map(code => (
            <a key={code} href={LANG_HREF[code]} hrefLang={code} aria-current={code === lang ? 'page' : undefined}>{code.toUpperCase()}</a>
          ))}
        </div>
      </div>

      <div className="hero__cards">
        <div className="glass glass--training">
          <div className="glass__info glass__info--white">
            <span className="glass__eyebrow">{copy.nextP}</span>
            <span className="glass__title">{training} · 20:00</span>
            <span className="glass__meta">{copy.prSched}</span>
          </div>
          <div className="glass__action">
            <Cta href="#trainings" variant="blue" large>{copy.join}</Cta>
          </div>
        </div>
        {next !== undefined && (
          <div className="glass">
            <div className="glass__info glass__info--blue">
              <span className="glass__eyebrow">{copy.nextT}</span>
              <span className="glass__title">{next.title}</span>
              <span className="glass__meta">{next.date.toLocaleString(locale, { month: 'short', day: 'numeric' })} · {next.desc}</span>
            </div>
            <div className="countdown">
              {countdown(next.date.getTime(), now).map((value, index) => (
                <div key={copy.units[index]}>
                  <b>{value}</b>
                  <span>{copy.units[index]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="hero__bottom">
        <span className="hero__eyebrow">{copy.teamEyebrow}</span>
        <div className="hero__row">
          <h1>Flow Wrocław</h1>
          <img src={asset('flow-badge.webp')} alt="Flow Wrocław Ultimate logo" className="hero__badge" />
        </div>
      </div>
    </header>
  )
}
