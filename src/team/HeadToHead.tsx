import * as d3 from 'd3'
import { useState } from 'react'

import { data, scopeLabel, type Matchup, type Scope } from '../data.js'
import { SearchBox } from '../ui/SearchBox.js'
import { SortableTh } from '../ui/SortableTh.js'
import { TableShell } from '../ui/TableShell.js'
import { sorted, useSort } from '../ui/sort.js'
import { H2, NOTE, TD, TDR } from '../ui/styles.js'

type SortKey = 'name' | 'games' | 'record' | 'winPct' | 'diff'
type MatchupRow = { name: string; matchup: Matchup }

// opponents faced only once all-time are pickup/hat teams and stay out of the table
const LISTED = data.opponents.filter(opponent => (opponent.stats.all?.games ?? 0) >= 2)
const BEST = 'font-bold text-ink'

const winPct = (matchup: Matchup) => (matchup.games > 0 ? (matchup.wins / matchup.games) * 100 : 0)
const diff = (matchup: Matchup) => matchup.pointsFor - matchup.pointsAgainst

function sortValue({ name, matchup }: MatchupRow, key: SortKey): number | string {
  if (key === 'name') return name
  if (key === 'games') return matchup.games
  if (key === 'record') return matchup.wins
  if (key === 'winPct') return winPct(matchup)
  return diff(matchup)
}

export function HeadToHead({ scope }: { scope: Scope }) {
  const [query, setQuery] = useState('')
  const [sort, onSort] = useSort<SortKey>('games')

  // the overall record still counts the unlisted one-off opponents
  const everyMatchup = data.opponents.flatMap(opponent => opponent.stats[scope] ?? [])
  const games = d3.sum(everyMatchup, matchup => matchup.games)
  const wins = d3.sum(everyMatchup, matchup => matchup.wins)
  const losses = d3.sum(everyMatchup, matchup => matchup.losses)

  const needle = query.trim().toLowerCase()
  const inScope: MatchupRow[] = LISTED.flatMap(opponent => {
    const matchup = opponent.stats[scope]
    return matchup === undefined ? [] : [{ name: opponent.name, matchup }]
  })
  const rows = sorted(inScope.filter(row => row.name.toLowerCase().includes(needle)), sort, sortValue)
  const best = {
    games: d3.max(rows, row => row.matchup.games),
    record: d3.max(rows, row => row.matchup.wins - row.matchup.losses),
    winPct: d3.max(rows, row => winPct(row.matchup)),
    diff: d3.max(rows, row => diff(row.matchup)),
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
          {rows.map(({ name, matchup }, index) => {
            const pointDiff = diff(matchup)
            return (
              <tr key={name} className="hover:bg-accent-soft">
                <td className={`${TD} w-10 font-mono text-[0.8rem] text-muted`}>{index + 1}</td>
                <td className={`${TD} font-semibold`}>{name}</td>
                <td className={`${TDR} ${matchup.games === best.games ? BEST : ''}`}>{matchup.games}</td>
                <td className={`${TDR} ${matchup.wins - matchup.losses === best.record ? BEST : ''}`}>{matchup.wins}-{matchup.losses}</td>
                <td className={`${TDR} ${winPct(matchup) === best.winPct ? BEST : ''}`}>{winPct(matchup).toFixed(0)}%</td>
                <td className={`${TDR} ${pointDiff === best.diff ? BEST : pointDiff > 0 ? 'text-accent' : pointDiff < 0 ? 'text-muted' : ''}`}>{pointDiff > 0 ? '+' : ''}{pointDiff}</td>
              </tr>
            )
          })}
        </tbody>
      </TableShell>
      <p className={`mt-2.5 ${NOTE}`}>{rows.length} of {LISTED.length} opponents shown</p>
    </section>
  )
}
