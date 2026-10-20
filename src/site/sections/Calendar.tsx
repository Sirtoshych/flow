import type { Copy, Lang } from '../i18n.js'
import { LOCALE, type SiteEvent } from '../time.js'
import { SectionHead } from './SectionHead.js'

type Props = { copy: Copy; lang: Lang; events: SiteEvent[]; next: SiteEvent | undefined }

export function Calendar({ copy, lang, events, next }: Props) {
  const year = events[0]?.date.getFullYear() ?? new Date().getFullYear()
  const months = Array.from({ length: 12 }, (_, monthIndex) => ({
    name: new Date(year, monthIndex, 1).toLocaleString(LOCALE[lang], { month: 'long' }),
    items: events.filter(event => event.date.getFullYear() === year && event.date.getMonth() === monthIndex),
  }))

  return (
    <section id="calendar" className="section">
      <SectionHead no="08" />
      <h2 className="h2">{copy.calendar} {year}<span className="dot">.</span></h2>
      <div className="months">
        {months.map(({ name, items }, monthIndex) => (
          <div key={name} className={`month${next !== undefined && items.includes(next) ? ' month--next' : ''}`}>
            <div className="month__head">
              <span className="month__name">{name}</span>
              <span className="month__no">{String(monthIndex + 1).padStart(2, '0')}</span>
            </div>
            {items.length === 0 && <span className="month__empty">{copy.noEvents}</span>}
            {items.map(event => (
              <div key={event.date.getTime()} className="event">
                <span className="event__day">{String(event.date.getDate()).padStart(2, '0')}</span>
                <div className="event__body">
                  <span className="event__title">{event.title}</span>
                  <span className="event__desc">{event.desc}</span>
                  <span className={`kind${event.championship ? ' kind--champ' : ''}`}>{event.championship ? copy.kinds.championship : copy.kinds.tournament}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
