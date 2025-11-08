// Content Loader for Multi-language Support
class ContentLoader {
    constructor() {
        this.currentLang = this.getLanguage();
        this.content = null;
        this.settings = null;
    }

    // Get current language from URL, localStorage, or browser default
    getLanguage() {
        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang) {
            localStorage.setItem('preferredLanguage', urlLang);
            return urlLang;
        }

        // Check localStorage
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang) {
            return storedLang;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        const supportedLangs = ['en', 'pt', 'fr', 'de'];
        if (supportedLangs.includes(browserLang)) {
            return browserLang;
        }

        // Default to English
        return 'en';
    }

    // Set language
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);

        // Reload content
        this.loadContent();
    }

    // Load content from JSON files
    async loadContent() {
        try {
            // Load property content
            const propertyResponse = await fetch(`content/property/main.${this.currentLang}.json`);
            this.content = await propertyResponse.json();

            // Load settings
            const settingsResponse = await fetch('content/settings/general.json');
            this.settings = await settingsResponse.json();

            // Populate the page
            this.populatePage();
        } catch (error) {
            console.error('Error loading content:', error);
            // Fallback to English if there's an error
            if (this.currentLang !== 'en') {
                this.currentLang = 'en';
                this.loadContent();
            }
        }
    }

    // Populate page with content
    populatePage() {
        if (!this.content) return;

        // Update page title and meta
        document.title = this.content.title + ' - ' + this.content.subtitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', this.settings.meta_description);
        }

        // Navigation
        this.updateNavigation();

        // Hero Section
        this.updateHero();

        // Quick Facts
        this.updateQuickFacts();

        // Owner Banner
        this.updateOwnerBanner();

        // Overview
        this.updateOverview();

        // Features
        this.updateFeatures();

        // Location
        this.updateLocation();

        // Contact
        this.updateContact();

        // Footer
        this.updateFooter();

        // Add active class to current language
        this.updateLanguageSwitcher();
    }

    // Update Navigation
    updateNavigation() {
        const nav = this.content.navigation;
        document.querySelector('.nav-brand').textContent = nav.brand;

        const menuContainer = document.querySelector('.nav-menu');
        const langSwitcher = menuContainer.querySelector('.language-switcher');
        menuContainer.innerHTML = '';

        nav.menu.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.link;
            a.textContent = item.label;
            if (item.link === '#contact') {
                a.className = 'btn-contact';
            }
            li.appendChild(a);
            menuContainer.appendChild(li);
        });

        // Re-add language switcher
        if (langSwitcher) {
            menuContainer.appendChild(langSwitcher);
        }
    }

    // Update Hero Section
    updateHero() {
        const hero = document.querySelector('.hero');
        hero.style.backgroundImage = `url('${this.content.hero_image}')`;

        document.querySelector('.hero-title').textContent = this.content.title;
        document.querySelector('.hero-subtitle').textContent = this.content.subtitle;
        document.querySelector('.hero-price').textContent = this.content.price;
    }

    // Update Quick Facts
    updateQuickFacts() {
        const facts = this.content.quick_facts;
        const factItems = document.querySelectorAll('.fact-item');

        const values = [facts.bedrooms, facts.bathrooms, facts.built_area, facts.plot_size, facts.pool_size];
        factItems.forEach((item, index) => {
            const valueEl = item.querySelector('.fact-value');
            if (valueEl) {
                valueEl.textContent = values[index];
            }
        });
    }

    // Update Owner Banner
    updateOwnerBanner() {
        const banner = this.content.owner_banner;
        document.querySelector('.badge-text').textContent = banner.badge_text;

        const benefits = document.querySelectorAll('.benefit-item span');
        benefits.forEach((span, index) => {
            if (banner.benefits[index]) {
                span.textContent = banner.benefits[index].text;
            }
        });
    }

    // Update Overview Section
    updateOverview() {
        const overview = this.content.overview;
        document.querySelector('#overview .section-header h2').textContent = overview.title;

        const paragraphs = document.querySelectorAll('.overview-text p');
        paragraphs[0].textContent = overview.lead;
        paragraphs[1].textContent = overview.description1;
        paragraphs[2].textContent = overview.description2;

        // Update highlights
        const highlightsGrid = document.querySelector('.highlights-grid');
        highlightsGrid.innerHTML = '';
        overview.highlights.forEach(highlight => {
            const div = document.createElement('div');
            div.className = 'highlight-item';
            div.innerHTML = `
                <span class="highlight-icon">✓</span>
                <span>${highlight.text}</span>
            `;
            highlightsGrid.appendChild(div);
        });
    }

    // Update Features Section
    updateFeatures() {
        const features = this.content.features;
        document.querySelector('#features .section-header h2').textContent = features.title;

        // Interior
        const categories = document.querySelectorAll('.feature-category');
        this.updateFeatureCategory(categories[0], features.interior);
        this.updateFeatureCategory(categories[1], features.outdoor);
        this.updateFeatureCategory(categories[2], features.amenities);
        this.updateFeatureCategory(categories[3], features.lifestyle);
    }

    updateFeatureCategory(categoryEl, data) {
        categoryEl.querySelector('h3').textContent = data.title;
        const list = categoryEl.querySelector('.feature-list');
        list.innerHTML = '';
        data.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }

    // Update Location Section
    updateLocation() {
        const location = this.content.location;
        document.querySelector('#location .section-header h2').textContent = location.title;
        document.querySelector('.location-text h3').textContent = location.name;

        const paragraphs = document.querySelectorAll('.location-text p');
        paragraphs[0].textContent = location.description;
        paragraphs[1].textContent = location.additional_info;

        // Update location highlights
        const highlightsContainer = document.querySelector('.location-highlights');
        highlightsContainer.innerHTML = '';
        location.highlights.forEach(highlight => {
            const div = document.createElement('div');
            div.className = 'location-item';
            div.innerHTML = `<strong>${highlight.label}</strong> ${highlight.value}`;
            highlightsContainer.appendChild(div);
        });
    }

    // Update Contact Section
    updateContact() {
        const contact = this.content.contact;
        document.querySelector('#contact .section-header h2').textContent = contact.title;
        document.querySelector('.section-subtitle').textContent = contact.subtitle;
        document.querySelector('.owner-contact-badge span').textContent = contact.badge_text;

        const contactDetails = document.querySelector('.contact-details');
        contactDetails.innerHTML = `
            <div class="contact-item">
                <strong>Phone:</strong>
                <a href="tel:${contact.phone}">${contact.phone}</a>
            </div>
            <div class="contact-item">
                <strong>Reference:</strong>
                ${contact.reference}
            </div>
        `;

        document.querySelector('.contact-cta h4').textContent = contact.why_title;

        const benefitsList = document.querySelector('.contact-cta ul');
        benefitsList.innerHTML = '';
        contact.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            benefitsList.appendChild(li);
        });
    }

    // Update Footer
    updateFooter() {
        const footer = document.querySelector('.footer p');
        footer.textContent = this.settings.copyright;
    }

    // Update language switcher active state
    updateLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Initialize language switcher
    initLanguageSwitcher() {
        const navMenu = document.querySelector('.nav-menu');

        // Create language switcher
        const langSwitcher = document.createElement('li');
        langSwitcher.className = 'language-switcher';

        this.settings.languages.forEach(lang => {
            const btn = document.createElement('button');
            btn.className = 'lang-btn';
            btn.dataset.lang = lang.code;
            btn.textContent = lang.flag;
            btn.title = lang.name;
            btn.addEventListener('click', () => this.setLanguage(lang.code));
            langSwitcher.appendChild(btn);
        });

        navMenu.appendChild(langSwitcher);
        this.updateLanguageSwitcher();
    }

    // Initialize
    async init() {
        await this.loadContent();
        this.initLanguageSwitcher();
    }
}

// Initialize content loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new ContentLoader();
        loader.init();
    });
} else {
    const loader = new ContentLoader();
    loader.init();
}
