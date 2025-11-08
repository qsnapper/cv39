'use client'

import { useState } from 'react'

type GalleryImage = {
  src: string
  alt: string
  category: string
}

type GalleryProps = {
  images: GalleryImage[]
}

export default function Gallery({ images }: GalleryProps) {
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
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length)
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
            {images.map((image, index) => (
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
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
          />
          <div className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
