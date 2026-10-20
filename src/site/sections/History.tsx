import { TITLE_YEARS } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function History({ copy }: { copy: Copy }) {
  return (
    <section id="history" className="section">
      <SectionHead no="02" />
      <div className="title-row">
        <h2 className="h2">{copy.history}<span className="dot">.</span></h2>
        <div className="honours">
          {copy.honours.map(honour => (
            <div key={honour.v}>
              <b>{honour.v}</b>
              <span>{honour.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="timeline">
        {copy.timeline.map(entry => {
          const win = TITLE_YEARS.has(entry.y)
          return (
            <div key={entry.y} className="tl">
              <div className="tl__head">
                <span className="diamond" />
                <span className={`tl__year${win ? ' tl__year--win' : ''}`}>{entry.y}</span>
                {win && <span className="badge">{copy.champ}</span>}
              </div>
              <span className="tl__title">{entry.title}</span>
              <span className="tl__body">{entry.body}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
