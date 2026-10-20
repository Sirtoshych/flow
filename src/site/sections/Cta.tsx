import type { ReactNode } from 'react'

type Props = { href: string; variant: 'blue' | 'dark' | 'white'; large?: boolean; external?: boolean; children: ReactNode }

export function Cta({ href, variant, large = false, external = false, children }: Props) {
  return (
    <a
      href={href}
      className={`cta cta--${variant}${large ? ' cta--lg' : ''}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
      <span className="cta__icon" aria-hidden="true">↗︎</span>
    </a>
  )
}
