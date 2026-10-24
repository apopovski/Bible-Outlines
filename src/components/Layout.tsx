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
          <Link to="/books/exodus">Exodus</Link>
          <Link to="/books/revelation">Revelation</Link>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">
        <p>
          <strong>Bible Outlines</strong> — interactive study across Scripture.
          Genesis, Exodus, Isaiah, Daniel, John, and Revelation are ready now.
        </p>
      </footer>
    </div>
  )
}
