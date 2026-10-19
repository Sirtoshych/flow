import type { MouseEvent, ReactNode } from 'react'

type SegmentedProps<T extends string> = {
  label: string
  options: { value: T; label: ReactNode }[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function Segmented<T extends string>({ label, options, value, onChange, className = '' }: SegmentedProps<T>) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const picked = options.find(o => o.value === e.currentTarget.value)
    if (picked !== undefined) onChange(picked.value)
  }

  return (
    <div role="radiogroup" aria-label={label} className={`inline-flex h-10 gap-0.5 rounded-[9px] border border-line bg-surface-2 p-[3px] ${className}`}>
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          role="radio"
          value={o.value}
          aria-checked={o.value === value}
          onClick={handleClick}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2 text-[0.84rem] font-semibold focus-visible:outline-2 focus-visible:outline-accent sm:px-3 ${
            o.value === value ? 'bg-surface text-accent shadow-card' : 'text-muted hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
