import * as d3 from 'd3'

const BAR_W = 24
const STEP = 29
const PAD_L = 24
const PAD_T = 10
const CHART_H = 64
const AXIS_H = 14

export function YearlyBars({ values }: { values: Partial<Record<string, number>> }) {
  const years = Object.keys(values).sort()
  if (years.length === 0) return null

  const width = PAD_L + years.length * STEP
  const height = PAD_T + CHART_H + AXIS_H
  const baseline = PAD_T + CHART_H
  const y = d3.scaleLinear().domain([0, Math.max(1, d3.max(years, yr => values[yr]) ?? 0)]).range([0, CHART_H])

  return (
    <div className="mb-1.5 overflow-x-auto">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block font-mono text-[9px]">
        <line x1={PAD_L} x2={width} y1={baseline} y2={baseline} className="stroke-line" />
        {years.map((yr, i) => {
          const v = values[yr] ?? 0
          const bh = v > 0 ? Math.max(3, y(v)) : 1
          const x = PAD_L + i * STEP
          return (
            <g key={yr}>
              <rect x={x} y={baseline - bh} width={BAR_W} height={bh} rx={3} className={v > 0 ? 'fill-accent' : 'fill-line'}>
                <title>{`${yr}: ${v} pts`}</title>
              </rect>
              {v > 0 && <text x={x + BAR_W / 2} y={baseline - bh - 4} textAnchor="middle" className="fill-muted">{v}</text>}
              <text x={x + BAR_W / 2} y={height} textAnchor="middle" className="fill-muted">{yr}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
