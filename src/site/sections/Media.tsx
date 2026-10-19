import { MEDIA, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function Media({ t }: { t: Copy }) {
  return (
    <section id="media" className="section">
      <SectionHead no="07" />
      <h2 className="h2">{t.media}<span className="dot">.</span></h2>
      <div className="media">
        {MEDIA.map(m => (
          <div key={m.file} className={`media__cell ${m.span ?? ''}`}>
            <img src={asset(m.file)} alt={m.alt} style={{ objectPosition: m.pos }} loading="lazy" />
            {m.credit !== undefined && <span className="credit">{m.credit}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
