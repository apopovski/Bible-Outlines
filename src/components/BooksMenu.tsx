import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { availableBooks } from '../data/books'

export function BooksMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const location = useLocation()

  const oldTestament = availableBooks.filter((b) => b.testament === 'Old Testament')
  const newTestament = availableBooks.filter((b) => b.testament === 'New Testament')
  const activeBook = availableBooks.find((b) =>
    location.pathname.includes(`/books/${b.id}`),
  )

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className={`books-menu ${open ? 'is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="books-menu__trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{activeBook ? activeBook.name : 'Books'}</span>
        <span className="books-menu__chevron" aria-hidden="true" />
      </button>

      <div
        id={menuId}
        className="books-menu__panel"
        role="menu"
        hidden={!open}
      >
        <div className="books-menu__group">
          <p className="books-menu__label">Old Testament</p>
          {oldTestament.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className={`books-menu__item ${activeBook?.id === book.id ? 'is-active' : ''}`}
              role="menuitem"
            >
              <span className="books-menu__num">
                {String(book.order).padStart(2, '0')}
              </span>
              <span className="books-menu__copy">
                <strong>{book.name}</strong>
                <small>{book.subtitle}</small>
              </span>
            </Link>
          ))}
        </div>

        <div className="books-menu__group">
          <p className="books-menu__label">New Testament</p>
          {newTestament.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className={`books-menu__item ${activeBook?.id === book.id ? 'is-active' : ''}`}
              role="menuitem"
            >
              <span className="books-menu__num">
                {String(book.order).padStart(2, '0')}
              </span>
              <span className="books-menu__copy">
                <strong>{book.name}</strong>
                <small>{book.subtitle}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
