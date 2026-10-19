import type { Bucket, Player } from '../data.js'

export type Metric = 'total' | 'perGame' | 'perSeason'
export type Stat = 'assists' | 'goals' | 'total'
export type RosterRow = { player: Player; bucket: Bucket }

export const STATS: Stat[] = ['assists', 'goals', 'total']

export function per(b: Bucket, stat: Stat, mode: Metric): number {
  if (mode === 'total') return b[stat]
  const divisor = mode === 'perGame' ? b.games : b.seasons
  return divisor > 0 ? b[stat] / divisor : 0
}

export const fmt = (v: number, mode: Metric) => (mode === 'total' ? String(v) : v.toFixed(2))

export const yearSpan = (b: Bucket) => (b.firstYear === b.lastYear ? `${b.firstYear}` : `${b.firstYear}–${b.lastYear}`)

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
