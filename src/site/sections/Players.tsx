import { COACHES, PLAYERS, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

const CARD_BGS = ['#14162a', '#2b4fd6', '#0a2266', '#2a2d45']

export function Players({ copy }: { copy: Copy }) {
  return (
    <section id="players" className="section">
      <SectionHead no="05" />
      <h2 className="h2">{copy.roster1} {copy.roster2}<span className="dot">.</span></h2>
      <div className="roster">
        {PLAYERS.map(([name, num], index) => {
          const [first, ...rest] = name.split(' ')
          return (
            <div key={name} className="pcard" style={{ background: CARD_BGS[index % CARD_BGS.length] }}>
              <span className="pcard__num" aria-hidden="true">{num}</span>
              <div className="pcard__shade" />
              <div className="pcard__info">
                <span className="pcard__tag">#{num}</span>
                <span className="pcard__name">{first}<br />{rest.join(' ')}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="coaches">
        <h3 className="h3">{copy.coaches}<span className="dot">.</span></h3>
        <div className="coach-grid">
          {COACHES.map(({ first, last, photo }, index) => (
            <div key={last} className="coach">
              <div className="coach__photo">
                <img src={asset(photo.file)} alt={`${first} ${last}`} className="cover" style={{ objectPosition: photo.pos }} loading="lazy" />
                {photo.credit !== undefined && <span className="credit">{photo.credit}</span>}
              </div>
              <div className="coach__body">
                <span className="coach__role">{copy.coachRoles[index]}</span>
                <span className="coach__name">{first}<br />{last}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
