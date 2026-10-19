import raw from './data/flow.json'

export const PLAYING_SURFACES = ['outdoor', 'beach', 'indoor'] as const
export const SURFACES = ['all', ...PLAYING_SURFACES] as const
export const SERIES_KEYS = ['ppm', 'mpm', 'wlu', 'plu', 'beachcup', 'hmp', 'poligon'] as const

export type PlayingSurface = (typeof PLAYING_SURFACES)[number]
export type Surface = (typeof SURFACES)[number]
export type Series = (typeof SERIES_KEYS)[number]
export type Scope = Surface | Series

export type Bucket = { seasons: number; firstYear: number; lastYear: number; games: number; assists: number; goals: number; total: number }
export type Matchup = { games: number; wins: number; losses: number; pointsFor: number; pointsAgainst: number }
export type Edge = { from: string; to: string; count: number }

export type Player = {
  name: string
  jersey: string | null
  // a scope is absent when the player has no seasons in it
  stats: Partial<Record<Scope, Bucket>>
  // year -> assists + goals
  yearly: Partial<Record<Scope, Partial<Record<string, number>>>>
}

export type Opponent = { name: string; stats: Partial<Record<Scope, Matchup>> }

export type FlowData = {
  source: string
  generatedAt: string
  players: Player[]
  opponents: Opponent[]
  // directed: assist thrower -> goal scorer
  network: Partial<Record<Scope, Edge[]>>
}

export const data: FlowData = raw

export const CURRENT_YEAR = Math.max(...data.players.map(p => p.stats.all?.lastYear ?? 0))

export const SURFACE_LABEL: Record<Surface, string> = { all: 'All surfaces', outdoor: 'Outdoor', beach: 'Beach', indoor: 'Indoor' }

export const SERIES: Record<Series, { label: string; surface: PlayingSurface }> = {
  ppm: { label: 'Puchar Polski Mixed', surface: 'outdoor' },
  mpm: { label: 'Mistrzostwa Polski Mixed', surface: 'outdoor' },
  wlu: { label: 'WLU* (Liga)', surface: 'outdoor' },
  plu: { label: 'Południowa Liga Ultimate', surface: 'outdoor' },
  beachcup: { label: 'Plażowe / Beach Ultimate', surface: 'beach' },
  hmp: { label: 'Halowe Mistrzostwa Polski', surface: 'indoor' },
  poligon: { label: 'Poligon', surface: 'indoor' },
}

export const isSeries = (s: Scope): s is Series => s in SERIES

export const scopeLabel = (s: Scope) => (s === 'all' ? 'All tournaments' : isSeries(s) ? SERIES[s].label : SURFACE_LABEL[s])
