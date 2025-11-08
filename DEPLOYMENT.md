# Deployment Guide - Colinas Verdes 39 Property Listing

This guide covers deploying your TinaCMS-powered multilingual property listing site to Netlify.

## Prerequisites

- Netlify account
- TinaCMS Cloud account (for CMS functionality)
- Git repository connected to Netlify

## Step 1: TinaCMS Cloud Setup

1. **Create TinaCMS Cloud Account**
   - Visit https://app.tina.io/register
   - Sign up for a free account (supports 2 users)

2. **Create a New Project**
   - Click "Create New Project"
   - Connect your GitHub repository: `qsnapper/cv39`
   - Select branch: `claude/marketing-page-cms-options-011CUva2QGkeGHDT2nuhEjAL` (or main after merge)

3. **Get Your Credentials**
   - After project creation, you'll receive:
     - `Client ID` (starts with a long alphanumeric string)
     - `Token` (read-only or read-write token)
   - Save these for the next step

## Step 2: Netlify Configuration

### A. Environment Variables

In your Netlify project settings, add these environment variables:

```
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

**Important:**
- `NEXT_PUBLIC_TINA_CLIENT_ID` must start with `NEXT_PUBLIC_` to be accessible in the browser
- `TINA_TOKEN` should be kept secret (no NEXT_PUBLIC prefix)
- Replace `your-site.netlify.app` with your actual Netlify URL

### B. Build Settings

The `netlify.toml` file is already configured, but verify these settings in Netlify UI:

```
Build command: npm run build
Publish directory: .next
Node version: 22.x
```

### C. Deploy Configuration

1. **Install Netlify Plugin**
   - The `netlify.toml` includes `@netlify/plugin-nextjs`
   - Netlify will automatically install this during build

2. **Build Command Options**

   For local CMS (development):
   ```bash
   npm run build
   ```

   For production with TinaCMS Cloud:
   ```bash
   npm run build:tina
   ```

   Update your Netlify build command to:
   ```
   npm run build:tina
   ```

## Step 3: Update Configuration Files

### Update robots.txt

Edit `/public/robots.txt` and replace `your-domain.com` with your actual domain:

```
Sitemap: https://your-actual-domain.com/sitemap.xml
```

### Update SEO Configuration

Edit `/app/lib/seo.ts` and update:

```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-actual-domain.com'
```

## Step 4: Deploy

### Option A: Automatic Deploy

1. Push your code to the main branch (or create PR and merge)
2. Netlify will automatically build and deploy
3. Wait for build to complete (usually 3-5 minutes)

### Option B: Manual Deploy

1. In Netlify dashboard, click "Trigger deploy"
2. Select "Deploy site"
3. Monitor the deploy log for any errors

## Step 5: Verify Deployment

### Check These URLs:

1. **Homepage (English)**
   - https://your-site.netlify.app/en
   - Should show English content

2. **Portuguese Version**
   - https://your-site.netlify.app/pt
   - Should show Portuguese content

3. **French Version**
   - https://your-site.netlify.app/fr
   - Should show French content

4. **TinaCMS Admin**
   - https://your-site.netlify.app/admin
   - Should load TinaCMS login
   - Login with your TinaCMS Cloud credentials

5. **Sitemap**
   - https://your-site.netlify.app/sitemap.xml
   - Should list all locale pages

6. **Robots.txt**
   - https://your-site.netlify.app/robots.txt
   - Should be accessible

## Step 6: Using TinaCMS

### Editing Content

1. Navigate to https://your-site.netlify.app/admin
2. Log in with TinaCMS Cloud credentials
3. Select the content file to edit:
   - `en.json` for English
   - `pt.json` for Portuguese
   - `fr.json` for French
4. Make changes using visual editor
5. Click "Save" - changes commit to your Git repository
6. Netlify auto-deploys after commit (if configured)

### Adding New Languages

1. Create new content file:
   ```bash
   cp content/property/en.json content/property/de.json
   ```

2. Translate the content in the new file

3. Commit and push:
   ```bash
   git add content/property/de.json
   git commit -m "Add German translation"
   git push
   ```

4. Access at https://your-site.netlify.app/de

## Troubleshooting

### Build Fails

**Error: Missing TinaCMS credentials**
- Verify environment variables are set in Netlify
- Use `npm run build` instead of `npm run build:tina` if testing without TinaCMS Cloud

**Error: Module not found**
- Clear Netlify cache and retry deploy
- Check that all dependencies are in `package.json`

### TinaCMS Admin Not Loading

**Check:**
1. Environment variables are set correctly
2. `NEXT_PUBLIC_TINA_CLIENT_ID` starts with `NEXT_PUBLIC_`
3. TinaCMS Cloud project is connected to correct repository
4. Branch in TinaCMS Cloud matches deployed branch

### Language Switching Not Working

**Check:**
1. Content files exist for all locales in `content/property/`
2. Middleware is working (check `/middleware.ts`)
3. Clear browser cache and retry

### Form Submissions Not Working

**Netlify Forms:**
1. Ensure form has `data-netlify="true"` attribute
2. Check Netlify dashboard > Forms for submissions
3. Verify form name matches in Netlify settings

## Performance Optimization

### Enable Netlify Features:

1. **Asset Optimization**
   - Enable in Netlify: Settings > Build & deploy > Post processing
   - Enable "Bundle CSS" and "Minify JavaScript"

2. **Image Optimization**
   - Already configured with Next.js Image component
   - Images automatically optimized on-demand

3. **Caching**
   - Headers already configured in `netlify.toml`
   - Static assets cached for 1 year
   - Next.js pages cached appropriately

## Monitoring

### Set Up Monitoring:

1. **Netlify Analytics** (optional paid feature)
   - Real-time visitor analytics
   - Bandwidth usage

2. **Google Search Console**
   - Add property
   - Submit sitemap: `https://your-site.netlify.app/sitemap.xml`
   - Monitor SEO performance

3. **Sentry** (optional)
   - For error tracking
   - Install: `npm install @sentry/nextjs`

## Maintenance

### Regular Tasks:

1. **Update Content**
   - Use TinaCMS admin interface
   - Changes auto-deploy via Git

2. **Update Dependencies**
   ```bash
   npm update
   npm audit fix
   ```

3. **Monitor Performance**
   - Check Lighthouse scores
   - Monitor Core Web Vitals

4. **Backup**
   - Content is backed up in Git
   - Images stored in Git (or move to Cloudinary/CDN for large sites)

## Security

### Recommendations:

1. **Enable HTTPS** (default on Netlify)
2. **Set up Custom Domain** with SSL
3. **Keep Dependencies Updated**
4. **Monitor Security Advisories**
5. **Limit TinaCMS Users** to 2 (free tier)

## Support

### Resources:

- **TinaCMS Documentation:** https://tina.io/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Netlify Documentation:** https://docs.netlify.com
- **Repository Issues:** https://github.com/qsnapper/cv39/issues

---

## Quick Deploy Checklist

- [ ] TinaCMS Cloud account created
- [ ] Project connected to repository
- [ ] Client ID and Token obtained
- [ ] Environment variables set in Netlify
- [ ] `NEXT_PUBLIC_SITE_URL` configured
- [ ] Build command set to `npm run build:tina`
- [ ] robots.txt updated with real domain
- [ ] SEO config updated with real domain
- [ ] Deploy triggered
- [ ] All locale URLs tested
- [ ] TinaCMS admin tested
- [ ] Form submissions tested
- [ ] Language switcher tested
- [ ] Sitemap submitted to Google

---

**Last Updated:** 2025-11-08
