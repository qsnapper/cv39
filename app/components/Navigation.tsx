'use client'

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">Colinas Verdes 39</div>
        <ul className="nav-menu">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#contact" className="btn-contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
