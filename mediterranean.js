// ==========================================
// Mediterranean Villa Website - Interactive Features
// ==========================================

// ==========================================
// Image Gallery & Lightbox Functionality
// ==========================================

class MediterraneanGallery {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
        this.closeBtn = this.lightbox.querySelector('.lightbox-close');
        this.prevBtn = this.lightbox.querySelector('.lightbox-prev');
        this.nextBtn = this.lightbox.querySelector('.lightbox-next');
        this.galleryCards = document.querySelectorAll('.gallery-card');
        this.viewAllBtn = document.getElementById('viewAllPhotos');
        this.currentIndex = 0;

        // All property images
        this.allImages = [
            'images/pool.jpg',
            'images/living.jpg',
            'images/garden.jpg',
            'images/master-bedroom.jpg',
            'images/kitchen.jpg',
            'images/dining.jpg',
            'images/front-entrance.jpg',
            'images/outdoor.jpg',
            'images/gym.jpg',
            'images/pool2.jpg',
            'images/hero-garden.jpg',
            'images/entrance-driveway.jpg',
            'images/living2.jpg',
            'images/living3.jpg',
            'images/dining2.jpg',
            'images/dining3.jpg',
            'images/hallway.jpg',
            'images/hallway2.jpg',
            'images/master-bedroom2.jpg',
            'images/bedroom2.jpg',
            'images/bedroom3.jpg',
            'images/bathroom.jpg',
            'images/bathroom2.jpg',
            'images/office.jpg',
            'images/seating-area.jpg',
            'images/garden2.jpg',
            'images/garden3.jpg',
            'images/garden5.jpg',
            'images/garden6.jpg',
            'images/garden7.jpg',
            'images/garden8.jpg',
            'images/garden9.jpg',
            'images/wood.jpg'
        ];

        this.init();
    }

    init() {
        // Add click event to all gallery cards
        this.galleryCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const cardIndex = parseInt(card.getAttribute('data-index'));
                this.openLightbox(cardIndex);
            });
        });

        // View All Photos button
        if (this.viewAllBtn) {
            this.viewAllBtn.addEventListener('click', () => {
                this.openLightbox(0);
            });
        }

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
        this.lightboxImage.src = this.allImages[this.currentIndex];
        this.lightboxImage.alt = `Property Image ${this.currentIndex + 1}`;
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.allImages.length}`;
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.allImages.length;
        this.updateLightbox();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.allImages.length) % this.allImages.length;
        this.updateLightbox();
    }
}

// ==========================================
// Contact Form Functionality
// ==========================================

class MediterraneanContactForm {
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
                const submitBtn = this.form.querySelector('.btn-submit-med');
                submitBtn.textContent = 'Sending Your Message...';
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

class MediterraneanSmoothScroll {
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
                    const navbarHeight = 150; // Increased offset for better clearance
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
// Floating Navbar Scroll Effect
// ==========================================

class FloatingNavbar {
    constructor() {
        this.navbar = document.querySelector('.floating-nav');
        this.navContent = this.navbar.querySelector('.nav-content');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.style.transform = 'translateX(-50%) scale(0.95)';
                this.navContent.style.boxShadow = '0 15px 50px rgba(0, 119, 190, 0.25)';
                this.navContent.style.background = 'rgba(255, 255, 255, 1)';
            } else {
                this.navbar.style.transform = 'translateX(-50%) scale(1)';
                this.navContent.style.boxShadow = '0 10px 40px rgba(0, 119, 190, 0.15)';
                this.navContent.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        });
    }
}

// ==========================================
// Scroll Animations
// ==========================================

class MediterraneanScrollAnimations {
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

        // Add animation to elements
        const animateElements = document.querySelectorAll(
            '.space-card, .highlight-card, .location-point, .gallery-card'
        );

        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

// ==========================================
// Property Map Functionality
// ==========================================

class MediterraneanPropertyMap {
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

        // Add OpenStreetMap tiles with a brighter style
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Create custom icon with Mediterranean colors
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background: #E07856; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid #0077BE; position: relative;">
                       <div style="width: 12px; height: 12px; background: #0077BE; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
                   </div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        // Add marker for property
        const marker = L.marker(this.coordinates, { icon: customIcon }).addTo(this.map);

        // Add popup with property info
        marker.bindPopup(`
            <div style="font-family: 'Poppins', sans-serif; padding: 10px;">
                <h3 style="color: #0077BE; margin: 0 0 10px 0; font-size: 1.2rem;">Villa CV39</h3>
                <p style="margin: 5px 0; color: #2C3E50;"><strong>Location:</strong> Colinas Verdes, Lagos</p>
                <p style="margin: 5px 0; color: #2C3E50;"><strong>Price:</strong> €1,095,000</p>
                <p style="margin: 5px 0; color: #546E7A;">Your Mediterranean dream awaits</p>
            </div>
        `).openPopup();

        // Fix map rendering issue
        setTimeout(() => {
            this.map.invalidateSize();
        }, 100);
    }
}

// ==========================================
// Card Hover Effects
// ==========================================

class CardEffects {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.space-card, .highlight-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
}

// ==========================================
// Initialize All Components
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MediterraneanGallery();
    new MediterraneanContactForm();
    new MediterraneanSmoothScroll();
    new FloatingNavbar();
    new MediterraneanScrollAnimations();
    // Parallax removed for better scroll behavior
    // new ParallaxHero();
    new MediterraneanPropertyMap();
    new CardEffects();

    console.log('Mediterranean Villa website initialized successfully! 🏖️');

    // Add smooth entrance animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
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
    // Recalculate any responsive elements if needed
    const map = document.getElementById('propertyMap');
    if (map && window.L) {
        setTimeout(() => {
            const mapInstance = document.querySelector('.map-mediterranean');
            if (mapInstance) {
                // Trigger map resize
                window.dispatchEvent(new Event('resize'));
            }
        }, 250);
    }
}, 250));

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
});
