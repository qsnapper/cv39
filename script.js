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
        this.formStarted = false;
        this.submissionId = null;
        this.formInteractionTracked = false;
        this.init();
    }

    init() {
        // Generate unique submission ID for this session
        this.submissionId = this.generateSubmissionId();

        // Track form interaction (user started filling out form)
        this.trackFormInteraction();

        this.form.addEventListener('submit', (e) => {
            // Only validate - let Netlify handle the actual submission
            if (!this.validateForm()) {
                e.preventDefault();
            } else {
                // Track form submission event in Umami
                if (window.umami) {
                    // First, identify the user session with metadata (NO PII)
                    window.umami.identify({
                        submissionId: this.submissionId,
                        hasSubmitted: true,
                        language: document.documentElement.lang || 'unknown',
                        timestamp: Date.now()
                    });

                    // Then track the submission event
                    window.umami.track('form-submission', {
                        form: 'contact',
                        submissionId: this.submissionId,
                        language: document.documentElement.lang || 'unknown',
                        timestamp: Date.now()
                    });
                }

                // Show loading state before Netlify processes the form
                const submitBtn = this.form.querySelector('.btn-submit');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }

    generateSubmissionId() {
        // Generate a unique ID for this form session
        // Format: timestamp-random
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    trackFormInteraction() {
        // Track when user starts interacting with the form
        const formInputs = this.form.querySelectorAll('input, textarea');

        formInputs.forEach(input => {
            // Skip hidden inputs
            if (input.type === 'hidden') return;

            const trackInteraction = () => {
                if (!this.formInteractionTracked) {
                    this.formInteractionTracked = true;
                    if (window.umami) {
                        window.umami.track('form-interaction-start', {
                            form: 'contact',
                            submissionId: this.submissionId,
                            language: document.documentElement.lang || 'unknown'
                        });
                    }
                }
            };

            // Track on first focus or input
            input.addEventListener('focus', trackInteraction, { once: true });
            input.addEventListener('input', trackInteraction, { once: true });
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
                <p><strong>Price:</strong> €1,045,000</p>
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
// Phone Number Tracking
// ==========================================

class PhoneTracking {
    constructor() {
        this.contactSectionViewed = false;
        this.init();
    }

    init() {
        // Track phone number clicks
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.umami) {
                    window.umami.track('phone-click', {
                        phone: link.textContent.trim(),
                        language: document.documentElement.lang || 'unknown',
                        source: 'contact-section'
                    });
                }
            });
        });

        // Track when user views the contact section (indicates interest)
        this.trackContactSectionView();

        // Track text selection (user selecting phone number to copy)
        this.trackPhoneNumberSelection();
    }

    trackContactSectionView() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.contactSectionViewed) {
                    this.contactSectionViewed = true;
                    if (window.umami) {
                        window.umami.track('contact-section-view', {
                            language: document.documentElement.lang || 'unknown'
                        });
                    }
                }
            });
        }, {
            threshold: 0.5 // Track when 50% of section is visible
        });

        observer.observe(contactSection);
    }

    trackPhoneNumberSelection() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            // Track when user selects/copies the phone number
            link.addEventListener('copy', () => {
                if (window.umami) {
                    window.umami.track('phone-copy', {
                        phone: link.textContent.trim(),
                        language: document.documentElement.lang || 'unknown'
                    });
                }
            });

            // Also track mouseup events (indicating selection)
            link.addEventListener('mouseup', () => {
                setTimeout(() => {
                    const selection = window.getSelection().toString();
                    if (selection && selection.includes(link.textContent.trim())) {
                        if (window.umami) {
                            window.umami.track('phone-select', {
                                language: document.documentElement.lang || 'unknown'
                            });
                        }
                    }
                }, 100);
            });
        });
    }
}

// ==========================================
// Gallery Interaction Tracking
// ==========================================

class GalleryTracking {
    constructor() {
        this.galleryViewCount = 0;
        this.viewedImages = new Set();
        this.init();
    }

