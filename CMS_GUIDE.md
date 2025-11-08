# Decap CMS Guide for Colinas Verdes Villa Website

## Overview

Your property website now has a Content Management System (CMS) that allows you to easily edit content without touching code. The system supports **4 languages**: English, Portuguese, French, and German.

## ✨ Features

- 📝 **Easy Editing** - Edit content through a user-friendly admin panel
- 🌍 **Multi-language** - Manage content in 4 languages
- 🔄 **Git-based** - All changes are saved to your Git repository
- 📱 **Responsive** - Admin panel works on desktop and mobile
- 🆓 **Free** - No monthly fees, completely free

---

## 🚀 Getting Started

### Step 1: Enable Netlify Identity (One-time setup)

1. **Log in to Netlify** (https://app.netlify.com)
2. Go to your site's dashboard
3. Click **"Identity"** in the top menu
4. Click **"Enable Identity"**

### Step 2: Enable Git Gateway

1. Still in the Identity tab, click **"Settings and usage"**
2. Scroll down to **"Git Gateway"**
3. Click **"Enable Git Gateway"**
4. This allows the CMS to save changes to your GitHub repository

### Step 3: Invite Yourself as a User

1. In the Identity tab, click **"Invite users"**
2. Enter your email address
3. Check your email and click the invitation link
4. Create a password for CMS access

---

## 📝 Accessing the CMS

### Method 1: Direct URL
Visit: `https://your-site-name.netlify.app/admin/`

### Method 2: From Your Website
1. Go to your live website
2. Add `/admin/` to the end of the URL
3. Example: `https://colinasverdes39.netlify.app/admin/`

### Login
- Use the email and password you set up during the invitation process
- You'll see the Decap CMS dashboard

---

## 🌍 Managing Multi-Language Content

### How it Works

Your website content is stored in separate files for each language:
- **English**: `content/property/main.en.json`
- **Portuguese**: `content/property/main.pt.json`
- **French**: `content/property/main.fr.json`
- **German**: `content/property/main.de.json`

### Editing Content in Different Languages

1. **Open the CMS** at `/admin/`
2. Click on **"Property Information"** in the left sidebar
3. Click on the **"main"** entry
4. At the top right, you'll see language tabs: **EN | PT | FR | DE**
5. Click on the language you want to edit
6. Make your changes
7. Click **"Save"** (saves as draft) or **"Publish"** (makes it live)

### Editorial Workflow

The CMS uses an editorial workflow with 3 states:

1. **Draft** - Work in progress, not published
2. **In Review** - Ready for review before publishing
3. **Ready** - Published and live on the website

To publish changes:
1. Make your edits
2. Click **"Save"** to create a draft
3. Change status to **"Ready"**
4. Click **"Publish"** at the top

---

## 📋 What You Can Edit

### 1. Hero Section
- Property title
- Subtitle (location)
- Price
- Background image

### 2. Quick Facts
- Number of bedrooms
- Number of bathrooms
- Built area
- Plot size
- Pool size

### 3. Overview Section
- Section title
- Lead paragraph
- Description paragraphs
- Highlights (list of key features)

### 4. Owner Sale Banner
- Badge text
- Benefits list

### 5. Features Section
- Section title
- **Interior Features** - title and list
- **Outdoor Features** - title and list
- **Amenities** - title and list
- **Lifestyle Benefits** - title and list

### 6. Location Section
- Section title
- Location name
- Description
- Additional information
- Map coordinates (latitude/longitude)
- Location highlights (distances to key places)

### 7. Contact Section
- Section title and subtitle
- Badge text
- Phone number
- Property reference
- "Why Buy Direct" title
- Benefits list

### 8. Navigation
- Brand name
- Menu items (labels and links)

---

## 🖼️ Managing Images

### Gallery Images

The CMS allows you to manage gallery images:

1. Go to **"Gallery"** in the left sidebar
2. Click **"New Gallery"** to add an image
3. Upload the image
4. Add alt text (description for SEO)
5. Select category: exterior, interior, pool, or gardens
6. Set order number (determines display order)
7. Save and publish

### Changing the Hero Image

1. Go to **"Property Information"**
2. Click on **"main"**
3. Scroll to **"Hero Image"**
4. Click **"Choose an image"**
5. Upload or select from existing images

### Image Best Practices

- **Format**: JPG for photos
- **Size**: Recommended 1920x1440px or similar 4:3 ratio
- **File size**: Keep under 500KB for fast loading
- **Alt text**: Always add descriptive alt text for accessibility

---

## 🔧 Site Settings

Access global settings:

1. Click **"Site Settings"** in the sidebar
2. Click **"General Settings"**
3. You can edit:
   - Site title
   - Meta description (for SEO)
   - Copyright text
   - Available languages

---

## 🌐 How the Language Switcher Works

### On the Website

Visitors will see flag buttons in the navigation:
- 🇬🇧 English
- 🇵🇹 Portuguese
- 🇫🇷 French
- 🇩🇪 German

### Language Detection

The website automatically:
1. Checks if the visitor has a language preference (saved in browser)
2. Checks the URL parameter (`?lang=pt`)
3. Detects browser language
4. Falls back to English if none of the above

### Forcing a Specific Language

Add `?lang=XX` to the URL:
- `?lang=en` - English
- `?lang=pt` - Portuguese
- `?lang=fr` - French
- `?lang=de` - German

Example: `https://your-site.com/?lang=pt`

---

## 📝 Translation Workflow

### Initial Setup

I've created the content files for all 4 languages:
- ✅ **English** - Complete (current website content)
- ✅ **Portuguese** - Complete (translated)
- ✅ **French** - Complete (translated)
- ✅ **German** - Complete (translated)

### Updating Translations

When you update content:

1. **Edit the English version** first (your primary language)
2. **Save as draft**
3. Switch to **Portuguese tab** (PT)
4. Translate the changes you made in English
5. Repeat for **French** (FR) and **German** (DE)
6. **Publish all languages**

### Translation Tips

- Keep the same tone and style across languages
- For technical terms (like "T4 villa"), maintain consistency
- Numbers, measurements, and prices can remain the same
- Consider cultural differences (e.g., room counting differs by country)

---

## 🚨 Troubleshooting

### Can't Log In to CMS

**Problem**: Login page doesn't work
**Solution**:
1. Make sure Netlify Identity is enabled
2. Check that you've accepted the email invitation
3. Try resetting your password

### Changes Not Appearing on Website

**Problem**: Published changes don't show on the live site
**Solution**:
1. Make sure you clicked "Publish" (not just "Save")
2. Wait 1-2 minutes for Netlify to rebuild
3. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check the Netlify dashboard for build errors

### Image Upload Failed

**Problem**: Can't upload images
**Solution**:
1. Check file size (must be under 10MB)
2. Use JPG or PNG format
3. Ensure Git Gateway is enabled in Netlify Identity settings

### Editorial Workflow Not Showing

**Problem**: Can't see Draft/In Review/Ready states
**Solution**:
- The editorial workflow is enabled by default
- Check `admin/config.yml` has `publish_mode: editorial_workflow`

---

## 🔐 Security & Access

### Who Can Access the CMS?

- Only users invited through Netlify Identity
- Each user needs their own email and password
- You control who has access

### Adding More Editors

1. Go to Netlify → Identity
2. Click "Invite users"
3. Enter their email
4. They'll receive an invitation link
5. They create their own password

### Removing Access

1. Go to Netlify → Identity
2. Find the user
3. Click "..." menu
4. Select "Delete user"

---

## 💡 Best Practices

### Content Editing

1. **Save Often** - Click "Save" frequently to avoid losing work
2. **Use Drafts** - Don't publish directly, use the editorial workflow
3. **Preview Changes** - Check how changes look before publishing
4. **Consistent Tone** - Maintain the same professional, luxurious tone
5. **SEO-Friendly** - Use descriptive text, avoid keyword stuffing

### Images

1. **Optimize First** - Compress images before uploading
2. **Descriptive Names** - Name files clearly (e.g., "pool-view.jpg")
3. **Alt Text** - Always add alt text for accessibility and SEO
4. **Consistency** - Use similar angles and lighting for gallery images

### Translations

1. **English First** - Update English content first, then translate
2. **Professional Translation** - For important changes, consider professional translation
3. **Cultural Sensitivity** - Adapt content for different markets
4. **Consistency** - Use the same terms across all languages

---

## 🎯 Common Tasks

### Changing the Price

1. Open CMS → Property Information → main
2. Find "Price" field
3. Update the price (e.g., "€1,095,000")
4. Update in ALL language tabs if price is the same
5. Publish

### Adding a New Feature to the List

1. Open CMS → Property Information → main
2. Scroll to "Features" section
3. Choose the category (Interior, Outdoor, Amenities, Lifestyle)
4. Click "Add item" in the appropriate list
5. Type the new feature
6. Translate to other languages
7. Publish

### Updating Contact Information

1. Open CMS → Property Information → main
2. Scroll to "Contact" section
3. Update phone number or other details
4. Update reference if needed
5. Publish

### Adding Gallery Images

1. Open CMS → Gallery
2. Click "New Gallery"
3. Upload image
4. Add alt text in each language tab
5. Select category (exterior/interior/pool/gardens)
6. Set order number (e.g., 35 for the newest image)
7. Publish

---

## 📚 Additional Resources

### Decap CMS Documentation
- Official docs: https://decapcms.org/docs/
- Configuration reference: https://decapcms.org/docs/configuration-options/

### Netlify Identity
- Netlify Identity docs: https://docs.netlify.com/visitor-access/identity/

### Need Help?

1. Check this guide first
2. Review the Troubleshooting section
3. Check Netlify build logs for errors
4. Review Decap CMS documentation

---

## 🎉 You're All Set!

Your website is now fully editable with multi-language support. You can:
- ✅ Edit all content through a user-friendly interface
- ✅ Manage 4 different language versions
- ✅ Upload and organize images
- ✅ Preview changes before publishing
- ✅ Track changes through Git

**Next Steps:**
1. Enable Netlify Identity (see Step 1 above)
2. Invite yourself as a user
3. Log in to `/admin/`
4. Start editing!

Good luck managing your property listing! 🏡
