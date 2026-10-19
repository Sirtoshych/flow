import type { Copy } from '../i18n.js'

export function Marquee({ t }: { t: Copy }) {
  const run = (hidden: boolean) => (
    <div className="marquee__run" aria-hidden={hidden}>
      {t.marquee.map(w => (
        <span key={w} className="marquee__item">
          <span className="marquee__word">{w}</span>
          <span className="marquee__sep" />
        </span>
      ))}
    </div>
  )

  return (
    <a href="#trainings" className="marquee" title={t.seeTrainings}>
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </a>
  )
}
