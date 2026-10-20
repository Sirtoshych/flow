import * as d3 from 'd3'
import type { KeyboardEvent, MouseEvent } from 'react'

import { CX, CY, VIEW_H, VIEW_W, shortName, type Link, type Pos } from './network.js'

// 1 = straight chord; lower pulls edge midpoints toward the centre so chords don't overlap the ring
const BEND = 0.68

type NetworkGraphProps = {
  pos: Map<string, Pos>
  links: Link[]
  involvement: Map<string, number>
  selected: string | null
  onSelect: (name: string | null) => void
}

export function NetworkGraph({ pos, links, involvement, selected, onSelect }: NetworkGraphProps) {
  const maxLink = Math.max(1, d3.max(links, link => link.count) ?? 0)
  const strokeW = d3.scaleSqrt().domain([0, maxLink]).range([0.5, 0.5 + Math.sqrt(maxLink) * 0.75])
  const opacity = d3.scaleLinear().domain([0, maxLink]).range([0.1, 0.65])
  const radius = d3.scaleSqrt().domain([0, Math.max(1, d3.max(involvement.values()) ?? 0)]).range([3, 10])

  const toggle = (name: string | undefined) => {
    if (name !== undefined) onSelect(name === selected ? null : name)
  }
  const handleNodeClick = (event: MouseEvent<SVGGElement>) => toggle(event.currentTarget.dataset.name)
  const handleNodeKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    toggle(event.currentTarget.dataset.name)
  }

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block h-auto w-full max-w-[620px]">
      <g>
        {links.map(link => {
          const start = pos.get(link.a)
          const end = pos.get(link.b)
          if (start === undefined || end === undefined) return null
          const path = d3.path()
          path.moveTo(start.x, start.y)
          path.quadraticCurveTo(CX + ((start.x + end.x) / 2 - CX) * BEND, CY + ((start.y + end.y) / 2 - CY) * BEND, end.x, end.y)
          const touches = link.a === selected || link.b === selected
          return (
            <path
              key={`${link.a}|${link.b}`}
              d={path.toString()}
              fill="none"
              strokeWidth={strokeW(link.count)}
              opacity={selected === null ? opacity(link.count) : touches ? 0.9 : 0.04}
              className={`transition-opacity ${touches ? 'stroke-gold' : 'stroke-accent'}`}
            />
          )
        })}
      </g>
      <g className="font-mono text-[9px]">
        {[...pos].map(([name, point]) => {
          const nodeRadius = radius(involvement.get(name) ?? 0)
          const active = name === selected
          return (
            <g
              key={name}
              data-name={name}
              role="button"
              tabIndex={0}
              aria-label={name}
              aria-pressed={active}
              onClick={handleNodeClick}
              onKeyDown={handleNodeKeyDown}
              className={`group cursor-pointer outline-none transition-opacity ${selected !== null && !active ? 'opacity-30' : ''}`}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r={nodeRadius}
                strokeWidth={1.6}
                className={active ? 'fill-gold stroke-gold' : 'fill-surface stroke-accent group-hover:stroke-gold group-focus-visible:stroke-gold'}
              />
              <text
                x={point.x + (point.right ? nodeRadius + 4 : -(nodeRadius + 4))}
                y={point.y + 3}
                textAnchor={point.right ? 'start' : 'end'}
                className={`pointer-events-none ${active ? 'fill-ink font-bold' : 'fill-muted group-focus-visible:fill-ink'}`}
              >
                {shortName(name)}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
