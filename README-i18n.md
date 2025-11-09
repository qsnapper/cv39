# Multi-Language Setup Guide

## Overview

This website now supports 6 languages:
- 🇬🇧 English (default)
- 🇳🇱 Dutch (Nederlands)
- 🇩🇪 German (Deutsch)
- 🇵🇹 Portuguese (Português)
- 🇸🇪 Swedish (Svenska)
- 🇫🇷 French (Français)

## Architecture

The implementation uses a build-time translation system:
- **Translation files**: JSON files in `translations/` folder
- **Build script**: `build-i18n.js` generates HTML for each language
- **Language directories**: Each language has its own folder (`/en/`, `/nl/`, etc.)
- **Shared assets**: CSS, JS, and images are shared across all versions

## File Structure

```
cv39/
├── translations/
│   ├── en.json          # English translations (complete)
│   ├── nl.json          # Dutch translations (needs translation)
│   ├── de.json          # German translations (needs translation)
│   ├── pt.json          # Portuguese translations (needs translation)
│   ├── sv.json          # Swedish translations (needs translation)
│   └── fr.json          # French translations (needs translation)
├── en/index.html        # Generated English page
├── nl/index.html        # Generated Dutch page
├── de/index.html        # Generated German page
├── pt/index.html        # Generated Portuguese page
├── sv/index.html        # Generated Swedish page
├── fr/index.html        # Generated French page
├── build-i18n.js        # Build script
├── index.html.backup    # Original single-language version
├── sitemap.xml          # SEO sitemap with all languages
└── [shared assets]      # styles.css, script.js, images/
```

## How to Update Content

### 1. Translate Content

The easiest way is to translate the JSON files:

1. Open `translations/nl.json` (or any other language)
2. Replace English text with translated text
3. Keep the JSON structure intact
4. Save the file

**Example:**
```json
{
  "hero": {
    "title": "Exquisite Countryside Villa",  // English
    ...
  }
}
```

Becomes (Dutch):
```json
{
  "hero": {
    "title": "Voortreffelijke Landelijke Villa",  // Dutch
    ...
  }
}
```

### 2. Rebuild All Language Versions

After editing translation files, run:

```bash
npm run build
```

Or:

```bash
node build-i18n.js
```

This will regenerate all 6 language HTML files with the updated translations.

### 3. Test Locally

Open any language version in your browser:
- `en/index.html` - English
- `nl/index.html` - Dutch
- `de/index.html` - German
- etc.

Test the language selector dropdown in the navigation bar.

### 4. Deploy to Netlify

When you push to Git, Netlify will automatically:
1. Run `node build-i18n.js` (configured in netlify.toml)
2. Deploy all generated language versions
3. Set up proper redirects

## Translation Tips

### What to Translate

✅ **Do translate:**
- Page titles and meta descriptions
- Navigation labels
- Headings and body text
- Feature lists
- Contact form labels
- Button text
- Image alt text (for accessibility)

❌ **Don't translate:**
- Property reference numbers (CV39)
- Phone numbers
- Email addresses
- Measurements (298m², 2,064m²)
- Prices (€1,045,000)
- Brand names (Smeg, Siemens, STUV, Keller)

### Translation Tools

You can use:
- Professional translation services
- Google Translate (for draft, then review)
- Native speakers
- AI translation tools (ChatGPT, DeepL)

**Important:** Always have native speakers review translations for accuracy and natural language flow.

## SEO Features

✅ **Implemented:**
- Separate URLs per language (`/en/`, `/nl/`, etc.)
- hreflang tags linking all language versions
- Language-specific meta tags (title, description)
- Sitemap.xml with all language URLs
- Canonical URLs
- Proper redirect from root to `/en/`

## Maintenance Workflow

### Adding New Content

1. Edit `translations/en.json` (English) with new content
2. Update the build script if you added new sections
3. Run `npm run build`
4. Translate the new content to other languages
5. Run `npm run build` again
6. Deploy

### Updating Existing Content

1. Edit the relevant translation files
2. Run `npm run build`
3. Test locally
4. Deploy

### Adding a New Language

1. Create `translations/xx.json` (where xx is the language code)
2. Add language to `languages` array in `build-i18n.js`
3. Add language name to `languageNames` object
4. Add flag emoji to `flags` object
5. Create folder: `mkdir xx`
6. Update netlify.toml redirects
7. Update sitemap.xml
8. Run `npm run build`

## Troubleshooting

### Issue: Generated files don't have translations

**Solution:** Check that:
- Translation JSON files have correct structure
- JSON is valid (no syntax errors)
- You ran the build script after making changes

### Issue: Language selector not working

**Solution:**
- Check browser console for JavaScript errors
- Verify the select element has proper URLs
- Make sure all language folders exist

### Issue: Images not loading

**Solution:**
- Images use relative paths (`../images/`)
- Don't move image folder
- Check that build script updated paths correctly

### Issue: Netlify build fails

**Solution:**
- Ensure package.json exists
- Check Node.js version (needs >= 14.0.0)
- Verify build-i18n.js has no syntax errors

## Current Status

- ✅ Build system implemented
- ✅ English translations complete
- ⏳ Dutch translations needed
- ⏳ German translations needed
- ⏳ Portuguese translations needed
- ⏳ Swedish translations needed
- ⏳ French translations needed

## Next Steps

1. **Translate content**: Get professional translations for all languages
2. **Test thoroughly**: Check all pages, links, and language switching
3. **Update domain**: Change sitemap.xml URLs from example to actual domain
4. **Deploy**: Push to Git and deploy via Netlify
5. **Monitor**: Check Google Search Console for proper language indexing

## Support

For questions or issues with the multi-language setup, contact the developer or refer to:
- [index.html.backup](index.html.backup) - Original single-language version
- [build-i18n.js](build-i18n.js) - Build script with inline comments
