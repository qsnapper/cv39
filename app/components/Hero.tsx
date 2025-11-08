type HeroProps = {
  data: {
    title: string
    subtitle: string
    price: string
    backgroundImage: string
  }
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="hero" style={{ backgroundImage: `url('${data.backgroundImage}')` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{data.title}</h1>
        <p className="hero-subtitle">{data.subtitle}</p>
        <div className="hero-price">{data.price}</div>
        <a href="#overview" className="scroll-indicator">
          <span></span>
        </a>
      </div>
    </section>
  )
}
