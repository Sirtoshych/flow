import type { ChangeEvent } from 'react'

type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}

export function SearchBox({ value, onChange, placeholder, className = '' }: SearchBoxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)

  return (
    <label className={`relative block ${className}`}>
      <svg className="pointer-events-none absolute top-1/2 left-3 size-[15px] -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-[0.9rem] text-ink focus:outline-2 focus:outline-offset-1 focus:outline-accent"
      />
    </label>
  )
}
