# Colinas Verdes Villa - Property Promotional Website

A luxury single-page website to promote your beautiful 4-bedroom villa in Colinas Verdes, Lagos.

## 🎉 NEW: Content Management System (CMS) + Multi-Language Support

Your website now features:
- ✅ **Easy Content Editing** - Update text, images, and features through a user-friendly admin panel
- ✅ **Multi-Language Support** - English, Portuguese, French, and German
- ✅ **No Coding Required** - Edit everything through `/admin/` panel
- ✅ **Git-Based CMS** - All changes are version-controlled
- ✅ **Free Forever** - Powered by Decap CMS (formerly Netlify CMS)

**📖 [Read the Complete CMS Guide](CMS_GUIDE.md)** - Step-by-step instructions for editing your site

## Overview

This is a dynamic website built with HTML, CSS, and vanilla JavaScript. It features:
- 🌍 **Multi-language support** (EN, PT, FR, DE) with automatic detection
- 📝 **Content Management System** for easy editing
- 🎨 Luxury/elegant design with sophisticated color palette
- 📱 Responsive layout (mobile, tablet, desktop)
- 🖼️ Image gallery with lightbox functionality
- 📧 Contact form with Netlify Forms integration
- 🔄 Smooth scrolling navigation
- 🔍 SEO-friendly markup

## Quick Start

### Using the CMS (Recommended for Content Updates)

1. **Deploy to Netlify** (if not already done)
2. **Enable Netlify Identity**: Go to Netlify Dashboard → Identity → Enable Identity
3. **Enable Git Gateway**: Identity Settings → Git Gateway → Enable
4. **Invite yourself**: Identity → Invite users → Enter your email
5. **Access CMS**: Visit `https://your-site.netlify.app/admin/`

📖 **[See Full CMS Setup Guide](CMS_GUIDE.md)**

### Editing Content

Once the CMS is set up, you can edit:
- Text content in 4 languages
- Property features and descriptions
- Images and gallery
- Contact information
- All without touching code!

## Getting Started

### Viewing the Website Locally

Simply open `index.html` in your web browser:
1. Navigate to the project folder
2. Double-click `index.html` or right-click and select "Open with" your preferred browser

Alternatively, you can use a local web server for better performance:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000` in your browser.

## Adding Your Property Images

### Step 1: Prepare Your Images

For best results, optimize your images before uploading:
- **Recommended size:** 1920x1440px or similar 4:3 aspect ratio
- **Format:** JPG (for photos)
- **File size:** Keep under 500KB per image for fast loading
- **Quantity:** 9+ images showing different aspects of the property

### Step 2: Image Naming Convention

Replace the placeholder images with your own photos using these suggested names:

**In the `images/` folder:**

```
images/
├── hero-background.jpg       (Main hero image - pool/garden view)
├── placeholder-1.jpg          → exterior-front.jpg
├── placeholder-2.jpg          → pool-view.jpg
├── placeholder-3.jpg          → living-room.jpg
├── placeholder-4.jpg          → garden-pond.jpg
├── placeholder-5.jpg          → kitchen.jpg
├── placeholder-6.jpg          → master-bedroom.jpg
├── placeholder-7.jpg          → terrace.jpg
├── placeholder-8.jpg          → garden-overview.jpg
└── placeholder-9.jpg          → bathroom.jpg
```

### Step 3: Update the HTML

Open `index.html` and update the image sources in the gallery section (around line 145):

**Before:**
```html
<img src="images/placeholder-1.jpg" alt="Property Exterior" data-index="0">
```

**After:**
```html
<img src="images/exterior-front.jpg" alt="Property Exterior" data-index="0">
```

### Suggested Image Categories

**Exterior (3-4 images):**
- Front facade
- Pool area
- Garden overview
- Terrace/outdoor dining

**Interior (4-5 images):**
- Living room with fireplace
- Kitchen with appliances
- Master bedroom
- Bathroom(s)
- Office/additional rooms

**Amenities (2-3 images):**
- Gym cabin
- Sauna
- Garden features (fish pond, paths)

### Adding More Images

To add more than 9 images to the gallery:

1. Add the image to the `images/` folder
2. Copy an existing gallery item block in `index.html`
3. Update the image source, alt text, and data-index number

Example:
```html
<div class="gallery-item" data-category="interior">
    <img src="images/your-new-image.jpg" alt="Description" data-index="9">
    <div class="gallery-overlay">View Image</div>
