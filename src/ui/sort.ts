import { useState } from 'react'

export type Sort<K extends string> = { key: K; dir: 1 | -1 }

export function useSort<K extends string>(initial: K) {
  const [sort, setSort] = useState<Sort<K>>({ key: initial, dir: -1 })
  const toggle = (key: K) =>
    setSort(s => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === 'name' ? 1 : -1 }))
  return [sort, toggle] as const
}

export function sorted<T, K extends string>(rows: T[], sort: Sort<K>, value: (row: T, key: K) => number | string): T[] {
  return rows.toSorted((a, b) => {
    const x = value(a, sort.key)
    const y = value(b, sort.key)
    const order = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))
    return sort.dir * order
  })
}
