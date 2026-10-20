import { COPY, type Lang } from './i18n.js'
import { localizedEvents, nextEvent, useNow } from './time.js'
import { About } from './sections/About.js'
import { Achievements } from './sections/Achievements.js'
import { Calendar } from './sections/Calendar.js'
import { Footer } from './sections/Footer.js'
import { Hero } from './sections/Hero.js'
import { History } from './sections/History.js'
import { Marquee } from './sections/Marquee.js'
import { Media } from './sections/Media.js'
import { Players } from './sections/Players.js'
import { Sponsors } from './sections/Sponsors.js'
import { Trainings } from './sections/Trainings.js'
import { Ultimate } from './sections/Ultimate.js'

export function Site({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  const now = useNow(30_000)
  const events = localizedEvents(lang)
  const next = nextEvent(events, now)

  return (
    <div className="page">
      <div className="shell">
        <Hero copy={copy} lang={lang} now={now} next={next} />
        <Marquee copy={copy} />
        <main className="main">
          <About copy={copy} now={now} />
          <History copy={copy} />
          <Achievements copy={copy} />
          <Trainings copy={copy} />
          <Players copy={copy} />
          <Ultimate copy={copy} />
          <Media copy={copy} />
          <Calendar copy={copy} lang={lang} events={events} next={next} />
          <Sponsors copy={copy} />
        </main>
        <Footer copy={copy} />
      </div>
    </div>
  )
}
