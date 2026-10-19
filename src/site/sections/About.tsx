import { COACHES, FOUNDED, PLAYERS, SOCIALS, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { Cta } from './Cta.js'
import { SectionHead } from './SectionHead.js'

export function About({ t, now }: { t: Copy; now: number }) {
  const stats = [PLAYERS.length, COACHES.length]

  return (
    <section id="about" className="section section--about">
      <SectionHead no="01" />
      <div className="about__intro">
        <h2 className="about__h2 span2">{t.about1}<br />{t.about2}</h2>
        <div className="about__cta-col">
          <p className="text">{t.aboutP1}</p>
          <div className="socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className="social" target="_blank" rel="noopener noreferrer">
                {s.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
        <div className="about__cta-col">
          <p className="text">{t.heroP}</p>
          <Cta href="#trainings" variant="dark">{t.seeTrainings}</Cta>
        </div>
      </div>
      <div className="about__photos">
        <div className="about__team span2">
          <img src={asset('photo-team-black.webp')} alt="Flow team photo" className="cover" loading="lazy" />
          <div className="about__chips">
            {stats.map((v, i) => (
              <div key={t.statLabels[i]} className="chip">
                <b>{v}+</b>
                <span>{t.statLabels[i]}</span>
              </div>
            ))}
            <a href="#players" className="chip chip--link" aria-label={t.nav[3]}>↗</a>
          </div>
        </div>
        <div className="about__side">
          <div className="about__throw">
            <img src={asset('photo-throw.webp')} alt="Flow player throwing" className="cover" style={{ objectPosition: '55% 40%' }} loading="lazy" />
          </div>
          <div className="years">
            <b>{new Date(now).getFullYear() - FOUNDED}</b>
            <span>{t.years}</span>
          </div>
          <p className="motto">
            {t.motto.map(w => <span key={w}>{w}</span>)}
          </p>
        </div>
      </div>
    </section>
  )
}
