type FeaturesProps = {
  data: {
    interior: {
      heading: string
      items: string[]
    }
    outdoor: {
      heading: string
      items: string[]
    }
    amenities: {
      heading: string
      items: string[]
    }
    lifestyle: {
      heading: string
      items: string[]
    }
  }
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Exceptional Features & Amenities</h2>
          <div className="divider"></div>
        </div>

        <div className="features-grid">
          {/* Interior Features */}
          <div className="feature-category">
            <h3>{data.interior.heading}</h3>
            <ul className="feature-list">
              {data.interior.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Outdoor Features */}
          <div className="feature-category">
            <h3>{data.outdoor.heading}</h3>
            <ul className="feature-list">
              {data.outdoor.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Additional Facilities */}
          <div className="feature-category">
            <h3>{data.amenities.heading}</h3>
            <ul className="feature-list">
              {data.amenities.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Lifestyle Benefits */}
          <div className="feature-category">
            <h3>{data.lifestyle.heading}</h3>
            <ul className="feature-list">
              {data.lifestyle.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
