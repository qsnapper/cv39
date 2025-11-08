'use client'

import { useState } from 'react'

const galleryImages = [
  { src: '/images/front-entrance.jpg', alt: 'Front Entrance', category: 'exterior' },
  { src: '/images/pool.jpg', alt: 'Swimming Pool', category: 'pool' },
  { src: '/images/pool2.jpg', alt: 'Pool Area', category: 'pool' },
  { src: '/images/garden.jpg', alt: 'Landscaped Gardens', category: 'gardens' },
  { src: '/images/hero-garden.jpg', alt: 'Garden Overview', category: 'gardens' },
  { src: '/images/entrance-driveway.jpg', alt: 'Entrance & Driveway', category: 'exterior' },
  { src: '/images/living.jpg', alt: 'Living Room', category: 'interior' },
  { src: '/images/living2.jpg', alt: 'Living Room View', category: 'interior' },
  { src: '/images/living3.jpg', alt: 'Living Area with Fireplace', category: 'interior' },
  { src: '/images/dining.jpg', alt: 'Dining Room', category: 'interior' },
  { src: '/images/dining2.jpg', alt: 'Dining Area', category: 'interior' },
  { src: '/images/dining3.jpg', alt: 'Dining Space', category: 'interior' },
  { src: '/images/kitchen.jpg', alt: 'Fully Equipped Kitchen', category: 'interior' },
  { src: '/images/hallway.jpg', alt: 'Entrance Hallway', category: 'interior' },
  { src: '/images/hallway2.jpg', alt: 'Interior Hallway', category: 'interior' },
  { src: '/images/master-bedroom.jpg', alt: 'Master Bedroom', category: 'interior' },
  { src: '/images/master-bedroom2.jpg', alt: 'Master Suite', category: 'interior' },
  { src: '/images/bedroom2.jpg', alt: 'Bedroom 2', category: 'interior' },
  { src: '/images/bedroom3.jpg', alt: 'Bedroom 3', category: 'interior' },
  { src: '/images/bathroom.jpg', alt: 'Bathroom', category: 'interior' },
  { src: '/images/bathroom2.jpg', alt: 'Ensuite Bathroom', category: 'interior' },
  { src: '/images/office.jpg', alt: 'Office Space', category: 'interior' },
  { src: '/images/gym.jpg', alt: 'Gym Facility', category: 'exterior' },
  { src: '/images/outdoor.jpg', alt: 'Outdoor Terrace', category: 'exterior' },
  { src: '/images/seating-area.jpg', alt: 'Outdoor Seating Area', category: 'exterior' },
  { src: '/images/garden2.jpg', alt: 'Garden Pathways', category: 'gardens' },
  { src: '/images/garden3.jpg', alt: 'Garden Features', category: 'gardens' },
  { src: '/images/garden5.jpg', alt: 'Mature Landscaping', category: 'gardens' },
  { src: '/images/garden6.jpg', alt: 'Garden Terrace', category: 'gardens' },
  { src: '/images/garden7.jpg', alt: 'Garden Views', category: 'gardens' },
  { src: '/images/garden8.jpg', alt: 'Garden Grounds', category: 'gardens' },
  { src: '/images/garden9.jpg', alt: 'Garden Area', category: 'gardens' },
  { src: '/images/wood.jpg', alt: 'Property Features', category: 'exterior' },
  { src: '/images/satellite-view.jpg', alt: 'Satellite View of Property', category: 'exterior' },
  { src: '/images/floorplan.jpg', alt: 'Property Floor Plan', category: 'exterior' },
]

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <>
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Property Gallery</h2>
            <div className="divider"></div>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                data-category={image.category}
                onClick={() => openLightbox(index)}
              >
                <img src={image.src} alt={image.alt} />
                <div className="gallery-overlay">View Image</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div id="lightbox" className="lightbox" style={{ display: 'flex' }}>
          <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
          <span className="lightbox-prev" onClick={prevImage}>&#10094;</span>
          <span className="lightbox-next" onClick={nextImage}>&#10095;</span>
          <img
            className="lightbox-image"
            src={galleryImages[currentIndex].src}
            alt={galleryImages[currentIndex].alt}
          />
          <div className="lightbox-counter">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  )
}
