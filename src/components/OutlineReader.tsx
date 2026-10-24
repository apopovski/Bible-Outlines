import type { Section } from '../types'

type Props = {
  sections: Section[]
  highYieldOnly: boolean
  completed: string[]
  onToggleComplete: (id: string) => void
}

export function OutlineReader({
  sections,
  highYieldOnly,
  completed,
  onToggleComplete,
}: Props) {
  return (
    <div className="outline-list">
      {sections.map((section) => {
        const done = completed.includes(section.id)
        const subs = highYieldOnly
          ? section.subsections.filter(
              (s) =>
                s.highYield || s.points.some((p) => p.highYield),
            )
          : section.subsections

        if (highYieldOnly && subs.length === 0 && section.points.length === 0) {
          return null
        }

        return (
          <details key={section.id} className="section-block">
            <summary>
              <span className="section-roman">{section.roman}</span>
              <h3>{section.title}</h3>
              <button
                type="button"
                className={`mark-done ${done ? 'is-done' : ''}`}
                aria-label={done ? 'Mark section unread' : 'Mark section read'}
                onClick={(e) => {
                  e.preventDefault()
                  onToggleComplete(section.id)
                }}
              >
                {done ? '✓' : ''}
              </button>
            </summary>
            <div className="section-body">
              {subs.map((sub) => {
                const points = highYieldOnly
                  ? sub.points.filter((p) => p.highYield || sub.highYield)
                  : sub.points
                if (highYieldOnly && !sub.highYield && points.length === 0) {
                  return null
                }
                return (
                  <article key={sub.letter} className="subsection">
                    <h4 className="subsection__title">
                      {sub.highYield ? (
                        <span className="key-badge">Key</span>
                      ) : null}
                      <span>
                        {sub.letter}. {sub.title}
                      </span>
                    </h4>
                    {(highYieldOnly && sub.highYield ? sub.points : points).map(
                      (point) => (
                        <div
                          key={point.n}
                          className={`point ${point.highYield || sub.highYield ? 'is-key' : ''}`}
                        >
                          <span className="point__n">{point.n}.</span>
                          <div>
                            <div>{point.text}</div>
                            {point.subpoints.length > 0 ? (
                              <ul className="subpoints">
                                {point.subpoints.map((sp) => (
                                  <li key={sp.letter}>
                                    <strong>{sp.letter}.</strong> {sp.text}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                      ),
                    )}
                    {sub.commentary ? (
                      <blockquote className="commentary">
                        <span className="commentary__label">Commentary</span>
                        {sub.commentary}
                      </blockquote>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </details>
        )
      })}
    </div>
  )
}
