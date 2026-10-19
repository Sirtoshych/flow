import type { Edge } from '../data.js'

export const VIEW_W = 620
export const VIEW_H = 450
export const CX = 310
export const CY = 225
const RING_R = 158

export type Pos = { x: number; y: number; right: boolean }
export type Link = { a: string; b: string; count: number }

export function shortName(name: string): string {
  const parts = name.split(' ')
  const last = parts.at(-1) ?? ''
  return `${parts[0]} ${last.charAt(0)}.`
}

export function involvementByPlayer(edges: Edge[]): Map<string, number> {
  const involvement = new Map<string, number>()
  for (const e of edges) for (const n of [e.from, e.to]) involvement.set(n, (involvement.get(n) ?? 0) + e.count)
  return involvement
}

export function circleLayout(edges: Edge[]): Map<string, Pos> {
  const names = [...involvementByPlayer(edges)].sort((a, b) => b[1] - a[1]).map(([name]) => name)
  return new Map(names.map((name, i): [string, Pos] => {
    const angle = -Math.PI / 2 + (i / names.length) * 2 * Math.PI
    return [name, { x: CX + RING_R * Math.cos(angle), y: CY + RING_R * Math.sin(angle), right: Math.cos(angle) >= -0.02 }]
  }))
}

export function undirectedLinks(edges: Edge[]): Link[] {
  const links = new Map<string, Link>()
  for (const e of edges) {
    const [a, b] = e.from < e.to ? [e.from, e.to] : [e.to, e.from]
    const link = links.get(`${a}|${b}`) ?? { a, b, count: 0 }
    link.count += e.count
    links.set(`${a}|${b}`, link)
  }
  return [...links.values()]
}
