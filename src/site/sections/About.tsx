import { COACHES, FOUNDED, PLAYERS, SOCIALS, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { Cta } from './Cta.js'
import { SectionHead } from './SectionHead.js'

export function About({ copy, now }: { copy: Copy; now: number }) {
  const stats = [PLAYERS.length, COACHES.length]

  return (
    <section id="about" className="section section--about">
      <SectionHead no="01" />
      <div className="about__intro">
        <h2 className="about__h2 span2">{copy.about1}<br />{copy.about2}</h2>
        <div className="about__cta-col">
          <p className="text">{copy.aboutP1}</p>
          <div className="socials">
            {SOCIALS.map(social => (
              <a key={social.label} href={social.href} className="social" target="_blank" rel="noopener noreferrer">
                {social.label}
                <span aria-hidden="true">↗︎</span>
              </a>
            ))}
          </div>
        </div>
        <div className="about__cta-col">
          <p className="text">{copy.heroP}</p>
          <Cta href="#trainings" variant="dark">{copy.seeTrainings}</Cta>
        </div>
      </div>
      <div className="about__photos">
        <div className="about__team span2">
          <img src={asset('photo-team-black.webp')} alt="Flow team photo" className="cover" loading="lazy" />
          <div className="about__chips">
            {stats.map((value, index) => (
              <div key={copy.statLabels[index]} className="chip">
                <b>{value}+</b>
                <span>{copy.statLabels[index]}</span>
              </div>
            ))}
            <a href="#players" className="chip chip--link" aria-label={copy.nav[3]}>↗︎</a>
          </div>
        </div>
        <div className="about__side">
          <div className="about__throw">
            <img src={asset('photo-throw.webp')} alt="Flow player throwing" className="cover" style={{ objectPosition: '55% 40%' }} loading="lazy" />
          </div>
          <div className="years">
            <b>{new Date(now).getFullYear() - FOUNDED}</b>
            <span>{copy.years}</span>
          </div>
          <p className="motto">
            {copy.motto.map(word => <span key={word}>{word}</span>)}
          </p>
        </div>
      </div>
    </section>
  )
}
