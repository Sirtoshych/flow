import type { Bucket, Player } from '../data.js'

export type Metric = 'total' | 'perGame' | 'perSeason'
export type Stat = 'assists' | 'goals' | 'total'
export type RosterRow = { player: Player; bucket: Bucket }

export const STATS: Stat[] = ['assists', 'goals', 'total']

export function per(bucket: Bucket, stat: Stat, mode: Metric): number {
  if (mode === 'total') return bucket[stat]
  const divisor = mode === 'perGame' ? bucket.games : bucket.seasons
  return divisor > 0 ? bucket[stat] / divisor : 0
}

export const fmt = (value: number, mode: Metric) => (mode === 'total' ? String(value) : value.toFixed(2))

export const yearSpan = (bucket: Bucket) => (bucket.firstYear === bucket.lastYear ? `${bucket.firstYear}` : `${bucket.firstYear}–${bucket.lastYear}`)

export const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`
