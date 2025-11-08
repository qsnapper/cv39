export default function OwnerSaleBanner() {
  return (
    <section className="owner-sale-banner">
      <div className="container">
        <div className="owner-banner-content">
          <div className="owner-badge">
            <svg className="badge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="badge-text">Direct from Owner</span>
          </div>
          <div className="owner-benefits">
            <div className="benefit-item">
              <svg className="benefit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>No Agent Commission</span>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Direct Communication</span>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Faster Transaction</span>
            </div>
            <div className="benefit-item">
              <svg className="benefit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Full Property Knowledge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
