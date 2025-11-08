type QuickFactsProps = {
  data: {
    bedrooms: number
    bathrooms: number
    builtArea: string
    plotSize: string
    poolSize: string
  }
}

export default function QuickFacts({ data }: QuickFactsProps) {
  return (
    <section className="quick-facts">
      <div className="container">
        <div className="fact-item">
          <div className="fact-icon">🛏️</div>
          <div className="fact-value">{data.bedrooms}</div>
          <div className="fact-label">Bedrooms</div>
        </div>
        <div className="fact-item">
          <div className="fact-icon">🚿</div>
          <div className="fact-value">{data.bathrooms}</div>
          <div className="fact-label">Bathrooms</div>
        </div>
        <div className="fact-item">
          <div className="fact-icon">🏠</div>
          <div className="fact-value">{data.builtArea}</div>
          <div className="fact-label">Built Area</div>
        </div>
        <div className="fact-item">
          <div className="fact-icon">🌳</div>
          <div className="fact-value">{data.plotSize}</div>
          <div className="fact-label">Plot Size</div>
        </div>
        <div className="fact-item">
          <div className="fact-icon">🏊</div>
          <div className="fact-value">{data.poolSize}</div>
          <div className="fact-label">Swimming Pool</div>
        </div>
      </div>
    </section>
  )
}
