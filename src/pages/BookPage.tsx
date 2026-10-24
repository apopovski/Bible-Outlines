import { Link, useParams } from 'react-router-dom'
import { OutlineReader } from '../components/OutlineReader'
import { TypeCards } from '../components/TypeCards'
import { getBook } from '../data/books'
import { useProgress } from '../hooks/useProgress'

export function BookPage() {
  const { bookId = '' } = useParams()
  const book = getBook(bookId)
  const { progress, toggleSection, setHighYieldOnly } = useProgress(bookId)

  if (!book) {
    return (
      <main className="section">
        <h1>Book not found</h1>
        <p>
          This outline is not available yet.{' '}
          <Link to="/">Return to the library</Link>.
        </p>
      </main>
    )
  }

  const { meta, sections, types, quiz } = book
  const pct = Math.round(
    (progress.completedSections.length / Math.max(sections.length, 1)) * 100,
  )

  return (
    <main>
      <section className="book-hero">
        <div className="book-hero__media" aria-hidden="true" />
        <div className="book-hero__content">
          <p className="eyebrow">
            {meta.testament} · Book {meta.order} · {meta.chapters}
          </p>
          <h1>
            {meta.name}
            <span>{meta.hebrew ? `${meta.hebrew} — ${meta.subtitle}` : meta.subtitle}</span>
          </h1>
          <p className="book-hero__lede">{meta.tagline}</p>
          <div className="stats-inline">
            <div>
              <strong>{sections.length}</strong> lessons
            </div>
            <div>
              <strong>{quiz.length}</strong> quiz questions
            </div>
            <div>
              <strong>{types.length}</strong> type / antitype pairs
            </div>
            {progress.quizBest !== null ? (
              <div>
                <strong>
                  {progress.quizBest}/{quiz.length}
                </strong>{' '}
                best quiz
              </div>
            ) : null}
          </div>
          <div className="cta-row">
            <a className="btn btn-primary" href="#study">
              Enter the outline
            </a>
            <Link className="btn btn-sage" to={`/books/${meta.id}/quiz`}>
              Take the quiz
            </Link>
          </div>
        </div>
      </section>

      {meta.divisions ? (
        <section className="section">
          <div className="section-head">
            <h2>Two movements</h2>
            <p>
              The hinge is Genesis 12:1–3 — universal ruin meets God&apos;s
              remedy in the call of one man.
            </p>
          </div>
          <div className="types-grid">
            {meta.divisions.map((d) => (
              <div
                key={d.title}
                className="type-face"
                style={{ position: 'relative' }}
              >
                <div>
                  <p className="hint">{d.range}</p>
                  <h4>{d.title}</h4>
                </div>
                <p>{d.focus}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section" id="study">
        <div className="section-head">
          <h2>Study the outline</h2>
          <p>
            Key badges mark high-yield material. Check sections as you finish
            them — your progress stays on this device.
          </p>
        </div>

        <div className="toolbar">
          <label className="toggle">
            <input
              type="checkbox"
              checked={progress.highYieldOnly}
              onChange={(e) => setHighYieldOnly(e.target.checked)}
            />
            Key material only
          </label>
          <div className="progress-meter" aria-label="Reading progress">
            <div className="progress-meter__bar">
              <div
                className="progress-meter__fill"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span>
              {progress.completedSections.length}/{sections.length}
            </span>
          </div>
        </div>

        <OutlineReader
          sections={sections}
          highYieldOnly={progress.highYieldOnly}
          completed={progress.completedSections}
          onToggleComplete={toggleSection}
        />
      </section>

      <section className="section" id="types">
        <div className="section-head">
          <h2>Type and antitype</h2>
          <p>
            Flip each card — memorize the type, the antitype, and the passage
            that establishes the link.
          </p>
        </div>
        <TypeCards types={types} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Ready to be tested?</h2>
          <p>
            Seventeen multiple-choice questions with full explanations drawn
            from the outline.
          </p>
        </div>
        <Link className="btn btn-primary" to={`/books/${meta.id}/quiz`}>
          Start Genesis quiz
        </Link>
      </section>
    </main>
  )
}
