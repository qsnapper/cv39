'use client'

import { useEffect, useRef } from 'react'

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      // Dynamically import Leaflet on client side
      import('leaflet').then((L) => {
        // Remove existing map if any
        const container = mapRef.current as any
        if (container && container._leaflet_id) {
          return
        }

        // Approximate coordinates for Colinas Verdes, Lagos
        const map = L.map(mapRef.current!).setView([37.1385, -8.6958], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        L.marker([37.1385, -8.6958]).addTo(map)
          .bindPopup('Colinas Verdes, Lagos')
          .openPopup()
      })
    }
  }, [])

  return (
    <section id="location" className="location">
      <div className="container">
        <div className="section-header">
          <h2>Prime Location</h2>
          <div className="divider"></div>
        </div>
        <div className="location-content">
          <div className="location-text">
            <h3>Colinas Verdes, Bensafrim, Lagos, Portugal</h3>
            <p>
              Situated in the sought-after Colinas Verdes development in Portugal's Algarve, this property
              offers the best of both worlds—serene countryside living with immediate access to urban amenities.
            </p>

            <div className="location-highlights">
              <div className="location-item">
                <strong>Lagos City Center:</strong> 10 minutes
              </div>
              <div className="location-item">
                <strong>Beaches:</strong> Short drive to pristine Portugal's Algarve coastline
              </div>
              <div className="location-item">
                <strong>Golf Courses:</strong> Multiple championship courses nearby in Portugal
              </div>
              <div className="location-item">
                <strong>Airport:</strong> Faro International Airport, Portugal within easy reach
              </div>
              <div className="location-item">
                <strong>Restaurants & Shopping:</strong> Lagos offers excellent dining and retail
              </div>
            </div>

            <p className="location-description">
              Lagos is one of Portugal's Algarve region's most historic and charming cities, renowned for its
              stunning beaches, vibrant marina, excellent restaurants, and rich cultural heritage. The Colinas
              Verdes area provides a peaceful retreat while maintaining convenient access to all that this beautiful
              part of Portugal has to offer.
            </p>
          </div>

          <div className="location-map">
            <div id="propertyMap" ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
