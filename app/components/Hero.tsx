export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: "url('/images/pool.jpg')" }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Exquisite Countryside Villa</h1>
        <p className="hero-subtitle">Colinas Verdes, Lagos, Portugal</p>
        <div className="hero-price">€1,045,000</div>
        <a href="#overview" className="scroll-indicator">
          <span></span>
        </a>
      </div>
    </section>
  )
}
