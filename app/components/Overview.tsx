type OverviewProps = {
  data: {
    heading: string
    leadParagraph: string
    description: string
    highlights: string[]
  }
}

export default function Overview({ data }: OverviewProps) {
  // Split description by newlines for paragraphs
  const descriptionParagraphs = data.description.split('\n\n').filter(p => p.trim())

  return (
    <section id="overview" className="overview">
      <div className="container">
        <div className="section-header">
          <h2>{data.heading}</h2>
          <div className="divider"></div>
        </div>
        <div className="overview-content">
          <div className="overview-text">
            <p className="lead">{data.leadParagraph}</p>

            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="highlights-grid">
              {data.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
