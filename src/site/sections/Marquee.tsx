import type { Copy } from '../i18n.js'

export function Marquee({ copy }: { copy: Copy }) {
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
    <a href="#trainings" className="marquee" title={copy.seeTrainings}>
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </a>
  )
}
