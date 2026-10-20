import { useState } from 'react'

export type Sort<K extends string> = { key: K; dir: 1 | -1 }

export function useSort<K extends string>(initial: K) {
  const [sort, setSort] = useState<Sort<K>>({ key: initial, dir: -1 })
  const toggle = (key: K) =>
    setSort(current => (current.key === key ? { key, dir: current.dir === 1 ? -1 : 1 } : { key, dir: key === 'name' ? 1 : -1 }))
  return [sort, toggle] as const
}

export function sorted<T, K extends string>(rows: T[], sort: Sort<K>, value: (row: T, key: K) => number | string): T[] {
  return rows.toSorted((first, second) => {
    const firstValue = value(first, sort.key)
    const secondValue = value(second, sort.key)
    const order = typeof firstValue === 'number' && typeof secondValue === 'number' ? firstValue - secondValue : String(firstValue).localeCompare(String(secondValue))
    return sort.dir * order
  })
}