</div>
```

## Updating Contact Information

### Step 1: Update Contact Details

Open `index.html` and find the contact section (around line 305):

**Update the phone number:**
```html
<a href="tel:+351XXXXXXXXX">+351 XXX XXX XXX</a>
```
Change both the `href` and display text to your actual phone number.

**Update the email:**
```html
<a href="mailto:your.email@example.com">your.email@example.com</a>
```

### Step 2: Configure the Contact Form

The contact form currently displays success messages but doesn't actually send emails. To make it functional, you have several options:

#### Option 1: Formspree (Easiest)

1. Go to [formspree.io](https://formspree.io/) and create a free account
2. Create a new form and get your form endpoint
3. Update the form tag in `index.html`:

```html
<form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. Update `script.js` to remove the simulation and let the form submit naturally

#### Option 2: Web3Forms (Free, No Backend)

1. Visit [web3forms.com](https://web3forms.com/)
2. Get your access key
3. Add a hidden field to the form:

```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
```

#### Option 3: Netlify Forms (If hosting on Netlify)

1. Add `netlify` attribute to the form:

```html
<form id="contactForm" class="contact-form" netlify>
```

#### Option 4: Custom Backend

If you have your own server, update the `handleSubmit()` method in `script.js` to send data to your backend API endpoint.

## Customization Guide

### Changing Colors

Edit `styles.css` (lines 1-15) to change the color scheme:

```css
:root {
    --primary-gold: #C9A961;      /* Main accent color */
    --dark-navy: #1A2332;         /* Dark backgrounds */
    --medium-navy: #2C3E50;       /* Secondary dark */
    --light-gold: #E5D4A6;        /* Light accent */
    --cream: #F8F6F2;             /* Light backgrounds */
    --white: #FFFFFF;
    --text-dark: #333333;
    --text-light: #666666;
}
```

### Changing Text Content

All text content is in `index.html`. You can edit:
- Property description (Overview section)
- Features and amenities lists
- Location information
- Contact information

### Changing the Price

Find the hero section in `index.html` (around line 33):

```html
<div class="hero-price">€1,095,000</div>
```

### Adding a Virtual Tour Video

To embed a video (YouTube, Vimeo, etc.), add this to the gallery or overview section:

```html
<div class="video-container">
    <iframe width="100%" height="500"
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        frameborder="0" allowfullscreen>
    </iframe>
</div>
```

Add this CSS to `styles.css`:

```css
.video-container {
    margin: 2rem 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
```

## Deployment Options

Once you've added your images and updated the content, deploy your website using one of these free hosting services:

### 1. Netlify (Recommended)

1. Create a free account at [netlify.com](https://www.netlify.com/)
2. Drag and drop the `cv39` folder to Netlify
3. Your site will be live at `https://your-site-name.netlify.app`
4. Optional: Connect a custom domain

### 2. GitHub Pages

1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload all files to the repository
4. Go to Settings > Pages
5. Select the main branch and save
6. Your site will be at `https://yourusername.github.io/repository-name`

### 3. Vercel

1. Create account at [vercel.com](https://vercel.com/)
2. Import your project from GitHub or upload directly
3. Deploy with one click
4. Get instant HTTPS and custom domain support

### 4. Cloudflare Pages

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com/)
2. Connect your Git repository or upload files
3. Deploy and get Cloudflare's CDN benefits

### 5. Traditional Web Hosting

Upload all files via FTP to any web hosting provider:
- Ensure all files maintain their folder structure
- Upload to the public_html or www directory
- Access via your domain name

## Custom Domain Setup

After deploying to any platform above:

1. Purchase a domain (e.g., from Namecheap, GoDaddy, or your hosting provider)
2. Follow your hosting platform's custom domain instructions
3. Update DNS records to point to your hosting platform
4. Wait 24-48 hours for DNS propagation

Suggested domain ideas:
- `colinasverdesvilla.com`
- `cv39lagos.com`
- `lagospropertyvilla.com`

## SEO Optimization

The website includes basic SEO optimization. To improve it further:

1. **Update meta description** in `index.html`:
```html
<meta name="description" content="Your custom description here">
```

2. **Add more meta tags**:
```html
<meta property="og:title" content="Luxury Villa for Sale - Colinas Verdes, Lagos">
<meta property="og:description" content="Stunning 4-bedroom villa with pool...">
<meta property="og:image" content="https://yoursite.com/images/hero-background.jpg">
<meta property="og:url" content="https://yoursite.com">
```

3. **Create a sitemap.xml** (most hosting platforms generate this automatically)

4. **Submit to Google Search Console** after deployment

## Browser Support

This website works on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Images not showing

- Check that image files are in the `images/` folder
- Verify file names match exactly (including extensions)
- Check file paths are correct in `index.html`

### Contact form not working

- Ensure you've configured a form backend (see "Configure the Contact Form" section)
- Check browser console for JavaScript errors
- Test email validation with proper email format

### Gallery lightbox not opening

- Check that `script.js` is loading properly
- Open browser console and look for JavaScript errors
- Verify all gallery items have the correct `data-index` attributes

### Mobile menu not showing

- The current implementation hides the menu on mobile for simplicity
- If you need a mobile menu, you can implement a hamburger menu toggle

## Performance Tips

1. **Optimize images before uploading:**
   - Use tools like TinyPNG or ImageOptim
   - Save as JPG with 80-85% quality
   - Resize to appropriate dimensions

2. **Enable caching** on your hosting platform

3. **Use a CDN** (most modern hosting providers include this)

4. **Minify CSS and JS** for production (optional)

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No dependencies, pure JS
- **No build process** - Ready to deploy as-is

## Files Structure

```
cv39/
├── index.html              # Main HTML file
├── styles.css              # All styling
├── script.js               # Gallery and map functionality
├── content-loader.js       # Multi-language content loader
├── admin/                  # CMS admin panel
│   ├── index.html         # CMS entry point
│   └── config.yml         # CMS configuration
├── content/                # Editable content (managed by CMS)
│   ├── property/          # Property information
│   │   ├── main.en.json   # English content
│   │   ├── main.pt.json   # Portuguese content
│   │   ├── main.fr.json   # French content
│   │   └── main.de.json   # German content
│   └── settings/          # Site settings
│       └── general.json   # Global settings
├── images/                 # Property images folder
├── README.md              # This file
├── CMS_GUIDE.md           # Complete CMS usage guide
└── netlify.toml           # Netlify configuration
```

## Support & Questions

For technical questions about the website:
- Check the troubleshooting section above
- Review the inline comments in the code
- Search online for specific HTML/CSS/JS questions

For web hosting questions:
- Consult your hosting provider's documentation
- Check their support resources

## Future Enhancements

Consider adding these features later:

- [ ] Multi-language support (Portuguese/English toggle)
- [ ] Virtual 360° tour integration
- [ ] Property comparison calculator
- [ ] Mortgage calculator
- [ ] Downloadable PDF brochure
- [ ] Print-optimized CSS
- [ ] WhatsApp direct contact button
- [ ] Google Maps integration
- [ ] Social media sharing buttons
- [ ] Analytics integration (Google Analytics)

## License

This website template is created for your personal use to promote your property at Colinas Verdes, Lagos.

---

**Good luck with selling your beautiful villa!**

For questions about the property, use the contact information you've added to the website.
