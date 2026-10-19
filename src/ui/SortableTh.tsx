import type { ReactNode } from 'react'

import type { Sort } from './sort.js'

type SortableThProps<K extends string> = {
  sortKey?: K
  sort: Sort<K>
  onSort: (key: K) => void
  left?: boolean
  children: ReactNode
}

export function SortableTh<K extends string>({ sortKey, sort, onSort, left = false, children }: SortableThProps<K>) {
  const active = sortKey === sort.key
  const handleClick = () => {
    if (sortKey !== undefined) onSort(sortKey)
  }

  return (
    <th
      aria-sort={active ? (sort.dir === 1 ? 'ascending' : 'descending') : undefined}
      className={`sticky top-0 z-[1] whitespace-nowrap border-b border-line bg-surface-2 px-3.5 py-2.5 font-display text-[0.82rem] font-extrabold uppercase tracking-[0.02em] text-muted ${left ? 'text-left' : 'text-right'}`}
    >
      {sortKey === undefined ? children : (
        <button type="button" onClick={handleClick} className="cursor-pointer uppercase hover:text-ink focus-visible:outline-2 focus-visible:outline-accent">
          {children}
          <span className={`ml-1 text-accent ${active ? '' : 'opacity-0'}`}>{sort.dir === 1 ? '↑' : '↓'}</span>
        </button>
      )}
    </th>
  )
}
