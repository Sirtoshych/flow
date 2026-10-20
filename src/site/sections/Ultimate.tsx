import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function Ultimate({ copy }: { copy: Copy }) {
  return (
    <section id="ultimate" className="section">
      <SectionHead no="06" />
      <div className="title-row">
        <h2 className="h2">{copy.uf1}<br /><span className="dot">{copy.uf2}</span></h2>
        <p className="uf__p">{copy.ufP}</p>
      </div>
      <div className="rules">
        {copy.ufRules.map(rule => (
          <div key={rule.k} className="rule">
            <span className="rule__k">{rule.k}</span>
            <span className="rule__title">{rule.title}</span>
            <span className="rule__body">{rule.body}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
