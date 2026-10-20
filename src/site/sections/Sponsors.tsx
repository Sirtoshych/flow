import { CONTACT_URL } from '../data.js'
import type { Copy } from '../i18n.js'
import { SectionHead } from './SectionHead.js'

const LOGO_SLOTS = ['sponsor-1', 'sponsor-2', 'sponsor-3']

export function Sponsors({ copy }: { copy: Copy }) {
  return (
    <section id="sponsors" className="section">
      <SectionHead no="09" />
      <div className="title-row">
        <h2 className="h2">{copy.partners}<span className="dot">.</span></h2>
        <p className="uf__p">{copy.partnersP}</p>
      </div>
      <div className="sponsors">
        {LOGO_SLOTS.map(id => (
          <div key={id} className="sponsor"><span className="sponsor__ph">Logo</span></div>
        ))}
        <a href={CONTACT_URL} className="sponsor sponsor--cta" target="_blank" rel="noopener noreferrer">{copy.yourLogo}</a>
      </div>
    </section>
  )
}
