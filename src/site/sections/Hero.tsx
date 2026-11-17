import { useEffect, useState, useSyncExternalStore } from 'react'

import { HERO_PHOTOS, HERO_PHOTOS_MOBILE, asset } from '../data.js'
import type { Copy, Lang } from '../i18n.js'
import { pageHref } from '../pages.js'
import { LOCALE, countdown, nextTraining, type SiteEvent } from '../time.js'
import { Cta } from './Cta.js'
import { Nav } from './Nav.js'

const MOBILE_QUERY = window.matchMedia('(max-width: 640px)')
const isMobile = () => MOBILE_QUERY.matches
const subscribeMobile = (onChange: () => void) => {
  MOBILE_QUERY.addEventListener('change', onChange)
  return () => MOBILE_QUERY.removeEventListener('change', onChange)
}

type Props = { copy: Copy; lang: Lang; now: number; next: SiteEvent | undefined }

export function Hero({ copy, lang, now, next }: Props) {
  const [hero, setHero] = useState(0)
  const mobile = useSyncExternalStore(subscribeMobile, isMobile)
  const photos = mobile ? HERO_PHOTOS_MOBILE : HERO_PHOTOS

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setHero(current => current + 1), 5000)
    return () => clearInterval(id)
  }, [])

  const locale = LOCALE[lang]
  const training = nextTraining(now).toLocaleString(locale, { weekday: 'long' })

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

      <Nav copy={copy} lang={lang} page="home" />

      <div className="hero__cards">
        <div className="glass glass--training">
          <div className="glass__info glass__info--white">
            <span className="glass__eyebrow">{copy.nextP}</span>
            <span className="glass__title">{training} · 20:00</span>
            <span className="glass__meta">{copy.prSched}</span>
          </div>
          <div className="glass__action">
            <Cta href={pageHref(lang, 'trainings')} variant="blue" large>{copy.join}</Cta>
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
