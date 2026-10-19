import { useState, type ChangeEvent, type MouseEvent, type ReactNode, type SVGProps } from 'react'

import { PLAYING_SURFACES, SERIES, SERIES_KEYS, SURFACES, SURFACE_LABEL, data, type Scope, type Series, type Surface } from './data.js'
import { Players } from './players/Players.js'
import { Team } from './team/Team.js'
import { Segmented } from './ui/Segmented.js'

type Tab = 'players' | 'team'

const TABS: { id: Tab; label: string }[] = [
  { id: 'players', label: 'Players' },
  { id: 'team', label: 'Team' },
]

const ICON: SVGProps<SVGSVGElement> = {
  className: 'hidden size-3.5 shrink-0 opacity-60 sm:block',
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const SURFACE_ICONS: Record<Surface, ReactNode> = {
  all: <svg {...ICON}><rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" /><rect x="9" y="1.5" width="5.5" height="5.5" rx="1" /><rect x="1.5" y="9" width="5.5" height="5.5" rx="1" /><rect x="9" y="9" width="5.5" height="5.5" rx="1" /></svg>,
  outdoor: <svg {...ICON}><circle cx="8" cy="8" r="3" /><path d="M8 1v1.4M8 13.6V15M15 8h-1.4M2.4 8H1M12.9 3.1l-1 1M4.1 11.9l-1 1M12.9 12.9l-1-1M4.1 4.1l-1-1" /></svg>,
  beach: <svg {...ICON}><path d="M1.5 7.5C1.5 4 4.4 1.5 8 1.5S14.5 4 14.5 7.5" /><path d="M8 2v11" /><path d="M1 14.6q3.5-1.6 7 0t7 0" /></svg>,
  indoor: <svg {...ICON}><path d="M2 8.5 8 3l6 5.5" /><path d="M3.5 7.5V14h9V7.5" /></svg>,
}

const SURFACE_OPTIONS = SURFACES.map(s => ({ value: s, label: <>{SURFACE_ICONS[s]}{SURFACE_LABEL[s]}</> }))

export function App() {
  const [tab, setTab] = useState<Tab>('players')
  const [surface, setSurface] = useState<Surface>('all')
  const [series, setSeries] = useState<Series | 'all'>('all')
  const scope: Scope = series === 'all' ? surface : series

  const handleTabClick = (e: MouseEvent<HTMLButtonElement>) => {
    const picked = TABS.find(t => t.id === e.currentTarget.value)
    if (picked !== undefined) setTab(picked.id)
  }
  const handleSurfaceChange = (s: Surface) => {
    setSurface(s)
    setSeries('all')
  }
  const handleSeriesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const picked = SERIES_KEYS.find(s => s === e.target.value)
    setSeries(picked ?? 'all')
    if (picked !== undefined) setSurface(SERIES[picked].surface)
  }

  return (
    <div className="mx-auto max-w-[980px] px-4 pt-10 pb-20 sm:px-6">
      <nav role="tablist" aria-label="Sections" className="mb-5 flex gap-7 border-b border-line">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            value={id}
            aria-selected={tab === id}
            onClick={handleTabClick}
            className={`-mb-px cursor-pointer border-b-2 px-0.5 pt-3 pb-3.5 font-display text-[1.1rem] font-extrabold uppercase tracking-[0.02em] focus-visible:outline-2 focus-visible:outline-accent ${
              tab === id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="mb-7 flex flex-wrap gap-3">
        <Segmented
          label="Filter by surface"
          className="flex-[1_1_100%] md:flex-[1_1_0]"
          value={surface}
          onChange={handleSurfaceChange}
          options={SURFACE_OPTIONS}
        />
        <select
          aria-label="Filter by tournament"
          value={series}
          onChange={handleSeriesChange}
          className="h-10 cursor-pointer rounded-lg border border-line bg-surface px-3 text-[0.86rem] font-semibold text-ink focus:outline-2 focus:outline-offset-1 focus:outline-accent max-md:flex-1"
        >
          <option value="all">All tournaments</option>
          {PLAYING_SURFACES.map(surf => (
            <optgroup key={surf} label={SURFACE_LABEL[surf]}>
              {SERIES_KEYS.filter(s => SERIES[s].surface === surf).map(s => (
                <option key={s} value={s}>{SERIES[s].label}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {tab === 'players' ? <Players scope={scope} /> : <Team scope={scope} />}

      <footer className="mt-8 flex flex-wrap justify-between gap-4 font-mono text-[0.78rem] text-muted">
        <span>Source: scores.frisbee.pl · team card rosters, Flow Mixed only</span>
        <span>Data as of {data.generatedAt}</span>
      </footer>
    </div>
  )
}
