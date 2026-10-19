import { useState } from 'react'

import { TRAINING_SLIDES, asset } from '../data.js'
import type { Copy } from '../i18n.js'

const N = TRAINING_SLIDES.length
const VISIBLE = 3
const pad = (n: number) => String(n).padStart(2, '0')

export function TrainingCarousel({ t }: { t: Copy }) {
  const [first, setFirst] = useState(0)
  const handlePrev = () => setFirst(i => (i - 1 + N) % N)
  const handleNext = () => setFirst(i => (i + 1) % N)

  return (
    <>
      <div className="carousel">
        {TRAINING_SLIDES.map((s, i) => {
          const pos = (i - first + N) % N
          return (
            <div
              key={s.file}
              className="slide"
              style={{ order: pos, flex: pos === 1 ? '2.2 1 0' : '1 1 0', display: pos < VISIBLE ? 'block' : 'none' }}
            >
              <img src={asset(s.file)} alt={s.alt} className="cover" style={{ objectPosition: s.pos }} loading="lazy" />
              {s.credit !== undefined && <span className="credit">{s.credit}</span>}
            </div>
          )
        })}
      </div>
      <div className="carousel__nav">
        <span className="carousel__count">{pad(((first + 1) % N) + 1)} / {pad(N)}</span>
        <div className="carousel__btns">
          <button type="button" className="sq-btn" onClick={handlePrev} aria-label={t.prev}>←</button>
          <button type="button" className="sq-btn" onClick={handleNext} aria-label={t.next}>→</button>
        </div>
      </div>
    </>
  )
}
