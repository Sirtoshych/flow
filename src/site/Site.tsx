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
  const t = COPY[lang]
  const now = useNow(30_000)
  const events = localizedEvents(lang)
  const next = nextEvent(events, now)

  return (
    <div className="page">
      <div className="shell">
        <Hero t={t} lang={lang} now={now} next={next} />
        <Marquee t={t} />
        <main className="main">
          <About t={t} now={now} />
          <History t={t} />
          <Achievements t={t} />
          <Trainings t={t} />
          <Players t={t} />
          <Ultimate t={t} />
          <Media t={t} />
          <Calendar t={t} lang={lang} events={events} next={next} />
          <Sponsors t={t} />
        </main>
        <Footer t={t} />
      </div>
    </div>
  )
}
