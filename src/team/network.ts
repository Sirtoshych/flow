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
  for (const edge of edges) for (const name of [edge.from, edge.to]) involvement.set(name, (involvement.get(name) ?? 0) + edge.count)
  return involvement
}

export function circleLayout(edges: Edge[]): Map<string, Pos> {
  const names = [...involvementByPlayer(edges)].sort((first, second) => second[1] - first[1]).map(([name]) => name)
  return new Map(names.map((name, index): [string, Pos] => {
    const angle = -Math.PI / 2 + (index / names.length) * 2 * Math.PI
    return [name, { x: CX + RING_R * Math.cos(angle), y: CY + RING_R * Math.sin(angle), right: Math.cos(angle) >= -0.02 }]
  }))
}

export function undirectedLinks(edges: Edge[]): Link[] {
  const links = new Map<string, Link>()
  for (const edge of edges) {
    const [source, target] = edge.from < edge.to ? [edge.from, edge.to] : [edge.to, edge.from]
    const link = links.get(`${source}|${target}`) ?? { a: source, b: target, count: 0 }
    link.count += edge.count
    links.set(`${source}|${target}`, link)
  }
  return [...links.values()]
}
