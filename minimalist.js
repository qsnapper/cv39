// ==========================================
// Modern Minimalist Villa Website
// ==========================================

// All property images for lightbox
const allImages = [
    'images/pool.jpg',
    'images/pool2.jpg',
    'images/living.jpg',
    'images/living2.jpg',
    'images/living3.jpg',
    'images/garden.jpg',
    'images/garden2.jpg',
    'images/garden3.jpg',
    'images/garden5.jpg',
    'images/garden6.jpg',
    'images/garden7.jpg',
    'images/garden8.jpg',
    'images/garden9.jpg',
    'images/master-bedroom.jpg',
    'images/master-bedroom2.jpg',
    'images/bedroom2.jpg',
    'images/bedroom3.jpg',
    'images/kitchen.jpg',
    'images/dining.jpg',
    'images/dining2.jpg',
    'images/dining3.jpg',
    'images/bathroom.jpg',
    'images/bathroom2.jpg',
    'images/front-entrance.jpg',
    'images/entrance-driveway.jpg',
    'images/outdoor.jpg',
    'images/seating-area.jpg',
    'images/gym.jpg',
    'images/office.jpg',
    'images/hallway.jpg',
    'images/hallway2.jpg',
    'images/hero-garden.jpg',
    'images/wood.jpg'
];

// ==========================================
// Lightbox Gallery
// ==========================================
class MinimalistLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
        this.closeBtn = this.lightbox.querySelector('.lightbox-close');
        this.prevBtn = this.lightbox.querySelector('.lightbox-prev');
        this.nextBtn = this.lightbox.querySelector('.lightbox-next');
        this.currentIndex = 0;
        this.images = allImages;

        this.init();
    }

    init() {
        // Gallery items
        const galleryItems = document.querySelectorAll('.gallery-item-h');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });

        // View all button
        const viewAllBtn = document.getElementById('viewAllBtn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                this.openLightbox(0);
            });
        }

        // Close button
        this.closeBtn.addEventListener('click', () => this.closeLightbox());

        // Navigation
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
        this.lightboxImage.src = this.images[this.currentIndex];
        this.lightboxImage.alt = `Property Image ${this.currentIndex + 1}`;
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightbox();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightbox();
    }
}

// ==========================================
// Contact Form
// ==========================================
class MinimalistContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.messageDiv = this.form.querySelector('.form-message');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
            } else {
                const submitBtn = this.form.querySelector('.btn-submit-min');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }

    validateForm() {
        const formData = {
            name: this.form.querySelector('#name').value.trim(),
            email: this.form.querySelector('#email').value.trim(),
            phone: this.form.querySelector('#phone').value.trim(),
            message: this.form.querySelector('#message').value.trim()
        };

        if (!formData.name || !formData.email || !formData.message) {
            this.showMessage('Please fill in all required fields.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }

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
        this.messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ==========================================
// Smooth Scroll
// ==========================================
class MinimalistSmoothScroll {
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
                    const navHeight = 81; // Nav height
                    const targetPosition = targetElement.offsetTop - navHeight;

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
class MinimalistNav {
    constructor() {
        this.nav = document.querySelector('.minimal-nav');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.style.background = 'rgba(255, 255, 255, 1)';
            } else {
                this.nav.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }
}

// ==========================================
// Scroll Reveal Animations
// ==========================================
class ScrollReveal {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll(
            '.stat-item, .story-content, .story-image-large, .story-image-medium, .details-column'
        );

        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

// ==========================================
// Horizontal Gallery Scroll Indicator
// ==========================================
class HorizontalGallery {
    constructor() {
        this.gallery = document.querySelector('.horizontal-gallery');
        this.init();
    }

    init() {
        if (!this.gallery) return;

        // Smooth scroll on wheel for horizontal gallery
        this.gallery.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > 0) {
                e.preventDefault();
                this.gallery.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }
}

// ==========================================
// Property Map
// ==========================================
class MinimalistMap {
    constructor() {
        this.mapElement = document.getElementById('propertyMap');
        this.coordinates = [37.1663858561094, -8.700731058466115];
        this.init();
    }

    init() {
        if (!this.mapElement) return;

        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded');
            return;
        }

        // Initialize map
        this.map = L.map('propertyMap').setView(this.coordinates, 15);

        // Add tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Custom marker
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width: 20px; height: 20px; background: #C97064; border: 3px solid #000; border-radius: 50%;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // Add marker
        const marker = L.marker(this.coordinates, { icon: customIcon }).addTo(this.map);

        // Popup
        marker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif; padding: 10px;">
                <h3 style="font-family: 'Cormorant Garamond', serif; margin: 0 0 10px 0; font-size: 1.2rem;">Villa CV39</h3>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Location:</strong> Colinas Verdes, Lagos</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Price:</strong> €1,095,000</p>
            </div>
        `).openPopup();

        // Fix rendering
        setTimeout(() => {
            this.map.invalidateSize();
        }, 100);
    }
}

// ==========================================
// Initialize All Components
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    new MinimalistLightbox();
    new MinimalistContactForm();
    new MinimalistSmoothScroll();
    new MinimalistNav();
    new ScrollReveal();
    new HorizontalGallery();
    new MinimalistMap();

    console.log('Minimalist villa website initialized ✓');
});

// ==========================================
// Utility: Debounce
// ==========================================
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

// Handle resize
window.addEventListener('resize', debounce(() => {
    const map = document.getElementById('propertyMap');
    if (map && window.L) {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 250);
    }
}, 250));
