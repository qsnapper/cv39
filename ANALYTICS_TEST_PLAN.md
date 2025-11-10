# Umami Analytics Integration - Manual Test Plan
## Colinas Verdes 39 Real Estate Website

**Website ID**: `00643849-5c2d-4e5b-9095-85fe1a7e3f48`
**Test Date**: _____________
**Tester**: _____________
**Environment**: Production / Staging

---

## 📋 Pre-Test Checklist

Before starting the test, ensure:

- [x] Site is deployed and accessible
- [x] You have access to Umami dashboard at https://cloud.umami.is
- [x] You're testing in an incognito/private browser window (to avoid cached sessions)
- [x] Browser console is open (F12) to check for errors
- [x] Real-time view is open in Umami dashboard (for immediate feedback)

---

## 🧪 Test Execution Guide

### How to Verify Events

1. **Open Umami Dashboard**: Navigate to https://cloud.umami.is
2. **Select Your Website**: Click on "Colinas Verdes 39"
3. **Go to Realtime View**: Click "Realtime" in the sidebar
4. **Perform Test Action**: Execute the test step on your website
5. **Check Dashboard**: Within 5-10 seconds, the event should appear
6. **Verify Event Properties**: Click on the event to see its properties

### Expected Delay
- Events typically appear in real-time view within **5-10 seconds**
- If an event doesn't appear after 30 seconds, check browser console for errors

---

## 🎯 Test Suite

### Test Group 1: Script Loading & Basic Tracking

#### Test 1.1: Umami Script Loads Successfully
**Objective**: Verify Umami tracking script loads on all pages

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Open homepage (language selector) | Console shows no Umami errors | [x] Pass ☐ Fail | |
| 2 | Check page source (View Source) | `<script defer src="https://cloud.umami.is/script.js"` is present | [x] Pass ☐ Fail | |
| 3 | Open browser console, type: `window.umami` | Returns: `{track: ƒ}` (not undefined) | [x] Pass ☐ Fail | |
| 4 | Navigate to English page (/en/) | Console shows no Umami errors | [x] Pass ☐ Fail | |
| 5 | Navigate to Dutch page (/nl/) | Console shows no Umami errors | [x] Pass ☐ Fail | |
| 6 | Navigate to German page (/de/) | Console shows no Umami errors | [x] Pass ☐ Fail | |

**Pass Criteria**: All pages load script without errors, `window.umami` is defined

---

#### Test 1.2: Page View Tracking
**Objective**: Verify page views are tracked automatically

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Visit /en/ in fresh incognito window | Umami shows 1 page view for /en/ | [x] Pass ☐ Fail | |
| 2 | Visit /nl/ in same window | Umami shows 1 page view for /nl/ | [x] Pass ☐ Fail | |
| 3 | Check Realtime dashboard | Both page views appear | [x] Pass ☐ Fail | |

**Pass Criteria**: All page views are tracked with correct URLs

---

### Test Group 2: Conversion Event Tracking

#### Test 2.1: Form Submission Tracking
**Objective**: Verify form submission events fire correctly

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ contact section | Scroll to contact form | [x] Pass ☐ Fail | |
| 2 | Fill in Name field: "Test User" | No event fires yet | [x] Pass ☐ Fail | |
| 3 | Fill in Email: "test@example.com" | No event fires yet | [x] Pass ☐ Fail | |
| 4 | Fill in Message: "Test inquiry" | No event fires yet | [x] Pass ☐ Fail | |
| 5 | Click Submit button | Form validation passes | [x] Pass ☐ Fail | There is no tracking on the "Thank you!" page, and it's in EN only. |
| 6 | Check Umami dashboard | Event: `form-submission` appears | [x] Pass ☐ Fail | |
| 7 | Click on event in dashboard | Properties show: `form: "contact"` | [x] Pass ☐ Fail | |
| 8 | Verify submissionId | Property `submissionId` exists (format: timestamp-random) | [x] Pass ☐ Fail | |
| 9 | Verify language | Property `language: "en"` | [x] Pass ☐ Fail | |
| 10 | Verify timestamp | Property `timestamp` exists | [x] Pass ☐ Fail | |

**Pass Criteria**: Event fires with all expected properties

