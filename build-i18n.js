#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Language configurations
const languages = ['en', 'nl', 'de', 'pt', 'sv', 'fr'];
const languageNames = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  pt: 'Português',
  sv: 'Svenska',
  fr: 'Français'
};

// Helper function to safely get nested translation values
function getTranslation(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj) || '';
}

// Helper function to replace placeholders in HTML with translation values
function replacePlaceholders(html, translations, currentLang) {
  let result = html;

  // Replace meta tags
  result = result.replace(
    /<html lang="[^"]*">/,
    `<html lang="${translations.meta.lang}">`
  );
  result = result.replace(
    /<title>.*?<\/title>/,
    `<title>${translations.meta.title}</title>`
  );
  result = result.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${translations.meta.description}">`
  );

  // Add hreflang tags before closing </head>
  let hreflangTags = languages.map(lang => {
    const url = lang === 'en' ? '/' : `/${lang}/`;
    return `    <link rel="alternate" hreflang="${lang}" href="${url}">`;
  }).join('\n');
  hreflangTags += '\n    <link rel="alternate" hreflang="x-default" href="/">';
  result = result.replace('</head>', `${hreflangTags}\n</head>`);

  // Update asset paths to go up one level
  result = result.replace(/href="styles\.css"/g, 'href="../styles.css"');
  result = result.replace(/src="script\.js"/g, 'src="../script.js"');
  result = result.replace(/src='images\//g, "src='../images/");
  result = result.replace(/src="images\//g, 'src="../images/');
  result = result.replace(/url\('images\//g, "url('../images/");

  // Navigation
  result = result.replace(
    /<div class="nav-brand">.*?<\/div>/,
    `<div class="nav-brand">${translations.nav.brand}</div>`
  );
  result = result.replace(
    /<a href="#overview">.*?<\/a>/,
    `<a href="#overview">${translations.nav.overview}</a>`
  );
  result = result.replace(
    /<a href="#gallery">.*?<\/a>/,
    `<a href="#gallery">${translations.nav.gallery}</a>`
  );
  result = result.replace(
    /<a href="#features">.*?<\/a>/,
    `<a href="#features">${translations.nav.features}</a>`
  );
  result = result.replace(
    /<a href="#location">.*?<\/a>/,
    `<a href="#location">${translations.nav.location}</a>`
  );
  result = result.replace(
    /<a href="#contact" class="btn-contact">.*?<\/a>/,
    `<a href="#contact" class="btn-contact">${translations.nav.contact}</a>`
  );

  // Add language selector after nav-menu
  const langSelectorHTML = generateLanguageSelector(currentLang);
  result = result.replace(
    /<\/ul>\s*<\/div>\s*<\/nav>/,
    `</ul>\n            ${langSelectorHTML}\n        </div>\n    </nav>`
  );

  // Hero section
  result = result.replace(
    /<h1 class="hero-title">.*?<\/h1>/,
    `<h1 class="hero-title">${translations.hero.title}</h1>`
  );
  result = result.replace(
    /<p class="hero-subtitle">.*?<\/p>/,
    `<p class="hero-subtitle">${translations.hero.subtitle}</p>`
  );
  result = result.replace(
    /<div class="hero-price">.*?<\/div>/,
    `<div class="hero-price">${translations.hero.price}</div>`
  );

  // Quick facts
  result = result.replace(
    /<div class="fact-label">Bedrooms<\/div>/,
    `<div class="fact-label">${translations.quickFacts.bedrooms}</div>`
  );
  result = result.replace(
    /<div class="fact-label">Bathrooms<\/div>/,
    `<div class="fact-label">${translations.quickFacts.bathrooms}</div>`
  );
  result = result.replace(
    /<div class="fact-label">Built Area<\/div>/,
    `<div class="fact-label">${translations.quickFacts.builtArea}</div>`
  );
  result = result.replace(
    /<div class="fact-label">Plot Size<\/div>/,
    `<div class="fact-label">${translations.quickFacts.plotSize}</div>`
  );
  result = result.replace(
    /<div class="fact-label">Swimming Pool<\/div>/,
    `<div class="fact-label">${translations.quickFacts.swimmingPool}</div>`
  );

  // Owner banner
  result = result.replace(
    /<span class="badge-text">Direct from Owner<\/span>/,
    `<span class="badge-text">${translations.ownerBanner.badge}</span>`
  );
  result = result.replace(
    /<span>No Agent Commission<\/span>/,
    `<span>${translations.ownerBanner.benefit1}</span>`
  );
  result = result.replace(
    /<span>Direct Communication<\/span>/,
    `<span>${translations.ownerBanner.benefit2}</span>`
  );
  result = result.replace(
    /<span>Faster Transaction<\/span>/,
    `<span>${translations.ownerBanner.benefit3}</span>`
  );
  result = result.replace(
    /<span>Full Property Knowledge<\/span>/,
    `<span>${translations.ownerBanner.benefit4}</span>`
  );

  // Overview section
  result = result.replace(
    /<h2>A Rare Countryside Sanctuary<\/h2>/,
    `<h2>${translations.overview.heading}</h2>`
  );
  result = result.replace(
    /<p class="lead">Discover this exceptional T4 villa.*?<\/p>/s,
    `<p class="lead">${translations.overview.leadText}</p>`
  );

  // Replace the overview paragraphs
  const overviewSection = result.match(/<div class="overview-text">([\s\S]*?)<div class="highlights-grid">/);
  if (overviewSection) {
    let overviewHTML = `<div class="overview-text">
                    <p class="lead">${translations.overview.leadText}</p>

                    <p>${translations.overview.paragraph1}</p>

                    <p>${translations.overview.paragraph2}</p>

                    <div class="highlights-grid">`;
    result = result.replace(
      /<div class="overview-text">[\s\S]*?<div class="highlights-grid">/,
      overviewHTML
    );
  }

  // Overview highlights
  for (let i = 1; i <= 7; i++) {
    const highlightKey = `highlight${i}`;
    const regex = new RegExp(`<span>${translations.overview[highlightKey].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</span>`, 'g');
    // This is already in English, so we just need to replace when the translation is different
  }

  // Replace all highlights in order
  let highlightIndex = 0;
  result = result.replace(/<div class="highlight-item">\s*<span class="highlight-icon">✓<\/span>\s*<span>([^<]+)<\/span>\s*<\/div>/g, (match) => {
    highlightIndex++;
    if (highlightIndex <= 7) {
      const highlightKey = `highlight${highlightIndex}`;
      return `<div class="highlight-item">
                            <span class="highlight-icon">✓</span>
                            <span>${translations.overview[highlightKey]}</span>
                        </div>`;
    }
    return match;
  });

  // Gallery
  result = result.replace(
    /<h2>Property Gallery<\/h2>/,
    `<h2>${translations.gallery.heading}</h2>`
  );
  result = result.replace(
    /<div class="gallery-overlay">View Image<\/div>/g,
    `<div class="gallery-overlay">${translations.gallery.viewImage}</div>`
  );

  // Update image alt texts
  const altMappings = {
    'Front Entrance': translations.gallery.alts.frontEntrance,
    'Swimming Pool': translations.gallery.alts.swimmingPool,
    'Pool Area': translations.gallery.alts.poolArea,
    'Landscaped Gardens': translations.gallery.alts.landscapedGardens,
    'Garden Overview': translations.gallery.alts.gardenOverview,
    'Entrance & Driveway': translations.gallery.alts.entranceDriveway,
    'Living Room': translations.gallery.alts.livingRoom,
    'Living Room View': translations.gallery.alts.livingRoomView,
    'Living Area with Fireplace': translations.gallery.alts.livingAreaFireplace,
    'Dining Room': translations.gallery.alts.diningRoom,
    'Dining Area': translations.gallery.alts.diningArea,
    'Dining Space': translations.gallery.alts.diningSpace,
    'Fully Equipped Kitchen': translations.gallery.alts.kitchen,
    'Entrance Hallway': translations.gallery.alts.hallway,
    'Interior Hallway': translations.gallery.alts.hallway2,
    'Master Bedroom': translations.gallery.alts.masterBedroom,
    'Master Suite': translations.gallery.alts.masterSuite,
    'Bedroom 2': translations.gallery.alts.bedroom2,
    'Bedroom 3': translations.gallery.alts.bedroom3,
    'Bathroom': translations.gallery.alts.bathroom,
    'Ensuite Bathroom': translations.gallery.alts.ensuiteBathroom,
    'Office Space': translations.gallery.alts.office,
    'Gym Facility': translations.gallery.alts.gym,
    'Outdoor Terrace': translations.gallery.alts.outdoorTerrace,
    'Outdoor Seating Area': translations.gallery.alts.seatingArea,
    'Garden Pathways': translations.gallery.alts.gardenPathways,
    'Garden Features': translations.gallery.alts.gardenFeatures,
    'Mature Landscaping': translations.gallery.alts.matureLandscaping,
    'Garden Terrace': translations.gallery.alts.gardenTerrace,
    'Garden Views': translations.gallery.alts.gardenViews,
    'Garden Grounds': translations.gallery.alts.gardenGrounds,
    'Garden Area': translations.gallery.alts.gardenArea,
    'Property Features': translations.gallery.alts.propertyFeatures,
    'Satellite View of Property': translations.gallery.alts.satelliteView,
    'Property Floor Plan': translations.gallery.alts.floorplan
  };

  for (const [oldAlt, newAlt] of Object.entries(altMappings)) {
    result = result.replace(new RegExp(`alt="${oldAlt}"`, 'g'), `alt="${newAlt}"`);
  }

  // Features section
  result = result.replace(
    /<h2>Exceptional Features & Amenities<\/h2>/,
    `<h2>${translations.features.heading}</h2>`
  );
  result = result.replace(
    /<h3>Interior Excellence<\/h3>/,
    `<h3>${translations.features.interior.title}</h3>`
  );
  result = result.replace(
    /<h3>Outdoor Living<\/h3>/,
    `<h3>${translations.features.outdoor.title}</h3>`
  );
  result = result.replace(
    /<h3>Premium Amenities<\/h3>/,
    `<h3>${translations.features.amenities.title}</h3>`
  );
  result = result.replace(
    /<h3>Lifestyle Advantages<\/h3>/,
    `<h3>${translations.features.lifestyle.title}</h3>`
  );

  // Replace feature lists
  const featureSections = [
    { key: 'interior', regex: /<h3>.*Interior Excellence.*<\/h3>\s*<ul class="feature-list">([\s\S]*?)<\/ul>/ },
    { key: 'outdoor', regex: /<h3>.*Outdoor Living.*<\/h3>\s*<ul class="feature-list">([\s\S]*?)<\/ul>/ },
    { key: 'amenities', regex: /<h3>.*Premium Amenities.*<\/h3>\s*<ul class="feature-list">([\s\S]*?)<\/ul>/ },
    { key: 'lifestyle', regex: /<h3>.*Lifestyle Advantages.*<\/h3>\s*<ul class="feature-list">([\s\S]*?)<\/ul>/ }
  ];

  featureSections.forEach(section => {
    const items = translations.features[section.key].items;
    const listHTML = items.map(item => `                        <li>${item}</li>`).join('\n');
    const replacement = `<h3>${translations.features[section.key].title}</h3>
                    <ul class="feature-list">
${listHTML}
                    </ul>`;
    result = result.replace(section.regex, replacement);
  });

  // Location section
  result = result.replace(
    /<h2>Prime Location<\/h2>/,
    `<h2>${translations.location.heading}</h2>`
  );
  result = result.replace(
    /<h3>Colinas Verdes, Bensafrim, Lagos, Portugal<\/h3>/,
    `<h3>${translations.location.subheading}</h3>`
  );
  result = result.replace(
    /<p>Situated in the sought-after Colinas Verdes development.*?<\/p>/s,
    `<p>${translations.location.intro}</p>`
  );

  // Location highlights
  result = result.replace(
    /<strong>Lagos City Center:<\/strong> 10 minutes/,
    `<strong>${translations.location.highlights.lagos}</strong> ${translations.location.highlights.lagosValue}`
  );
  result = result.replace(
    /<strong>Beaches:<\/strong> Short drive to pristine Portugal's Algarve coastline/,
    `<strong>${translations.location.highlights.beaches}</strong> ${translations.location.highlights.beachesValue}`
  );
  result = result.replace(
    /<strong>Golf Courses:<\/strong> Multiple championship courses nearby in Portugal/,
    `<strong>${translations.location.highlights.golf}</strong> ${translations.location.highlights.golfValue}`
  );
  result = result.replace(
    /<strong>Airport:<\/strong> Faro International Airport, Portugal within easy reach/,
    `<strong>${translations.location.highlights.airport}</strong> ${translations.location.highlights.airportValue}`
  );
  result = result.replace(
    /<strong>Restaurants & Shopping:<\/strong> Lagos offers excellent dining and retail/,
    `<strong>${translations.location.highlights.dining}</strong> ${translations.location.highlights.diningValue}`
  );

  result = result.replace(
    /<p class="location-description">Lagos is one of Portugal's Algarve region's.*?<\/p>/s,
    `<p class="location-description">${translations.location.description}</p>`
  );

  // Contact section
  result = result.replace(
    /<h2>Speak Directly with the Owner<\/h2>/,
    `<h2>${translations.contact.heading}</h2>`
  );
  result = result.replace(
    /<p class="section-subtitle">Get authentic insights and arrange your private viewing directly<\/p>/,
    `<p class="section-subtitle">${translations.contact.subtitle}</p>`
  );
  result = result.replace(
    /<span>Direct Owner Contact<\/span>/,
    `<span>${translations.contact.badge}</span>`
  );
  result = result.replace(
    /<h3>Contact Information<\/h3>/,
    `<h3>${translations.contact.infoHeading}</h3>`
  );
  result = result.replace(
    /<strong>Phone:<\/strong>/,
    `<strong>${translations.contact.phone}</strong>`
  );
  result = result.replace(
    /<strong>Reference:<\/strong>/,
    `<strong>${translations.contact.reference}</strong>`
  );
  result = result.replace(
    /CV39 - Colinas Verdes Villa/,
    translations.contact.referenceValue
  );
  result = result.replace(
    /<h4>Why Buy Direct\?<\/h4>/,
    `<h4>${translations.contact.whyBuyDirect}</h4>`
  );

  // Contact benefits list
  const benefitsHTML = translations.contact.benefits.map(benefit =>
    `                            <li>${benefit}</li>`
  ).join('\n');
  result = result.replace(
    /<h4>.*Why Buy Direct.*<\/h4>\s*<ul>([\s\S]*?)<\/ul>/,
    `<h4>${translations.contact.whyBuyDirect}</h4>
                        <ul>
${benefitsHTML}
                        </ul>`
  );

  // Contact form
  result = result.replace(
    /<label for="name">Full Name \*<\/label>/,
    `<label for="name">${translations.contact.form.fullName}</label>`
  );
  result = result.replace(
    /<label for="email">Email Address \*<\/label>/,
    `<label for="email">${translations.contact.form.email}</label>`
  );
  result = result.replace(
    /<label for="phone">Phone Number<\/label>/,
    `<label for="phone">${translations.contact.form.phoneLabel}</label>`
  );
  result = result.replace(
    /<label for="message">Message \*<\/label>/,
    `<label for="message">${translations.contact.form.message}</label>`
  );
  result = result.replace(
    /<button type="submit" class="btn-submit">Send Inquiry<\/button>/,
    `<button type="submit" class="btn-submit">${translations.contact.form.submit}</button>`
  );
  result = result.replace(
    /<label>Don't fill this out if you're human:/,
    `<label>${translations.contact.form.dontFillLabel}`
  );

  // Footer
  result = result.replace(
    /&copy; 2025 Colinas Verdes Villa\. All rights reserved\./,
    translations.footer.copyright
  );
  result = result.replace(
    /<p class="footer-ref">Property Reference: CV39<\/p>/,
    `<p class="footer-ref">${translations.footer.reference}</p>`
  );

  return result;
}

// Generate language selector HTML
function generateLanguageSelector(currentLang) {
  const flags = {
    en: '🇬🇧',
    nl: '🇳🇱',
    de: '🇩🇪',
    pt: '🇵🇹',
    sv: '🇸🇪',
    fr: '🇫🇷'
  };

  const options = languages.map(lang => {
    const url = `/${lang}/`;
    const selected = lang === currentLang ? ' selected' : '';
    return `                    <option value="${url}"${selected}>${flags[lang]} ${languageNames[lang]}</option>`;
  }).join('\n');

  return `<div class="language-selector">
                <select id="languageSelect" onchange="window.location.href=this.value">
${options}
                </select>
            </div>`;
}

// Main build function
function buildLanguageVersions() {
  console.log('Building multi-language versions...\n');

  // Read the template (use backup if it exists, otherwise use index.html)
  const rootIndexBackup = path.join(__dirname, 'index.html.backup');
  const rootIndexPath = path.join(__dirname, 'index.html');
  const templatePath = fs.existsSync(rootIndexBackup) ? rootIndexBackup : rootIndexPath;
  const templateHTML = fs.readFileSync(templatePath, 'utf8');

  // Generate each language version
  languages.forEach(lang => {
    console.log(`Building ${languageNames[lang]} (${lang})...`);

    // Load translations
    const translationsPath = path.join(__dirname, 'translations', `${lang}.json`);
    const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

    // Replace placeholders
    const localizedHTML = replacePlaceholders(templateHTML, translations, lang);

    // Write to language directory
    const outputDir = path.join(__dirname, lang);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(outputPath, localizedHTML, 'utf8');

    console.log(`  ✓ Created ${lang}/index.html`);
  });

  // Create redirect index.html at root
  const redirectHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=/en/">
    <script>window.location.href = '/en/';</script>
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to <a href="/en/">English version</a>...</p>
</body>
</html>`;

  // Backup original if not already backed up (already defined above)
  if (!fs.existsSync(rootIndexBackup)) {
    fs.copyFileSync(rootIndexPath, rootIndexBackup);
    console.log('\n✓ Backed up original index.html to index.html.backup');
  }

  fs.writeFileSync(rootIndexPath, redirectHTML, 'utf8');
  console.log('✓ Created redirect at root index.html');

  console.log('\n✅ Build complete! All language versions generated.');
  console.log('\nNext steps:');
  console.log('1. Translate the content in translations/*.json files');
  console.log('2. Run this script again to regenerate the HTML files');
  console.log('3. Test locally, then deploy to Netlify');
}

// Run the build
buildLanguageVersions();
