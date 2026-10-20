import { EUCF, PODIUMS, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function Achievements({ copy }: { copy: Copy }) {
  const podiumCount = PODIUMS.reduce((sum, rows) => sum + rows.length, 0)
  const titleCount = PODIUMS.flat().filter(([, place]) => place === 1).length
  const cards = [
    ...PODIUMS.map((rows, index) => ({ head: copy.ach[index], rows: rows.map(([year, place]) => ({ year, label: copy.medals[place - 1], cls: `pill--${place}` })) })),
    { head: copy.ach[3], rows: EUCF.map(([year, place]) => ({ year, label: `${place}. ${copy.place}`, cls: 'pill--place' })) },
  ]

  return (
    <section id="achievements" className="section">
      <SectionHead no="03" />
      <div className="ach">
        <img src={asset('photo-trophy.webp')} alt="" className="cover ach__bg" loading="lazy" />
        <div className="title-row rel">
          <h2 className="h2">{copy.achievements}<span className="ice">.</span></h2>
          <div className="ach__stats">
            <div className="ach__stat">
              <b className="gold">{titleCount}×</b>
              <span>{copy.titlesTotal}</span>
            </div>
            <div className="ach__stat">
              <b className="ice">{podiumCount}</b>
              <span>{copy.podiums}</span>
            </div>
          </div>
        </div>
        <div className="ach__grid rel">
          {cards.map(({ head: [kicker, title], rows }) => (
            <div key={title} className="ach__card">
              <div className="ach__head">
                <span className="ach__kicker">{kicker}</span>
                <span className="ach__title">{title}</span>
              </div>
              <div>
                {rows.map(row => (
                  <div key={row.year} className="medal-row">
                    <b className={row.cls === 'pill--1' ? 'gold' : undefined}>{row.year}</b>
                    <span className={`pill ${row.cls}`}>{row.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
