# Translation Checklist

Use this checklist to track translation progress for each language.

## Translation Files Location
All translation files are in the `translations/` folder.

## Languages Status

### 🇬🇧 English (en.json)
- [x] Complete ✅
- [x] Tested ✅

### 🇳🇱 Dutch (nl.json)
- [ ] Meta tags (title, description)
- [ ] Navigation menu
- [ ] Hero section
- [ ] Quick facts labels
- [ ] Owner banner
- [ ] Overview section (3 paragraphs + 7 highlights)
- [ ] Gallery image alt texts (35 images)
- [ ] Features section (4 categories with ~40 items total)
- [ ] Location section
- [ ] Contact section
- [ ] Contact form labels
- [ ] Footer
- [ ] Tested in browser

### 🇩🇪 German (de.json)
- [ ] Meta tags (title, description)
- [ ] Navigation menu
- [ ] Hero section
- [ ] Quick facts labels
- [ ] Owner banner
- [ ] Overview section (3 paragraphs + 7 highlights)
- [ ] Gallery image alt texts (35 images)
- [ ] Features section (4 categories with ~40 items total)
- [ ] Location section
- [ ] Contact section
- [ ] Contact form labels
- [ ] Footer
- [ ] Tested in browser

### 🇵🇹 Portuguese (pt.json)
- [ ] Meta tags (title, description)
- [ ] Navigation menu
- [ ] Hero section
- [ ] Quick facts labels
- [ ] Owner banner
- [ ] Overview section (3 paragraphs + 7 highlights)
- [ ] Gallery image alt texts (35 images)
- [ ] Features section (4 categories with ~40 items total)
- [ ] Location section
- [ ] Contact section
- [ ] Contact form labels
- [ ] Footer
- [ ] Tested in browser

### 🇸🇪 Swedish (sv.json)
- [ ] Meta tags (title, description)
- [ ] Navigation menu
- [ ] Hero section
- [ ] Quick facts labels
- [ ] Owner banner
- [ ] Overview section (3 paragraphs + 7 highlights)
- [ ] Gallery image alt texts (35 images)
- [ ] Features section (4 categories with ~40 items total)
- [ ] Location section
- [ ] Contact section
- [ ] Contact form labels
- [ ] Footer
- [ ] Tested in browser

### 🇫🇷 French (fr.json)
- [ ] Meta tags (title, description)
- [ ] Navigation menu
- [ ] Hero section
- [ ] Quick facts labels
- [ ] Owner banner
- [ ] Overview section (3 paragraphs + 7 highlights)
- [ ] Gallery image alt texts (35 images)
- [ ] Features section (4 categories with ~40 items total)
- [ ] Location section
- [ ] Contact section
- [ ] Contact form labels
- [ ] Footer
- [ ] Tested in browser

## Translation Workflow

For each language:

1. **Open the JSON file** (e.g., `translations/nl.json`)
2. **Translate all text values** (keep JSON keys unchanged)
3. **Save the file**
4. **Run build**: `npm run build`
5. **Test locally**: Open `nl/index.html` in browser
6. **Check**:
   - Language selector shows correct language selected
   - All text is translated
   - No English text remains
   - Images load correctly
   - Contact form works
   - Navigation links work
   - Responsive design works on mobile

## Important Translation Notes

### DO NOT Translate:
- ❌ JSON keys (e.g., `"hero"`, `"title"`, `"nav"`)
- ❌ Property reference: `CV39`
- ❌ Phone number: `+351 917 566 931`
- ❌ Numbers: `298m²`, `2,064m²`, `10x5m`
- ❌ Price: `€1,045,000`
- ❌ Brand names: `Smeg`, `Siemens`, `STUV`, `Keller`
- ❌ File paths or URLs

### DO Translate:
- ✅ All user-facing text
- ✅ Page titles and meta descriptions
- ✅ Navigation labels
- ✅ Headings and paragraphs
- ✅ Button text
- ✅ Form labels
- ✅ Image alt text (accessibility)
- ✅ Lists and bullet points

### Keep Consistent:
- Property name: "Colinas Verdes 39" (can translate description but keep name)
- Location: "Lagos, Portugal" (city and country names)
- Feature names: Use local equivalents where appropriate

## After All Translations Complete

- [ ] Run final build: `npm run build`
- [ ] Test all 6 language versions
- [ ] Check language switching works between all versions
- [ ] Verify mobile responsiveness for all languages
- [ ] Test contact forms in all languages
- [ ] Update sitemap.xml with actual domain
- [ ] Deploy to Netlify
- [ ] Test live site
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor for SEO indexing of all languages

## Translation Services Recommendations

1. **Professional Translation**:
   - Fiverr, Upwork (freelance translators)
   - Local translation agencies
   - Native speaker review recommended

2. **AI-Assisted Translation**:
   - DeepL (excellent for European languages)
   - ChatGPT (GPT-4 for context-aware translation)
   - Google Translate (as first draft, then review)

3. **Quality Check**:
   - Always have native speakers review
   - Check for natural language flow
   - Verify real estate terminology is correct
   - Test on actual target market users

## Estimated Translation Time

Per language:
- Draft translation: 2-3 hours
- Native speaker review: 1-2 hours
- Revisions: 30 minutes
- Testing: 30 minutes

Total per language: **4-6 hours**
All 5 languages: **20-30 hours**

---

**Last Updated**: 2025-01-09
