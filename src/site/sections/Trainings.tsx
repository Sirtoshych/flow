import { CONTACT_URL, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { Cta } from './Cta.js'
import { SectionHead } from './SectionHead.js'
import { TrainingCarousel } from './TrainingCarousel.js'

export function Trainings({ t }: { t: Copy }) {
  return (
    <section id="trainings" className="section">
      <SectionHead no="04" />
      <h2 className="h2">{t.trainings}<span className="dot">.</span></h2>
      <div className="info">
        <div className="info__price">
          <span className="info__label">{t.price}</span>
          <span className="info__free">{t.free}</span>
        </div>
        <div>
          <span className="info__label">{t.when}</span>
          <span className="info__when">{t.mon} · 20:00<br />{t.wed} · 20:00</span>
        </div>
        <div>
          <span className="info__label">{t.where}</span>
          <span className="info__text">{t.whereV}</span>
        </div>
        <div>
          <span className="info__label">{t.bring}</span>
          <span className="info__text">{t.bringV}</span>
        </div>
      </div>
      <div className="map-row">
        <div className="map">
          <img src={asset('practice-map.webp')} alt={t.mapAlt} className="cover" loading="lazy" />
        </div>
        <div className="join-card">
          <span className="join-card__title">{t.join1}<br /><span className="ice">{t.join2}</span></span>
          <Cta href={CONTACT_URL} variant="white" external>{t.message}</Cta>
        </div>
      </div>
      <TrainingCarousel t={t} />
    </section>
  )
}