    init() {
        // Track gallery image clicks
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.viewedImages.add(index);
                if (window.umami) {
                    window.umami.track('gallery-image-view', {
                        imageIndex: index + 1,
                        totalViewed: this.viewedImages.size,
                        language: document.documentElement.lang || 'unknown'
                    });
                }
            });
        });

        // Track when user views 5+ images (high engagement)
        const checkEngagement = () => {
            if (this.viewedImages.size >= 5 && window.umami) {
                window.umami.track('gallery-high-engagement', {
                    imagesViewed: this.viewedImages.size,
                    language: document.documentElement.lang || 'unknown'
                });
                // Remove listener after tracking once
                document.removeEventListener('click', checkEngagement);
            }
        };
        document.addEventListener('click', checkEngagement);
    }
}

// ==========================================
// Scroll Depth Tracking
// ==========================================

class ScrollDepthTracking {
    constructor() {
        this.milestones = [25, 50, 75, 100];
        this.tracked = new Set();
        this.init();
    }

    init() {
        window.addEventListener('scroll', debounce(() => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            this.milestones.forEach(milestone => {
                if (scrollPercentage >= milestone && !this.tracked.has(milestone)) {
                    this.tracked.add(milestone);
                    if (window.umami) {
                        window.umami.track('scroll-depth', {
                            depth: milestone,
                            language: document.documentElement.lang || 'unknown'
                        });
                    }
                }
            });
        }, 500));
    }
}

// ==========================================
// Navigation Click Tracking
// ==========================================

class NavigationTracking {
    constructor() {
        this.init();
    }

    init() {
        // Track nav menu clicks
        const navLinks = document.querySelectorAll('.nav-menu a, .scroll-indicator');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const section = link.getAttribute('href').replace('#', '');
                if (window.umami && section) {
                    window.umami.track('navigation-click', {
                        section: section,
                        language: document.documentElement.lang || 'unknown'
                    });
                }
            });
        });

        // Track language changes
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                const newLang = e.target.value.match(/\/(en|nl|de|pt|sv|fr)\//)?.[1];
                if (window.umami && newLang) {
                    window.umami.track('language-change', {
                        from: document.documentElement.lang || 'unknown',
                        to: newLang
                    });
                }
            });
        }
    }
}

// ==========================================
// Map Interaction Tracking
// ==========================================

class MapTracking {
    constructor() {
        this.init();
    }

    init() {
        const mapElement = document.getElementById('propertyMap');
        if (!mapElement) return;

        // Track when map comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.umami) {
                    window.umami.track('map-view', {
                        language: document.documentElement.lang || 'unknown'
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(mapElement);

        // Track map interactions (clicks, zooms)
        mapElement.addEventListener('click', () => {
            if (window.umami) {
                window.umami.track('map-interaction', {
                    language: document.documentElement.lang || 'unknown'
                });
            }
        }, { once: true }); // Only track first interaction
    }
}

// ==========================================
// Time on Page Tracking
// ==========================================

class TimeOnPageTracking {
    constructor() {
        this.startTime = Date.now();
        this.milestones = [30, 60, 120, 300]; // seconds
        this.tracked = new Set();
        this.init();
    }

    init() {
        setInterval(() => {
            const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);

            this.milestones.forEach(milestone => {
                if (timeSpent >= milestone && !this.tracked.has(milestone)) {
                    this.tracked.add(milestone);
                    if (window.umami) {
                        window.umami.track('time-on-page', {
                            seconds: milestone,
                            language: document.documentElement.lang || 'unknown'
                        });
                    }
                }
            });
        }, 5000); // Check every 5 seconds
    }
}

// ==========================================
// External Link Tracking
// ==========================================

class ExternalLinkTracking {
    constructor() {
        this.init();
    }

    init() {
        // Track any external links (social media, etc.)
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && (link.hostname !== window.location.hostname || link.href.startsWith('tel:') || link.href.startsWith('mailto:'))) {
                if (window.umami) {
                    const linkType = link.href.startsWith('tel:') ? 'phone' :
                                    link.href.startsWith('mailto:') ? 'email' : 'external';

                    if (linkType === 'external') {
                        window.umami.track('external-link-click', {
                            url: link.href,
                            language: document.documentElement.lang || 'unknown'
                        });
                    }
                }
            }
        });
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
    new PhoneTracking();

    // Initialize tracking components
    new GalleryTracking();
    new ScrollDepthTracking();
    new NavigationTracking();
    new MapTracking();
    new TimeOnPageTracking();
    new ExternalLinkTracking();

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
