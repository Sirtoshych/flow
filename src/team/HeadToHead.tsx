import * as d3 from 'd3'
import { useState } from 'react'

import { data, scopeLabel, type Matchup, type Scope } from '../data.js'
import { SearchBox } from '../ui/SearchBox.js'
import { SortableTh } from '../ui/SortableTh.js'
import { TableShell } from '../ui/TableShell.js'
import { sorted, useSort } from '../ui/sort.js'
import { H2, NOTE, TD, TDR } from '../ui/styles.js'

type SortKey = 'name' | 'games' | 'record' | 'winPct' | 'diff'
type MatchupRow = { name: string; m: Matchup }

// opponents faced only once all-time are pickup/hat teams and stay out of the table
const LISTED = data.opponents.filter(o => (o.stats.all?.games ?? 0) >= 2)
const BEST = 'font-bold text-ink'

const winPct = (m: Matchup) => (m.games > 0 ? (m.wins / m.games) * 100 : 0)
const diff = (m: Matchup) => m.pointsFor - m.pointsAgainst

function sortValue({ name, m }: MatchupRow, key: SortKey): number | string {
  if (key === 'name') return name
  if (key === 'games') return m.games
  if (key === 'record') return m.wins
  if (key === 'winPct') return winPct(m)
  return diff(m)
}

export function HeadToHead({ scope }: { scope: Scope }) {
  const [query, setQuery] = useState('')
  const [sort, onSort] = useSort<SortKey>('games')

  // the overall record still counts the unlisted one-off opponents
  const everyMatchup = data.opponents.flatMap(o => o.stats[scope] ?? [])
  const games = d3.sum(everyMatchup, m => m.games)
  const wins = d3.sum(everyMatchup, m => m.wins)
  const losses = d3.sum(everyMatchup, m => m.losses)

  const q = query.trim().toLowerCase()
  const inScope: MatchupRow[] = LISTED.flatMap(o => {
    const m = o.stats[scope]
    return m === undefined ? [] : [{ name: o.name, m }]
  })
  const rows = sorted(inScope.filter(r => r.name.toLowerCase().includes(q)), sort, sortValue)
  const best = {
    games: d3.max(rows, r => r.m.games),
    record: d3.max(rows, r => r.m.wins - r.m.losses),
    winPct: d3.max(rows, r => winPct(r.m)),
    diff: d3.max(rows, r => diff(r.m)),
  }

  return (
    <section className="mb-8">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2.5">
        <h2 className={H2}>Head-to-head</h2>
        <span className={NOTE}>
          {games > 0
            ? <><strong className="font-bold text-accent">{wins}-{losses}</strong> ({Math.round((wins / games) * 100)}%) in {scopeLabel(scope)}</>
            : `No games recorded in ${scopeLabel(scope)}`}
        </span>
      </div>
      <SearchBox className="mb-5 max-w-[280px]" value={query} onChange={setQuery} placeholder="Find an opponent…" />
      <TableShell>
        <thead>
          <tr>
            <SortableTh sort={sort} onSort={onSort} left>#</SortableTh>
            <SortableTh sortKey="name" sort={sort} onSort={onSort} left>Opponent</SortableTh>
            <SortableTh sortKey="games" sort={sort} onSort={onSort}>GP</SortableTh>
            <SortableTh sortKey="record" sort={sort} onSort={onSort}>Record</SortableTh>
            <SortableTh sortKey="winPct" sort={sort} onSort={onSort}>Win %</SortableTh>
            <SortableTh sortKey="diff" sort={sort} onSort={onSort}>Diff</SortableTh>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={6} className="p-8 text-center italic text-muted">No opponent matches “{query}” in {scopeLabel(scope)}.</td></tr>
          )}
          {rows.map(({ name, m }, i) => {
            const d = diff(m)
            return (
              <tr key={name} className="hover:bg-accent-soft">
                <td className={`${TD} w-10 font-mono text-[0.8rem] text-muted`}>{i + 1}</td>
                <td className={`${TD} font-semibold`}>{name}</td>
                <td className={`${TDR} ${m.games === best.games ? BEST : ''}`}>{m.games}</td>
                <td className={`${TDR} ${m.wins - m.losses === best.record ? BEST : ''}`}>{m.wins}-{m.losses}</td>
                <td className={`${TDR} ${winPct(m) === best.winPct ? BEST : ''}`}>{winPct(m).toFixed(0)}%</td>
                <td className={`${TDR} ${d === best.diff ? BEST : d > 0 ? 'text-accent' : d < 0 ? 'text-muted' : ''}`}>{d > 0 ? '+' : ''}{d}</td>
              </tr>
            )
          })}
        </tbody>
      </TableShell>
      <p className={`mt-2.5 ${NOTE}`}>{rows.length} of {LISTED.length} opponents shown</p>
    </section>
  )
}
