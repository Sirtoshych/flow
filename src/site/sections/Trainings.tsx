import { CONTACT_URL, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { Cta } from './Cta.js'
import { SectionHead } from './SectionHead.js'
import { TrainingCarousel } from './TrainingCarousel.js'

export function Trainings({ copy }: { copy: Copy }) {
  return (
    <section id="trainings" className="section">
      <SectionHead no="04" />
      <h2 className="h2">{copy.trainings}<span className="dot">.</span></h2>
      <div className="info">
        <div className="info__price">
          <span className="info__label">{copy.price}</span>
          <span className="info__free">{copy.free}</span>
        </div>
        <div>
          <span className="info__label">{copy.when}</span>
          <span className="info__when">{copy.mon} · 20:00<br />{copy.wed} · 20:00</span>
        </div>
        <div>
          <span className="info__label">{copy.where}</span>
          <span className="info__text">{copy.whereV}</span>
        </div>
        <div>
          <span className="info__label">{copy.bring}</span>
          <span className="info__text">{copy.bringV}</span>
        </div>
      </div>
      <div className="map-row">
        <div className="map">
          <img src={asset('practice-map.webp')} alt={copy.mapAlt} className="cover" loading="lazy" />
        </div>
        <div className="join-card">
          <span className="join-card__title">{copy.join1}<br /><span className="ice">{copy.join2}</span></span>
          <Cta href={CONTACT_URL} variant="white" external>{copy.message}</Cta>
        </div>
      </div>
      <TrainingCarousel copy={copy} />
    </section>
  )
}