**⚠️ Note**: This will submit a real form to Netlify. Check Netlify Forms to confirm submission arrived.

---

#### Test 2.2: Form Interaction Start Tracking
**Objective**: Verify form interaction tracking fires when user starts filling form

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ contact section in fresh window | Scroll to contact form | [x] Pass ☐ Fail | |
| 2 | Click on Name field (focus) | Event: `form-interaction-start` fires immediately | [x] Pass ☐ Fail | |
| 3 | Check event properties | `form: "contact"`, `submissionId` exists, `language: "en"` | [x] Pass ☐ Fail | |
| 4 | Continue typing in Name field | No duplicate event fires | [x] Pass ☐ Fail | |
| 5 | Click on Email field | No duplicate event fires | [x] Pass ☐ Fail | |

**Pass Criteria**: Event fires once on first interaction, not on subsequent interactions

---

#### Test 2.3: Phone Click Tracking
**Objective**: Verify phone number click events

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ contact section | Scroll to phone number | [x] Pass ☐ Fail | |
| 2 | Click phone number link | Event: `phone-click` fires | [x] Pass ☐ Fail | |
| 3 | Check event properties | `phone: "+351 917 566 931"` | [x] Pass ☐ Fail | |
| 4 | Verify language property | `language: "en"` | [x] Pass ☐ Fail | |
| 5 | Verify source property | `source: "contact-section"` | [x] Pass ☐ Fail | |

**Pass Criteria**: Event fires with correct phone number and properties

---

#### Test 2.4: Phone Copy/Select Tracking
**Objective**: Verify phone number selection and copy events

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ contact section | Scroll to phone number | [x] Pass ☐ Fail | |
| 2 | Triple-click phone number to select it | Event: `phone-select` fires | ☐ Pass [x] Fail |I can not click 3x ontop of the phone number as it will trigger the anchor link. |
| 3 | Check event properties | `language: "en"` | ☐ Pass [x] Fail |see above |
| 4 | Copy phone number (Ctrl+C / Cmd+C) | Event: `phone-copy` fires | [x] Pass ☐ Fail | |
| 5 | Check phone-copy properties | `phone: "+351 917 566 931"`, `language: "en"` | [x] Pass ☐ Fail | |

**Pass Criteria**: Both select and copy events fire with correct properties

---

### Test Group 3: Engagement Event Tracking

#### Test 3.1: Gallery Image View Tracking
**Objective**: Verify gallery image click tracking

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ gallery section | Scroll to gallery | [x] Pass ☐ Fail | |
| 2 | Click on first gallery image | Event: `gallery-image-view` fires | [x] Pass ☐ Fail | |
| 3 | Check event properties | `imageIndex: 1`, `totalViewed: 1`, `language: "en"` | [x] Pass ☐ Fail | it shows as decimal '1.0000' not integer '1' |
| 4 | Close lightbox, click second image | Event fires with `imageIndex: 2`, `totalViewed: 2` | [x] Pass ☐ Fail | |
| 5 | Click third image | Event fires with `imageIndex: 3`, `totalViewed: 3` | [x] Pass ☐ Fail | Clicking the '<' or '>' arrows when viewing images, does not trigger any view events, or count towards engagement |
| 6 | Click SAME image again | No duplicate - `totalViewed` stays at 3 | [x] Pass ☐ Fail | |

**Pass Criteria**: Each unique image view is tracked, duplicates are ignored

---

#### Test 3.2: Gallery High Engagement Tracking
**Objective**: Verify high engagement event after viewing 5+ images

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Continue from Test 3.1 (3 images viewed) | - | [x] Pass ☐ Fail | |
| 2 | Click 4th unique image | `gallery-image-view` fires, `totalViewed: 4` | [x] Pass ☐ Fail | |
| 3 | Click 5th unique image | `gallery-image-view` fires, `totalViewed: 5` | [x] Pass ☐ Fail | |
| 4 | Check dashboard | Event: `gallery-high-engagement` appears | [x] Pass ☐ Fail | |
| 5 | Check event properties | `imagesViewed: 5`, `language: "en"` | [x] Pass ☐ Fail | |
| 6 | Click 6th unique image | Only `gallery-image-view` fires (no duplicate high-engagement) | [x] Pass ☐ Fail | |

