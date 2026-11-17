import type { Copy, Lang } from '../i18n.js'
import { pageHref } from '../pages.js'

export function Marquee({ copy, lang }: { copy: Copy; lang: Lang }) {
  const run = (hidden: boolean) => (
    <div className="marquee__run" aria-hidden={hidden}>
      {copy.marquee.map(word => (
        <span key={word} className="marquee__item">
          <span className="marquee__word">{word}</span>
          <span className="marquee__sep" />
        </span>
      ))}
    </div>
  )

  return (
    <a href={pageHref(lang, 'trainings')} className="marquee" title={copy.seeTrainings}>
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </a>
  )
}
