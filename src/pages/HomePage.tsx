import { Link } from 'react-router-dom'
import { booksCatalog } from '../data/books'

export function HomePage() {
  const available = booksCatalog.filter((b) => b.available).length

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden="true" />
        <div className="home-hero__content">
          <h1 className="home-hero__brand">
            Bible <em>Outlines</em>
          </h1>
          <p className="home-hero__lede">
            Guided lessons and high-yield quizzes for every book of Scripture —
            starting with Genesis.
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
            One interactive outline per book. {available} ready now — the rest
            unlock as outlines arrive.
          </p>
        </div>
        <div className="book-rail">
          {booksCatalog.map((book) => {
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
