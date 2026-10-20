import { MEDIA, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

export function Media({ copy }: { copy: Copy }) {
  return (
    <section id="media" className="section">
      <SectionHead no="07" />
      <h2 className="h2">{copy.media}<span className="dot">.</span></h2>
      <div className="media">
        {MEDIA.map(item => (
          <div key={item.file} className={`media__cell ${item.span ?? ''}`}>
            <img src={asset(item.file)} alt={item.alt} style={{ objectPosition: item.pos }} loading="lazy" />
            {item.credit !== undefined && <span className="credit">{item.credit}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
