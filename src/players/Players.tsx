import { Fragment, useState, type MouseEvent } from 'react'

import { CURRENT_YEAR, data, scopeLabel, type Scope } from '../data.js'
import { SearchBox } from '../ui/SearchBox.js'
import { Segmented } from '../ui/Segmented.js'
import { SortableTh } from '../ui/SortableTh.js'
import { TableShell } from '../ui/TableShell.js'
import { sorted, useSort } from '../ui/sort.js'
import { NOTE, TD, TDR } from '../ui/styles.js'
import { Leaders } from './Leaders.js'
import { PlayerDetail } from './PlayerDetail.js'
import { STATS, fmt, per, plural, yearSpan, type Metric, type RosterRow, type Stat } from './metrics.js'

type SortKey = 'name' | 'seasons' | 'games' | Stat

const HEAD: Record<Metric, Record<Stat, string>> = {
  total: { assists: 'Assists', goals: 'Goals', total: 'Total' },
  perGame: { assists: 'Ast/G', goals: 'Gl/G', total: 'Tot/G' },
  perSeason: { assists: 'Ast/Szn', goals: 'Gl/Szn', total: 'Tot/Szn' },
}

const METRIC_OPTIONS: { value: Metric; label: string }[] = [
  { value: 'total', label: 'Totals' },
  { value: 'perGame', label: 'Per Game' },
  { value: 'perSeason', label: 'Per Season' },
]

// a single-season career is a one-off guest unless that season is the current one (a newcomer)
const ROSTER = data.players.filter(p => p.stats.all !== undefined && (p.stats.all.seasons > 1 || p.stats.all.lastYear === CURRENT_YEAR))

export function Players({ scope }: { scope: Scope }) {
  const [mode, setMode] = useState<Metric>('total')
  const [query, setQuery] = useState('')
  const [sort, onSort] = useSort<SortKey>('total')
  const [expanded, setExpanded] = useState<string | null>(null)

  const inScope: RosterRow[] = ROSTER.flatMap(player => {
    const bucket = player.stats[scope]
    return bucket === undefined ? [] : [{ player, bucket }]
  })
  const q = query.trim().toLowerCase()
  const rows = sorted(inScope.filter(r => r.player.name.toLowerCase().includes(q)), sort, (r, key) =>
    key === 'name' ? r.player.name : key === 'seasons' || key === 'games' ? r.bucket[key] : per(r.bucket, key, mode))
  const maxTotal = Math.max(1, ...rows.map(r => per(r.bucket, 'total', mode)))
  const podium = sort.key === 'total' && sort.dir === -1

  const handleRowClick = (e: MouseEvent<HTMLTableRowElement>) => {
    const name = e.currentTarget.dataset.player
    if (name !== undefined) setExpanded(current => (current === name ? null : name))
  }

  return (
    <>
      <Leaders rows={inScope} mode={mode} />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchBox className="flex-[1_1_200px]" value={query} onChange={setQuery} placeholder="Find a player…" />
        <Segmented label="Metric" value={mode} onChange={setMode} options={METRIC_OPTIONS} />
      </div>

      <TableShell>
        <thead>
          <tr>
            <SortableTh sort={sort} onSort={onSort} left>#</SortableTh>
            <SortableTh sortKey="name" sort={sort} onSort={onSort} left>Player</SortableTh>
            <SortableTh sortKey="seasons" sort={sort} onSort={onSort}>Seasons</SortableTh>
            <SortableTh sortKey="games" sort={sort} onSort={onSort}>Games</SortableTh>
            {STATS.map(s => (
              <SortableTh key={s} sortKey={s} sort={sort} onSort={onSort}>{HEAD[mode][s]}</SortableTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={7} className="p-8 text-center italic text-muted">No player matches “{query}” in {scopeLabel(scope)}.</td></tr>
          )}
          {rows.map(({ player, bucket }, i) => {
            const open = player.name === expanded
            const gold = podium && i < 3
            const total = per(bucket, 'total', mode)
            return (
              <Fragment key={player.name}>
                <tr data-player={player.name} onClick={handleRowClick} className={`cursor-pointer ${open ? 'bg-accent-soft' : 'hover:bg-accent-soft'}`}>
                  <td className={`${TD} w-10 font-mono text-[0.8rem] ${gold ? 'font-bold text-gold' : 'text-muted'}`}>{i + 1}</td>
                  <td className={`${TD} font-semibold ${open ? 'text-accent' : gold ? 'text-gold' : ''}`}>
                    <button type="button" aria-expanded={open} className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-accent">
                      <svg className={`mr-1.5 inline size-[13px] align-middle transition-transform ${open ? 'rotate-90 text-accent' : 'text-muted'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                      {player.name}
                      {player.jersey !== null && (
                        <span className={`ml-2 rounded border px-[0.32rem] py-px align-middle font-mono text-[0.7rem] font-semibold ${open ? 'border-accent text-accent' : 'border-line text-muted'}`}>
                          #{player.jersey}
                        </span>
                      )}
                    </button>
                    <span className="mt-0.5 block text-[0.76rem] font-medium text-muted">{yearSpan(bucket)} · {plural(bucket.seasons, 'season')}</span>
                  </td>
                  <td className={TDR}>{bucket.seasons}</td>
                  <td className={TDR}>{bucket.games}</td>
                  <td className={TDR}>{fmt(per(bucket, 'assists', mode), mode)}</td>
                  <td className={TDR}>{fmt(per(bucket, 'goals', mode), mode)}</td>
                  <td className={`${TDR} relative font-display text-[0.98rem] font-extrabold text-accent`}>
                    {fmt(total, mode)}
                    <span className="absolute inset-x-3.5 bottom-1.5 h-[3px] overflow-hidden rounded-sm bg-line">
                      <span className="block h-full rounded-sm bg-accent" style={{ width: `${Math.max(4, Math.round((total / maxTotal) * 100))}%` }} />
                    </span>
                  </td>
                </tr>
                {open && (
                  <tr>
                    <td colSpan={7} className="border-b border-line bg-surface-2 px-3.5 pt-2 pb-2.5">
                      <PlayerDetail player={player} scope={scope} />
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </TableShell>
      <p className={`mt-2.5 ${NOTE}`}>{rows.length} of {ROSTER.length} players shown</p>
    </>
  )
}
