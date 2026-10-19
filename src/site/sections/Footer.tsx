import { SOCIALS, asset } from '../data.js'
import type { Copy } from '../i18n.js'
import { Cta } from './Cta.js'

export function Footer({ t }: { t: Copy }) {
  const lead = t.motto.slice(0, -1).join(' ')
  const last = t.motto.at(-1)

  return (
    <footer id="join" className="footer">
      <img src={asset('photo-highfive-white.webp')} alt="" className="cover footer__bg" loading="lazy" />
      <div className="footer__inner">
        <div className="footer__head">
          <h2 className="footer__h2">{lead} <span className="ice">{last}</span></h2>
          <div className="socials">
            {SOCIALS.map(s => <Cta key={s.label} href={s.href} variant="white" large external>{s.label}</Cta>)}
          </div>
        </div>
        <div className="footer__bar">
          <span>{t.foot1}</span>
        </div>
      </div>
    </footer>
  )
}
