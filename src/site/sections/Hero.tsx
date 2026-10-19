import { useEffect, useState } from 'react'

import { HERO_PHOTOS, asset } from '../data.js'
import type { Copy, Lang } from '../i18n.js'
import { LOCALE, countdown, nextTraining, type SiteEvent } from '../time.js'
import { Cta } from './Cta.js'

const NAV_IDS = ['trainings', 'history', 'achievements', 'players', 'media', 'calendar', 'sponsors']
const LANG_HREF: Record<Lang, string> = { pl: import.meta.env.BASE_URL, en: `${import.meta.env.BASE_URL}en/` }
const LANGS: Lang[] = ['pl', 'en']

type Props = { t: Copy; lang: Lang; now: number; next: SiteEvent | undefined }

export function Hero({ t, lang, now, next }: Props) {
  const [hero, setHero] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setHero(h => (h + 1) % HERO_PHOTOS.length), 5000)
    return () => clearInterval(id)
  }, [])

  const locale = LOCALE[lang]
  const training = nextTraining(now).toLocaleString(locale, { weekday: 'long' })

  return (
    <header id="top" className="hero">
      {HERO_PHOTOS.map((p, i) => (
        <img
          key={p.file}
          src={asset(p.file)}
          alt={p.alt}
          className={`cover hero__photo${i === hero ? ' is-active' : ''}`}
          style={{ objectPosition: p.pos }}
          fetchPriority={i === 0 ? 'high' : 'auto'}
        />
      ))}
      <div className="hero__shade" />

      <div className="hero__bar">
        <nav className="hero__nav">
          {NAV_IDS.map((id, i) => <a key={id} href={`#${id}`}>{t.nav[i]}</a>)}
          <a href={`${import.meta.env.BASE_URL}stats/`}>{t.stats}</a>
        </nav>
        <div className="lang">
          {LANGS.map(l => (
            <a key={l} href={LANG_HREF[l]} hrefLang={l} aria-current={l === lang ? 'page' : undefined}>{l.toUpperCase()}</a>
          ))}
        </div>
      </div>

      <div className="hero__cards">
        <div className="glass">
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
