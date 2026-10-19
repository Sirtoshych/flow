import type { Bucket } from '../data.js'
import { fmt, per, type Metric, type RosterRow } from './metrics.js'

type Leaderboard = { title: string; rank: (b: Bucket) => number; show: (b: Bucket) => string }

export function Leaders({ rows, mode }: { rows: RosterRow[]; mode: Metric }) {
  const suffix = mode === 'perGame' ? ' · per game' : mode === 'perSeason' ? ' · per season' : ''
  const boards: Leaderboard[] = [
    { title: 'Most games played', rank: b => b.games, show: b => String(b.games) },
    { title: `Most assists${suffix}`, rank: b => per(b, 'assists', mode), show: b => fmt(per(b, 'assists', mode), mode) },
    { title: `Most goals${suffix}`, rank: b => per(b, 'goals', mode), show: b => fmt(per(b, 'goals', mode), mode) },
  ]

  return (
    <section className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-3">
      {boards.map(({ title, rank, show }) => (
        <div key={title} className="bg-surface px-[1.15rem] py-4">
          <h3 className="mb-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.07em] text-muted">{title}</h3>
          <ol className="flex flex-col gap-[0.45rem]">
            {rows.toSorted((a, b) => rank(b.bucket) - rank(a.bucket)).slice(0, 3).map(({ player, bucket }, i) => (
              <li key={player.name} className="flex items-baseline gap-2">
                <span className="w-4 font-mono text-[0.76rem] font-bold text-gold">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-[0.88rem] font-semibold">{player.name}</span>
                <span className="font-mono text-[0.86rem] font-bold tabular-nums text-accent">{show(bucket)}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  )
}
