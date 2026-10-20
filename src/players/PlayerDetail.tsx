import { SERIES, SERIES_KEYS, isSeries, scopeLabel, type Player, type Scope } from '../data.js'
import { YearlyBars } from './YearlyBars.js'
import { plural, yearSpan } from './metrics.js'

const CELL = 'border-b border-line px-[0.45rem] py-0.5'
const HEADINGS = ['Tournament', 'Seasons', 'Games', 'Assists', 'Goals', 'Total']
const CAREER_SCOPES: Scope[] = ['all', ...SERIES_KEYS]

export function PlayerDetail({ player, scope }: { player: Player; scope: Scope }) {
  const current = player.stats[scope]
  const rows = CAREER_SCOPES.flatMap(key => {
    const bucket = player.stats[key]
    return bucket === undefined ? [] : [{ key, bucket, label: key === 'all' ? 'All tournaments (career)' : scopeLabel(key) }]
  })

  return (
    <>
      <p className="mb-1 text-[0.78rem] font-medium text-muted">
        {scopeLabel(scope)}:{' '}
        {current === undefined
          ? 'no recorded appearances'
          : `${yearSpan(current)} · ${plural(current.seasons, 'season')} · ${current.games} games · ${current.total} points`}
      </p>
      <YearlyBars values={player.yearly[scope] ?? {}} />
      <p className="mb-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-muted">Career, by tournament</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[0.82rem] tabular-nums [&_tbody_tr:last-child>td]:border-b-0">
          <thead>
            <tr>
              {HEADINGS.map((heading, index) => (
                <th key={heading} className={`${CELL} font-display text-[0.72rem] font-extrabold uppercase text-muted ${index === 0 ? 'text-left' : 'text-right'}`}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, label, bucket }) => {
              const active = key === scope || (isSeries(key) && SERIES[key].surface === scope)
              return (
                <tr key={key} className={`${key === 'all' ? 'font-bold text-accent' : ''} ${active ? 'bg-accent-soft' : ''}`}>
                  <td className={`${CELL} text-left font-semibold`}>{label}</td>
                  {[bucket.seasons, bucket.games, bucket.assists, bucket.goals, bucket.total].map((value, index) => (
                    <td key={index} className={`${CELL} text-right`}>{value}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
