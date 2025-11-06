// ==========================================
// Image Gallery & Lightbox Functionality
// ==========================================

class ImageGallery {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
        this.closeBtn = this.lightbox.querySelector('.lightbox-close');
        this.prevBtn = this.lightbox.querySelector('.lightbox-prev');
        this.nextBtn = this.lightbox.querySelector('.lightbox-next');
        this.galleryItems = document.querySelectorAll('.gallery-item img');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Add click event to all gallery images
        this.galleryItems.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });

        // Close button
        this.closeBtn.addEventListener('click', () => this.closeLightbox());

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightbox();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    updateLightbox() {
        const currentImg = this.galleryItems[this.currentIndex];
        this.lightboxImage.src = currentImg.src;
        this.lightboxImage.alt = currentImg.alt;
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.galleryItems.length}`;
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.updateLightbox();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updateLightbox();
    }
}

// ==========================================
// Contact Form Functionality
// ==========================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.messageDiv = this.form.querySelector('.form-message');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            // Only validate - let Netlify handle the actual submission
            if (!this.validateForm()) {
                e.preventDefault();
            } else {
                // Show loading state before Netlify processes the form
                const submitBtn = this.form.querySelector('.btn-submit');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }

    validateForm() {
        // Get form data
        const formData = {
            name: this.form.querySelector('#name').value.trim(),
            email: this.form.querySelector('#email').value.trim(),
            phone: this.form.querySelector('#phone').value.trim(),
            message: this.form.querySelector('#message').value.trim()
        };

        // Check required fields
        if (!formData.name || !formData.email || !formData.message) {
            this.showMessage('Please fill in all required fields.', 'error');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        // Validate phone if provided
        if (formData.phone && formData.phone.length < 9) {
            this.showMessage('Please enter a valid phone number.', 'error');
            return false;
        }

        return true;
    }

    showMessage(message, type) {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `form-message ${type}`;
        this.messageDiv.style.display = 'block';

        // Scroll to message
        this.messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==========================================
// Navbar Scroll Effect
// ==========================================

class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.backgroundColor = 'rgba(26, 35, 50, 0.98)';
                this.navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            } else {
                this.navbar.style.backgroundColor = 'rgba(26, 35, 50, 0.95)';
                this.navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// ==========================================
// Fade-in Animation on Scroll
// ==========================================

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Add animation to elements
        const animateElements = document.querySelectorAll('.feature-category, .gallery-item, .location-item, .highlight-item');

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ==========================================
// Create Placeholder Images
// ==========================================

class PlaceholderImages {
    constructor() {
        this.init();
    }

    init() {
        const placeholderImages = document.querySelectorAll('img[src*="placeholder"]');

        placeholderImages.forEach((img, index) => {
            // Create a canvas element for the placeholder
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#e0e0e0');
            gradient.addColorStop(1, '#f5f5f5');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add text
            ctx.fillStyle = '#999';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Image ' + (index + 1), canvas.width / 2, canvas.height / 2);

            ctx.font = '24px Arial';
            ctx.fillText('Replace with property photo', canvas.width / 2, canvas.height / 2 + 50);

            // Set canvas as image source
            img.src = canvas.toDataURL();
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
        });
    }
}

// ==========================================
// Mobile Menu Toggle (for future enhancement)
// ==========================================

class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        // Check if we're on mobile
        if (window.innerWidth <= 768) {
            // Add mobile menu functionality here if needed
            console.log('Mobile menu initialized');
        }
    }
}

// ==========================================
// Property Map Functionality
// ==========================================

class PropertyMap {
    constructor() {
        this.mapElement = document.getElementById('propertyMap');
        this.coordinates = [37.1663858561094, -8.700731058466115];
        this.init();
    }

    init() {
        if (!this.mapElement) return;

        // Wait for Leaflet to load
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded');
            return;
        }

        // Initialize map
        this.map = L.map('propertyMap').setView(this.coordinates, 15);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Create custom icon for property marker
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div class="marker-pin"></div>',
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        // Add marker for property
        const marker = L.marker(this.coordinates, { icon: customIcon }).addTo(this.map);

        // Add popup with property info
        marker.bindPopup(`
            <div class="map-popup">
                <h3>Colinas Verdes Villa</h3>
                <p><strong>Reference:</strong> CV39</p>
                <p><strong>Price:</strong> €1,095,000</p>
                <p>4-bedroom luxury villa with pool</p>
            </div>
        `).openPopup();

        // Fix map rendering issue
        setTimeout(() => {
            this.map.invalidateSize();
        }, 100);
    }
}

// ==========================================
// Initialize All Components
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ImageGallery();
    new ContactForm();
    new SmoothScroll();
    new NavbarScroll();
    new ScrollAnimations();
    new PlaceholderImages();
    new MobileMenu();
    new PropertyMap();

    console.log('Colinas Verdes Villa website initialized successfully!');
});

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
    // Add any resize-specific functionality here
}, 250));
