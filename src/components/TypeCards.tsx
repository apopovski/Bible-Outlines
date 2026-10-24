import { useState } from 'react'
import type { TypePair } from '../types'

export function TypeCards({ types }: { types: TypePair[] }) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  return (
    <div className="types-grid">
      {types.map((item, index) => {
        const open = Boolean(flipped[index])
        return (
          <button
            key={`${item.type}-${index}`}
            type="button"
            className={`type-card ${open ? 'is-flipped' : ''}`}
            onClick={() =>
              setFlipped((prev) => ({ ...prev, [index]: !prev[index] }))
            }
            aria-pressed={open}
          >
            <div className="type-card__inner">
              <div className="type-face">
                <div>
                  <p className="hint">Type</p>
                  <h4>{item.type}</h4>
                </div>
                <p>Tap to reveal the antitype</p>
              </div>
              <div className="type-face type-face--back">
                <div>
                  <p className="hint">Antitype</p>
                  <h4>{item.antitype}</h4>
                </div>
                <p>{item.scripture}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
