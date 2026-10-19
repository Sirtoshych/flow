import { EUCF, PODIUMS, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function Achievements({ t }: { t: Copy }) {
  const podiumCount = PODIUMS.reduce((sum, rows) => sum + rows.length, 0)
  const titleCount = PODIUMS.flat().filter(([, place]) => place === 1).length
  const cards = [
    ...PODIUMS.map((rows, i) => ({ head: t.ach[i], rows: rows.map(([y, p]) => ({ y, p, label: t.medals[p - 1], cls: `pill--${p}` })) })),
    { head: t.ach[3], rows: EUCF.map(([y, p]) => ({ y, p, label: `${p}. ${t.place}`, cls: 'pill--place' })) },
  ]

  return (
    <section id="achievements" className="section">
      <SectionHead no="03" />
      <div className="ach">
        <img src={asset('photo-trophy.webp')} alt="" className="cover ach__bg" loading="lazy" />
        <div className="title-row rel">
          <h2 className="h2">{t.achievements}<span className="ice">.</span></h2>
          <div className="ach__stats">
            <div className="ach__stat">
              <b className="gold">{titleCount}×</b>
              <span>{t.titlesTotal}</span>
            </div>
            <div className="ach__stat">
              <b className="ice">{podiumCount}</b>
              <span>{t.podiums}</span>
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
                {rows.map(r => (
                  <div key={r.y} className="medal-row">
                    <b className={r.cls === 'pill--1' ? 'gold' : undefined}>{r.y}</b>
                    <span className={`pill ${r.cls}`}>{r.label}</span>
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
