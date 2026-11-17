import type { ReactNode } from 'react'

import { COPY, type Lang } from './i18n.js'
import type { Page } from './pages.js'
import { localizedEvents, nextEvent, useNow } from './time.js'
import { About } from './sections/About.js'
import { Achievements } from './sections/Achievements.js'
import { Calendar } from './sections/Calendar.js'
import { Footer } from './sections/Footer.js'
import { Hero } from './sections/Hero.js'
import { History } from './sections/History.js'
import { Marquee } from './sections/Marquee.js'
import { Media } from './sections/Media.js'
import { Nav } from './sections/Nav.js'
import { Players } from './sections/Players.js'
import { Sponsors } from './sections/Sponsors.js'
import { Trainings } from './sections/Trainings.js'
import { Ultimate } from './sections/Ultimate.js'

export function Site({ lang, page }: { lang: Lang; page: Page }) {
  const copy = COPY[lang]
  const now = useNow(30_000)
  const events = localizedEvents(lang)
  const next = nextEvent(events, now)

  const content: Record<Page, ReactNode> = {
    home: (
      <>
        <About copy={copy} lang={lang} now={now} />
        <Achievements copy={copy} />
        <Ultimate copy={copy} />
        <Sponsors copy={copy} />
      </>
    ),
    history: <History copy={copy} />,
    trainings: <Trainings copy={copy} />,
    players: <Players copy={copy} />,
    media: <Media copy={copy} />,
    calendar: <Calendar copy={copy} lang={lang} events={events} next={next} />,
  }

  return (
    <div className="page">
      <div className="shell">
        {page === 'home' ? (
          <>
            <Hero copy={copy} lang={lang} now={now} next={next} />
            <Marquee copy={copy} lang={lang} />
          </>
        ) : (
          <header className="subhead">
            <Nav copy={copy} lang={lang} page={page} />
          </header>
        )}
        <main className="main">{content[page]}</main>
        <Footer copy={copy} />
      </div>
    </div>
  )
}
