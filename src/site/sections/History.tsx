import { TITLE_YEARS } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function History({ t }: { t: Copy }) {
  return (
    <section id="history" className="section">
      <SectionHead no="02" />
      <div className="title-row">
        <h2 className="h2">{t.history}<span className="dot">.</span></h2>
        <div className="honours">
          {t.honours.map(h => (
            <div key={h.v}>
              <b>{h.v}</b>
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="timeline">
        {t.timeline.map(e => {
          const win = TITLE_YEARS.has(e.y)
          return (
            <div key={e.y} className="tl">
              <div className="tl__head">
                <span className="diamond" />
                <span className={`tl__year${win ? ' tl__year--win' : ''}`}>{e.y}</span>
                {win && <span className="badge">{t.champ}</span>}
              </div>
              <span className="tl__title">{e.title}</span>
              <span className="tl__body">{e.body}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
