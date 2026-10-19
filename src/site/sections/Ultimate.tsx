import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function Ultimate({ t }: { t: Copy }) {
  return (
    <section id="ultimate" className="section">
      <SectionHead no="06" />
      <div className="title-row">
        <h2 className="h2">{t.uf1}<br /><span className="dot">{t.uf2}</span></h2>
        <p className="uf__p">{t.ufP}</p>
      </div>
      <div className="rules">
        {t.ufRules.map(r => (
          <div key={r.k} className="rule">
            <span className="rule__k">{r.k}</span>
            <span className="rule__title">{r.title}</span>
            <span className="rule__body">{r.body}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
