import { useRef } from 'react'

import { asset } from '../data.js'
import type { Copy, Lang } from '../i18n.js'
import { LANGS, pageHref, type Page } from '../pages.js'
import { ArrowIcon } from './ArrowIcon.js'

const NAV_TARGETS: { page: Page; hash?: string }[] = [
  { page: 'home', hash: '#achievements' },
  { page: 'home', hash: '#sponsors' },
  { page: 'trainings' },
  { page: 'history' },
  { page: 'players' },
  { page: 'media' },
  { page: 'calendar' },
]

type Props = { copy: Copy; lang: Lang; page: Page }

export function Nav({ copy, lang, page }: Props) {
  const menuRef = useRef<HTMLDivElement>(null)
  const links = NAV_TARGETS.map((target, index) => ({
    href: `${pageHref(lang, target.page)}${target.hash ?? ''}`,
    label: copy.nav[index],
    current: target.hash === undefined && target.page === page ? ('page' as const) : undefined,
  }))
  const closeMenu = () => menuRef.current?.hidePopover()

  return (
    <div className="hero__bar">
      {page !== 'home' && (
        <a href={pageHref(lang, 'home')} className="hero__home">
          <img src={asset('flow-badge.webp')} alt="Flow Wrocław" />
        </a>
      )}
      <nav className="hero__nav">
        {links.map(link => <a key={link.href} href={link.href} aria-current={link.current}>{link.label}</a>)}
      </nav>
      <button type="button" className="menu-btn" popoverTarget="menu">
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2" />
        </svg>
        {copy.menu}
      </button>
      <div id="menu" ref={menuRef} popover="auto" className="menu">
        <div className="menu__head">
          <span className="menu__title">Flow Wrocław</span>
          <button type="button" className="menu__close" popoverTarget="menu" popoverTargetAction="hide" aria-label={copy.close}>×</button>
        </div>
        <nav className="menu__nav" onClick={closeMenu}>
          {links.map(link => (
            <a key={link.href} href={link.href} aria-current={link.current}>
              {link.label}
              <ArrowIcon />
            </a>
          ))}
        </nav>
      </div>
      <div className="lang">
        {LANGS.map(code => (
          <a key={code} href={pageHref(code, page)} hrefLang={code} aria-current={code === lang ? 'page' : undefined}>{code.toUpperCase()}</a>
        ))}
      </div>
    </div>
  )
}