**Pass Criteria**: High engagement event fires once at 5 images, not again

---

#### Test 3.3: Contact Section View Tracking
**Objective**: Verify contact section visibility tracking

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ in fresh window | Stay at top of page | [x] Pass ☐ Fail | |
| 2 | Scroll down to contact section | When 50% visible, event: `contact-section-view` fires | [x] Pass ☐ Fail | |
| 3 | Check event properties | `language: "en"` | [x] Pass ☐ Fail | |
| 4 | Scroll up and down again | No duplicate event fires | [x] Pass ☐ Fail | |

**Pass Criteria**: Event fires once when section is 50% visible

---

#### Test 3.4: Map View & Interaction Tracking
**Objective**: Verify map tracking events

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ location section | Scroll until map is visible | [x] Pass ☐ Fail | |
| 2 | When map is 30% visible | Event: `map-view` fires | [x] Pass ☐ Fail | |
| 3 | Check event properties | `language: "en"` | [x] Pass ☐ Fail | |
| 4 | Click on the map | Event: `map-interaction` fires | [x] Pass ☐ Fail | |
| 5 | Click map again | No duplicate interaction event | [x] Pass ☐ Fail | |

**Pass Criteria**: Both events fire once with correct properties

---

### Test Group 4: Navigation & Flow Tracking

#### Test 4.1: Navigation Click Tracking
**Objective**: Verify navigation menu click tracking

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ | Stay at top of page | [x] Pass ☐ Fail | |
| 2 | Click "Gallery" in nav menu | Event: `navigation-click` fires | [x] Pass ☐ Fail | |
| 3 | Check event properties | `section: "gallery"`, `language: "en"` | [x] Pass ☐ Fail | |
| 4 | Click "Features" in nav menu | Event fires with `section: "features"` | [x] Pass ☐ Fail | |
| 5 | Click "Contact" in nav menu | Event fires with `section: "contact"` | [x] Pass ☐ Fail | |
| 6 | Click scroll indicator (down arrow) | Event fires | [x] Pass ☐ Fail | |

**Pass Criteria**: All navigation clicks are tracked with correct section names

---

#### Test 4.2: Language Change Tracking
**Objective**: Verify language selector tracking

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ | Note current language | [x] Pass ☐ Fail | |
| 2 | Open language selector dropdown | Click on selector | [x] Pass ☐ Fail | |
| 3 | Select "Nederlands" | Event: `language-change` fires | [x] Pass ☐ Fail | |
| 4 | Check event properties | `from: "en"`, `to: "nl"` | [x] Pass ☐ Fail | |
| 5 | Page redirects to /nl/ | Confirm redirect works | [x] Pass ☐ Fail | |

**Pass Criteria**: Language change is tracked before redirect with correct from/to values

---

#### Test 4.3: External Link Click Tracking
**Objective**: Verify external link tracking (if any external links exist)

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ | Look for external links | ☐ Pass ☐ Fail | do not have any external links |
| 2 | If external link exists, click it | Event: `external-link-click` fires | ☐ Pass ☐ Fail | see above|
| 3 | Check event properties | `url: [external URL]`, `language: "en"` | ☐ Pass ☐ Fail | see above |

**Pass Criteria**: External links are tracked (skip if none exist)

**Note**: Phone and email links should NOT trigger this event (they have their own tracking)

---

### Test Group 5: Depth Metrics Tracking

#### Test 5.1: Scroll Depth Tracking
**Objective**: Verify scroll depth milestone tracking

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ in fresh window | Stay at top (0% scroll) | [x] Pass ☐ Fail | |
| 2 | Scroll to approximately 25% of page | Event: `scroll-depth` fires with `depth: 25` | [x] Pass ☐ Fail | |
| 3 | Check event properties | `depth: 25`, `language: "en"` | [x] Pass ☐ Fail | |
| 4 | Scroll to approximately 50% of page | Event fires with `depth: 50` | [x] Pass ☐ Fail | |
| 5 | Scroll to approximately 75% of page | Event fires with `depth: 75` | [x] Pass ☐ Fail | |
| 6 | Scroll to bottom (100%) | Event fires with `depth: 100` | [x] Pass ☐ Fail | |
| 7 | Scroll up and down again | No duplicate events | [x] Pass ☐ Fail | |

