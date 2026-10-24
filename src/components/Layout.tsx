import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="site-nav">
        <Link to="/" className="brand-mark">
          Bible <span>Outlines</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link to="/">Library</Link>
          <Link to="/books/genesis">Genesis</Link>
          <Link to="/books/genesis/quiz">Quiz</Link>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">
        <p>
          <strong>Bible Outlines</strong> — interactive study for every book of
          Scripture. Genesis now; more books ahead.
        </p>
      </footer>
    </div>
  )
}
