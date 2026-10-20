import { useState } from 'react'

import { TRAINING_SLIDES, asset } from '../data.js'
import type { Copy } from '../i18n.js'

const SLIDE_COUNT = TRAINING_SLIDES.length
const VISIBLE = 3
const pad = (value: number) => String(value).padStart(2, '0')

export function TrainingCarousel({ copy }: { copy: Copy }) {
  const [first, setFirst] = useState(0)
  const handlePrev = () => setFirst(current => (current - 1 + SLIDE_COUNT) % SLIDE_COUNT)
  const handleNext = () => setFirst(current => (current + 1) % SLIDE_COUNT)

  return (
    <>
      <div className="carousel">
        {TRAINING_SLIDES.map((slide, index) => {
          const pos = (index - first + SLIDE_COUNT) % SLIDE_COUNT
          return (
            <div
              key={slide.file}
              className="slide"
              style={{ order: pos, flex: pos === 1 ? '2.2 1 0' : '1 1 0', display: pos < VISIBLE ? 'block' : 'none' }}
            >
              <img src={asset(slide.file)} alt={slide.alt} className="cover" style={{ objectPosition: slide.pos }} loading="lazy" />
              {slide.credit !== undefined && <span className="credit">{slide.credit}</span>}
            </div>
          )
        })}
      </div>
      <div className="carousel__nav">
        <span className="carousel__count">{pad(((first + 1) % SLIDE_COUNT) + 1)} / {pad(SLIDE_COUNT)}</span>
        <div className="carousel__btns">
          <button type="button" className="sq-btn" onClick={handlePrev} aria-label={copy.prev}>←</button>
          <button type="button" className="sq-btn" onClick={handleNext} aria-label={copy.next}>→</button>
        </div>
      </div>
    </>
  )
}