**Pass Criteria**: All 4 milestones (25, 50, 75, 100) fire once each

---

#### Test 5.2: Time on Page Tracking
**Objective**: Verify time-on-page milestone tracking

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ in fresh window | Note start time | [x] Pass ☐ Fail | |
| 2 | Wait 30 seconds | Event: `time-on-page` fires with `seconds: 30` | [x] Pass ☐ Fail | |
| 3 | Check event properties | `seconds: 30`, `language: "en"` | [x] Pass ☐ Fail | |
| 4 | Wait until 60 seconds total | Event fires with `seconds: 60` | [x] Pass ☐ Fail | |
| 5 | Wait until 120 seconds (2 min) total | Event fires with `seconds: 120` | [x] Pass ☐ Fail | |
| 6 | Wait until 300 seconds (5 min) total | Event fires with `seconds: 300` | [x] Pass ☐ Fail | |

**Pass Criteria**: All 4 time milestones (30, 60, 120, 300) fire correctly

**⏱️ Note**: This test takes 5+ minutes. You can multitask but keep the tab open.

---

### Test Group 6: Multi-Language Testing

#### Test 6.1: Dutch Language Page Tracking
**Objective**: Verify events fire correctly on Dutch pages

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /nl/ | Page loads | [x] Pass ☐ Fail | |
| 2 | Scroll to contact section | Event: `contact-section-view` with `language: "nl"` | [x] Pass ☐ Fail | |
| 3 | Click phone number | Event: `phone-click` with `language: "nl"` | [x] Pass ☐ Fail | |
| 4 | Start filling form | Event: `form-interaction-start` with `language: "nl"` | [x] Pass ☐ Fail | |

**Pass Criteria**: All events show correct language property

---

#### Test 6.2: Other Language Pages (Spot Check)
**Objective**: Verify at least one event per remaining language

| Language | Page URL | Test Action | Event Fires | Language Property Correct | Status |
|----------|----------|-------------|-------------|---------------------------|--------|
| German | /de/ | Scroll to 50% | `scroll-depth` | `language: "de"` | [x] Pass ☐ Fail |
| Portuguese | /pt/ | Click gallery image | `gallery-image-view` | `language: "pt"` | [x] Pass ☐ Fail |
| Swedish | /sv/ | Click nav menu | `navigation-click` | `language: "sv"` | [x] Pass ☐ Fail |
| French | /fr/ | Wait 30 seconds | `time-on-page` | `language: "fr"` | [x] Pass ☐ Fail |

**Pass Criteria**: Language property is correctly set for each page

---

### Test Group 7: Edge Cases & Error Handling

#### Test 7.1: Form Validation Failure
**Objective**: Verify events don't fire on invalid form submission

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Navigate to /en/ contact form | - | [x] Pass ☐ Fail | |
| 2 | Click Submit without filling fields | Form shows validation error | [x] Pass ☐ Fail | |
| 3 | Check Umami dashboard | NO `form-submission` event fires | [x] Pass ☐ Fail | |
| 4 | Fill only name field, click Submit | Validation error again | [x] Pass ☐ Fail | |
| 5 | Check Umami dashboard | Still NO `form-submission` event | [x] Pass ☐ Fail | |

**Pass Criteria**: Invalid submissions do not create events

---

#### Test 7.2: Double-Click Prevention
**Objective**: Verify submission ID prevents duplicate counting

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Note submissionId from Test 2.1 | Write it down: 1762775821689-fwfoodjys | [x] Pass ☐ Fail | |
| 2 | Refresh page and fill form again | New session starts | [x] Pass ☐ Fail | |
| 3 | Submit form | New `form-submission` event fires | [x] Pass ☐ Fail | |
| 4 | Check new submissionId | Different from previous submission | [x] Pass ☐ Fail | |

**Pass Criteria**: Each page session has unique submissionId

---

#### Test 7.3: Ad Blocker Compatibility
**Objective**: Test behavior when ad blocker is enabled

| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1 | Enable ad blocker (e.g., uBlock Origin) | Ad blocker active | ☐ Pass ☐ Fail | do not have an add blocker |
| 2 | Navigate to /en/ | Page loads normally | ☐ Pass ☐ Fail | |
| 3 | Open browser console | Check for errors | ☐ Pass ☐ Fail | |
| 4 | Try to trigger an event | Event may not fire (expected) | ☐ Pass ☐ Fail | |
| 5 | Check if site functionality broken | Site should work normally | ☐ Pass ☐ Fail | |
| 6 | Disable ad blocker | - | ☐ Pass ☐ Fail | |

**Pass Criteria**: Site functions normally even if tracking is blocked

---

## 📊 Post-Test Verification

### Umami Dashboard Checks

After completing all tests, verify in Umami dashboard:

| Check | Location in Umami | Expected Result | Status |
|-------|-------------------|-----------------|--------|
| Total Events | Events → All Events | 50+ events recorded | [x] Pass ☐ Fail |
| Event Types | Events → Event Names | 15 unique event types visible | [x] Pass ☐ Fail |
| Page Views | Pages | Multiple language pages (/en/, /nl/, etc.) | [x] Pass ☐ Fail |
| Real-time Active | Realtime | Shows recent activity | [x] Pass ☐ Fail |

---

### Event Type Verification Checklist

Confirm all 15 event types appear in dashboard:

- [x] `form-submission`
- [x] `form-interaction-start`
- [x] `phone-click`
- [x] `phone-copy`
- [ ] `phone-select`
- [x] `gallery-image-view`
- [x] `gallery-high-engagement`
- [x] `contact-section-view`
- [x] `map-view`
- [x] `map-interaction`
- [x] `navigation-click`
- [x] `language-change`
- [ ] `external-link-click` (if applicable)
- [x] `scroll-depth`
- [x] `time-on-page`

---

## 🐛 Issue Tracking

If any tests fail, document here:

| Test # | Issue Description | Error Message (if any) | Severity | Notes |
|--------|-------------------|------------------------|----------|-------|
| | | | ☐ Critical ☐ Major ☐ Minor | |
| | | | ☐ Critical ☐ Major ☐ Minor | |
| | | | ☐ Critical ☐ Major ☐ Minor | |

---

## 📝 Test Summary

**Total Tests**: 41
**Passed**: _____
**Failed**: _____
**Skipped**: _____

**Overall Status**: ☐ PASS ☐ FAIL

**Tester Signature**: _____________
**Date Completed**: _____________

---

## 🔧 Troubleshooting Guide

### Events Not Appearing

**Problem**: Events don't show in Umami dashboard

**Checklist**:
1. ☐ Check browser console for errors (F12)
2. ☐ Verify `window.umami` is defined in console
3. ☐ Confirm correct website ID in script tag
4. ☐ Try different browser
5. ☐ Disable ad blocker
6. ☐ Clear browser cache and try again
7. ☐ Check Umami service status

---

### Duplicate Events

**Problem**: Same event fires multiple times

**Checklist**:
1. ☐ Check if you're accidentally triggering action multiple times
2. ☐ Verify code uses `once: true` or flag checks
3. ☐ Refresh page to reset tracking state
4. ☐ Check that Sets are being used to prevent duplicates

---

### Wrong Language Property

**Problem**: Events show wrong language

**Checklist**:
1. ☐ Verify HTML has correct `lang` attribute: `<html lang="en">`
2. ☐ Check page URL matches expected language
3. ☐ Rebuild pages with `npm run build`
4. ☐ Clear browser cache

---

### Form Submission Not Tracked

**Problem**: Form submits but no event fires

**Checklist**:
1. ☐ Check if form validation passes
2. ☐ Verify `window.umami` is available before submit
3. ☐ Check browser console for JavaScript errors
4. ☐ Confirm form has `id="contactForm"`
5. ☐ Test with simple fields (name, email, message)

---

## 📚 Additional Resources

- **Umami Documentation**: https://umami.is/docs
- **Analytics Configuration**: See `ANALYTICS.md` in project root
- **Event Implementation**: See `script.js` lines 85-686
- **Support**: https://github.com/umami-software/umami/discussions

---

*End of Test Plan*
