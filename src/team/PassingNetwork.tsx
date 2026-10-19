import * as d3 from 'd3'
import { useState } from 'react'

import { data, scopeLabel, type Scope } from '../data.js'
import { H2, NOTE } from '../ui/styles.js'
import { NetworkGraph } from './NetworkGraph.js'
import { circleLayout, involvementByPlayer, shortName, undirectedLinks } from './network.js'

// laid out from all-time edges so nodes keep their positions when the filter changes
const LAYOUT = circleLayout(data.network.all ?? [])
const PANEL_LABEL = 'mb-2 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-muted'

export function PassingNetwork({ scope }: { scope: Scope }) {
  const [selected, setSelected] = useState<string | null>(null)
  const edges = data.network[scope] ?? []
  const involvement = involvementByPlayer(edges)
  const links = undirectedLinks(edges)
  const strongest = d3.greatest(links, l => l.count)

  const partners = selected === null ? [] : d3
    .rollups(
      edges.filter(e => e.from === selected || e.to === selected),
      v => ({ to: d3.sum(v, e => (e.from === selected ? e.count : 0)), from: d3.sum(v, e => (e.to === selected ? e.count : 0)) }),
      e => (e.from === selected ? e.to : e.from),
    )
    .map(([name, v]) => ({ name, ...v, total: v.to + v.from }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 7)

  return (
    <section className="mb-8">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2.5">
        <h2 className={H2}>Passing network</h2>
        <span className={NOTE}>{scopeLabel(scope)}</span>
      </div>
      <div className="flex flex-wrap items-stretch gap-6 rounded-xl border border-line bg-surface p-5 shadow-card">
        <div className="flex min-w-[260px] flex-[1_1_340px] items-center justify-center">
          <NetworkGraph pos={LAYOUT} links={links} involvement={involvement} selected={selected} onSelect={setSelected} />
        </div>
        <div className="min-w-[190px] flex-[0_0_210px]" aria-live="polite">
          {selected === null ? (
            <>
              <h4 className={PANEL_LABEL}>Overview</h4>
              <p className="text-[0.84rem] text-muted [&_strong]:text-ink">
                {strongest === undefined ? (
                  <>No plays recorded for <strong>{scopeLabel(scope)}</strong>.</>
                ) : (
                  <>Strongest connection: <strong>{shortName(strongest.a)}</strong> ↔ <strong>{shortName(strongest.b)}</strong> ({strongest.count} logged plays). Click any player to see their top partners.</>
                )}
              </p>
            </>
          ) : (
            <>
              <h4 className={PANEL_LABEL}>Selected player</h4>
              <p className="mb-0.5 font-display text-[1.3rem] font-extrabold uppercase leading-[1.05]">{selected}</p>
              <p className="mb-3.5 font-mono text-[0.76rem] text-muted">{involvement.get(selected) ?? 0} total connections</p>
              <ol className="flex flex-col gap-1.5">
                {partners.map(pt => (
                  <li
                    key={pt.name}
                    title={`${selected} → ${pt.name}: ${pt.to} · ${pt.name} → ${selected}: ${pt.from}`}
                    className="flex items-baseline justify-between gap-2 text-[0.83rem]"
                  >
                    <span className="min-w-0 truncate font-semibold">{pt.name}</span>
                    <span className="font-mono font-bold text-accent">{pt.total}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
