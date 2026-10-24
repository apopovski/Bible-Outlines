import { Link } from 'react-router-dom'
import { booksCatalog } from '../data/books'

export function HomePage() {
  const available = booksCatalog.filter((b) => b.available)
  const sorted = [...booksCatalog].sort((a, b) => a.order - b.order)

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden="true" />
        <div className="home-hero__content">
          <h1 className="home-hero__brand">
            Bible <em>Outlines</em>
          </h1>
          <p className="home-hero__lede">
            Guided lessons, commentary callouts, and high-yield quizzes —
            {available.length} books ready to study.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" to="/books/genesis">
              Begin Genesis
            </Link>
            <a className="btn btn-ghost" href="#library">
              Browse library
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="library">
        <div className="section-head">
          <h2>The library</h2>
          <p>
            One interactive outline per book. {available.length} ready now —
            more arrive as outlines are added.
          </p>
        </div>
        <div className="book-rail">
          {sorted.map((book) => {
            const inner = (
              <>
                <div className="book-num">
                  {String(book.order).padStart(2, '0')}
                </div>
                <div>
                  <h3>
                    {book.name}
                    {book.hebrew ? <small>{book.hebrew}</small> : null}
                  </h3>
                  <p>{book.tagline}</p>
                </div>
                <span
                  className={`pill ${book.available ? '' : 'pill-muted'}`.trim()}
                >
                  {book.available ? 'Study' : 'Soon'}
                </span>
              </>
            )

            if (book.available) {
              return (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="book-row is-available"
                >
                  {inner}
                </Link>
              )
            }

            return (
              <div key={book.id} className="book-row is-locked" aria-disabled>
                {inner}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
