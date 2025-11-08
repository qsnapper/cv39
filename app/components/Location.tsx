'use client'

import { useEffect, useRef } from 'react'

type LocationProps = {
  data: {
    heading: string
    address: string
    description: string
    latitude: number
    longitude: number
    highlights: string[]
  }
}

export default function Location({ data }: LocationProps) {
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

        // Use coordinates from content
        const map = L.map(mapRef.current!).setView([data.latitude, data.longitude], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        L.marker([data.latitude, data.longitude]).addTo(map)
          .bindPopup(data.address)
          .openPopup()
      })
    }
  }, [data.latitude, data.longitude, data.address])

  // Split description by newlines for paragraphs
  const descriptionParagraphs = data.description.split('\n\n').filter(p => p.trim())

  return (
    <section id="location" className="location">
      <div className="container">
        <div className="section-header">
          <h2>{data.heading}</h2>
          <div className="divider"></div>
        </div>
        <div className="location-content">
          <div className="location-text">
            <h3>{data.address}</h3>
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index} className={index === descriptionParagraphs.length - 1 ? 'location-description' : ''}>
                {paragraph}
              </p>
            ))}

            <div className="location-highlights">
              {data.highlights.map((highlight, index) => (
                <div key={index} className="location-item">
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="location-map">
            <div id="propertyMap" ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
