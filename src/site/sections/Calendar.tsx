import type { Copy, Lang } from '../i18n.js'
import { LOCALE, type SiteEvent } from '../time.js'
import { SectionHead } from './SectionHead.js'

type Props = { t: Copy; lang: Lang; events: SiteEvent[]; next: SiteEvent | undefined }

export function Calendar({ t, lang, events, next }: Props) {
  const year = events[0]?.date.getFullYear() ?? new Date().getFullYear()
  const months = Array.from({ length: 12 }, (_, m) => ({
    name: new Date(year, m, 1).toLocaleString(LOCALE[lang], { month: 'long' }),
    items: events.filter(e => e.date.getFullYear() === year && e.date.getMonth() === m),
  }))

  return (
    <section id="calendar" className="section">
      <SectionHead no="08" />
      <h2 className="h2">{t.calendar} {year}<span className="dot">.</span></h2>
      <div className="months">
        {months.map(({ name, items }, m) => (
          <div key={name} className={`month${next !== undefined && items.includes(next) ? ' month--next' : ''}`}>
            <div className="month__head">
              <span className="month__name">{name}</span>
              <span className="month__no">{String(m + 1).padStart(2, '0')}</span>
            </div>
            {items.length === 0 && <span className="month__empty">{t.noEvents}</span>}
            {items.map(e => (
              <div key={e.date.getTime()} className="event">
                <span className="event__day">{String(e.date.getDate()).padStart(2, '0')}</span>
                <div className="event__body">
                  <span className="event__title">{e.title}</span>
                  <span className="event__desc">{e.desc}</span>
                  <span className={`kind${e.championship ? ' kind--champ' : ''}`}>{e.championship ? t.kinds.championship : t.kinds.tournament}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
