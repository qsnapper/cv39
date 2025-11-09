# Umami Analytics Documentation
## Colinas Verdes 39 - Real Estate Website

**Website ID**: `00643849-5c2d-4e5b-9095-85fe1a7e3f48`
**Analytics Platform**: Umami Cloud (https://cloud.umami.is)
**Last Updated**: 2025-01-09

---

## Table of Contents
1. [Overview](#overview)
2. [Event Tracking Configuration](#event-tracking-configuration)
3. [Recommended Goals](#recommended-goals)
4. [Recommended Funnels](#recommended-funnels)
5. [Recommended User Journeys](#recommended-user-journeys)
6. [Retention Analysis](#retention-analysis)
7. [Key Metrics Dashboard](#key-metrics-dashboard)
8. [Implementation Details](#implementation-details)

---

## Overview

The Colinas Verdes 39 website tracks **15 custom events** across 7 categories to measure user engagement, conversion paths, and property listing effectiveness.

### Analytics Goals
- Track lead generation (form submissions & phone calls)
- Measure content engagement (gallery, sections, time on page)
- Understand user journey from landing to conversion
- Compare performance across 6 language versions (EN, NL, DE, PT, SV, FR)
- Optimize for maximum inquiry conversion rate

---

## Event Tracking Configuration

### 🎯 **Conversion Events** (Critical)

#### 1. `form-submission`
**Description**: User successfully submitted the contact inquiry form
**Trigger**: Form validation passes and form is submitted
**Properties**:
- `form`: "contact"
- `submissionId`: Unique ID for this form session (prevents double-counting)
- `language`: User's current language (en/nl/de/pt/sv/fr)
- `timestamp`: Submission timestamp

**Implementation**: `script.js:108-114`

**Note**: The `submissionId` is generated when the page loads and remains constant for the session. This allows you to:
- Deduplicate submissions if a user accidentally submits twice
- Track time from form interaction to submission
- Correlate form submissions with other events in the same session

---

#### 2. `phone-click`
**Description**: User clicked the phone number link to initiate a call
**Trigger**: Click on `<a href="tel:+351917566931">`
**Properties**:
- `phone`: "+351 917 566 931"
- `language`: User's current language
- `source`: "contact-section"

**Implementation**: `script.js:372-380`

---

#### 3. `phone-copy`
**Description**: User explicitly copied the phone number
**Trigger**: Copy event on phone number element
**Properties**:
- `phone`: "+351 917 566 931"
- `language`: User's current language

**Implementation**: `script.js:416-423`

---

#### 4. `phone-select`
**Description**: User selected/highlighted the phone number text
**Trigger**: Text selection detected on phone number
**Properties**:
- `language`: User's current language

**Implementation**: `script.js:426-437`

---

### 📊 **Engagement Events** (High Priority)

#### 5. `gallery-image-view`
**Description**: User opened/viewed a gallery image in lightbox
**Trigger**: Click on any gallery item
**Properties**:
- `imageIndex`: Image number (1-40+)
- `totalViewed`: Total unique images viewed in session
- `language`: User's current language

**Implementation**: `script.js:457-467`

---

#### 6. `gallery-high-engagement`
**Description**: User viewed 5 or more gallery images (serious interest indicator)
**Trigger**: After 5th unique image view
**Properties**:
- `imagesViewed`: Total count
- `language`: User's current language

**Implementation**: `script.js:470-480`

---

#### 7. `contact-section-view`
**Description**: User scrolled to and viewed the contact section
**Trigger**: 50% of contact section visible in viewport
**Properties**:
- `language`: User's current language

**Implementation**: `script.js:390-410`

---

#### 8. `map-view`
**Description**: User viewed the property location map
**Trigger**: 30% of map element visible
**Properties**:
- `language`: User's current language

**Implementation**: `script.js:567-587`

---

#### 9. `map-interaction`
**Description**: User interacted with the map (click/zoom)
**Trigger**: First click on map element
**Properties**:
- `language`: User's current language

**Implementation**: `script.js:582-588`

---

### 📝 **Form Engagement Events**

#### 10. `form-interaction-start`
**Description**: User started interacting with the contact form (first focus or input)
**Trigger**: First time user focuses on or types in any form field
**Properties**:
- `form`: "contact"
- `submissionId`: Unique ID for this form session
- `language`: User's current language

**Implementation**: `script.js:131-156`

**Use Case**: Track form abandonment rate by comparing `form-interaction-start` to `form-submission` events

---

### 🧭 **Navigation & Flow Events**

#### 11. `navigation-click`
**Description**: User clicked a navigation menu item
**Trigger**: Click on nav links (Overview, Gallery, Features, Location, Contact)
**Properties**:
- `section`: Target section name
- `language`: User's current language

**Implementation**: `script.js:524-544`

---

#### 12. `language-change`
**Description**: User switched to a different language version
**Trigger**: Language selector change
**Properties**:
- `from`: Original language
- `to`: New language

**Implementation**: `script.js:539-557`

---

#### 13. `external-link-click`
**Description**: User clicked an external link
**Trigger**: Click on any external domain link
**Properties**:
- `url`: Destination URL
- `language`: User's current language

**Implementation**: `script.js:634-657`

---

### 📈 **Depth Metrics**

#### 14. `scroll-depth`
**Description**: User scrolled to specific page depth milestones
**Trigger**: Reaching 25%, 50%, 75%, or 100% of page
**Properties**:
- `depth`: Percentage milestone (25/50/75/100)
- `language`: User's current language

**Implementation**: `script.js:495-510`

---

#### 15. `time-on-page`
**Description**: User spent specific time durations on page
**Trigger**: Reaching 30s, 60s, 120s, or 300s on page
**Properties**:
- `seconds`: Time milestone (30/60/120/300)
- `language`: User's current language

**Implementation**: `script.js:604-620`

---

## Recommended Goals

Configure these goals in Umami to track key conversion metrics:

### 🎯 Primary Goals (Critical Business Metrics)

#### Goal 1: Lead Conversion
**Name**: "Contact Inquiry"
**Type**: Custom Event
**Event**: `form-submission`
**Target**: 5+ per month (adjust based on traffic)
**Value**: High - Primary conversion metric

---

#### Goal 2: Phone Engagement
**Name**: "Phone Contact Attempt"
**Type**: Custom Event
**Events**: `phone-click` OR `phone-copy`
**Target**: 3+ per month
**Value**: High - Direct sales opportunity

---

### 📊 Secondary Goals (Engagement Indicators)

#### Goal 3: Serious Interest
**Name**: "High Engagement Visitor"
**Type**: Custom Event
**Event**: `gallery-high-engagement`
**Target**: 20% of visitors
**Value**: Medium - Strong interest indicator

---

#### Goal 4: Contact Intent
**Name**: "Contact Section Reach"
**Type**: Custom Event
**Event**: `contact-section-view`
**Target**: 40% of visitors
**Value**: Medium - Shows intent to contact

---

#### Goal 5: Content Engagement
**Name**: "Engaged Reader"
**Type**: Custom Event
**Event**: `scroll-depth` WHERE `depth` = 75
**Target**: 50% of visitors
**Value**: Low - Content quality indicator

---

#### Goal 6: Committed Time
**Name**: "Quality Visit"
**Type**: Custom Event
**Event**: `time-on-page` WHERE `seconds` >= 120
**Target**: 30% of visitors
**Value**: Low - Serious consideration indicator

---

## Recommended Funnels

### 🔄 Funnel 1: Primary Conversion Path

**Name**: "Visitor to Lead"
**Purpose**: Track complete conversion journey

**Steps**:
1. **Landing** - Page View (any language page)
2. **Engagement** - `scroll-depth` (depth >= 50)
3. **Interest** - `gallery-image-view` OR `navigation-click`
4. **Intent** - `contact-section-view`
5. **Form Start** - `form-interaction-start`
6. **Conversion** - `form-submission` OR `phone-click`

**Expected Drop-off**:
- Step 1 → 2: ~70% (30% bounce)
- Step 2 → 3: ~80% (engaged users)
- Step 3 → 4: ~50% (interested users)
- Step 4 → 5: ~30% (started form)
- Step 5 → 6: ~70-80% (form completion rate)

**Target Conversion Rate**: 3-5% (Step 1 to Step 6)
**Form Abandonment Rate**: Track Step 5 to Step 6 (target: <30% abandonment)

---

### 🔄 Funnel 2: Gallery Engagement Path

**Name**: "Gallery to Inquiry"
**Purpose**: Measure gallery effectiveness in driving conversions

**Steps**:
1. **Gallery Entry** - `gallery-image-view` (first view)
2. **Multiple Views** - `gallery-image-view` (totalViewed >= 3)
3. **High Engagement** - `gallery-high-engagement`
4. **Contact Intent** - `contact-section-view`
5. **Conversion** - `form-submission` OR `phone-click`

**Target Conversion Rate**: 15-25% (highly engaged visitors)

---

### 🔄 Funnel 3: Phone Engagement Path

**Name**: "Phone Contact Journey"
**Purpose**: Track phone-based conversion path

**Steps**:
1. **Page View** - Landing
2. **Contact View** - `contact-section-view`
3. **Phone Interest** - `phone-select` OR hover on phone
4. **Phone Action** - `phone-click` OR `phone-copy`

**Target Conversion Rate**: 8-12%

---

### 🔄 Funnel 4: Form Abandonment Analysis

**Name**: "Form Completion Journey"
**Purpose**: Identify where users drop off in the form

**Steps**:
1. **Contact Intent** - `contact-section-view`
2. **Form Start** - `form-interaction-start`
3. **Form Submission** - `form-submission`

**Target Abandonment Rate**: <30% (Step 2 to Step 3)

**Analysis Points**:
- How many users view contact section but never start form? (Step 1 → 2)
- How many users start form but don't complete? (Step 2 → 3)
- Average time from form start to submission
- Language-based form completion rates

---

### 🔄 Funnel 5: Quick Conversion Path

**Name**: "Hot Lead Fast Track"
**Purpose**: Identify users who convert quickly (high intent)

**Steps**:
1. **Landing** - Page View
2. **Fast Scroll** - `scroll-depth` (depth >= 75) within 60 seconds
3. **Direct Contact** - `contact-section-view` within 90 seconds
4. **Immediate Action** - `form-submission` OR `phone-click` within 180 seconds

**Target**: 5-10% of conversions (high-intent buyers)

---

## Recommended User Journeys

### 📍 Journey 1: Language Performance Analysis

**Name**: "Multi-Language Conversion Comparison"
**Segment By**: `language` property
**Compare**:
- EN (English) vs NL (Dutch) vs DE (German) vs PT (Portuguese) vs SV (Swedish) vs FR (French)

**Metrics to Compare**:
1. Conversion rate per language
2. Average time-on-page per language
3. Gallery engagement per language
4. Phone vs Form preference per language
5. Scroll depth per language

**Expected Insights**:
- Which languages drive most conversions
- Cultural differences in engagement patterns
- Which languages need content optimization
- Marketing budget allocation by language

---

### 📍 Journey 2: Engagement Quality Segmentation

**Name**: "Visitor Quality Tiers"
**Segment By**: Engagement level

**Tier Definitions**:

**🥇 Hot Leads** (Target: 5-10% of visitors)
- `time-on-page` >= 120s
- `gallery-high-engagement` triggered
- `scroll-depth` >= 75
- Viewed `contact-section-view`

**🥈 Warm Leads** (Target: 15-20% of visitors)
- `time-on-page` >= 60s
- `gallery-image-view` >= 3
- `scroll-depth` >= 50

**🥉 Casual Browsers** (Target: 30-40% of visitors)
- `time-on-page` >= 30s
- Any engagement event

**❄️ Bounces** (Target: <40%)
- `time-on-page` < 30s
- No engagement events

**Analysis Goals**:
- Conversion rate by tier
- Path to conversion for each tier
- Content optimization opportunities

---

### 📍 Journey 3: Content Consumption Patterns

**Name**: "User Interest Mapping"
**Segment By**: Section engagement

**Track Navigation Patterns**:
1. **Gallery-First Users**
   - First action: `gallery-image-view`
   - Hypothesis: Visual buyers, emotion-driven

2. **Features-First Users**
   - First action: `navigation-click` to Features
   - Hypothesis: Analytical buyers, detail-oriented

3. **Location-First Users**
   - First action: `navigation-click` to Location OR `map-view`
   - Hypothesis: Location-focused buyers

4. **Price-First Users**
   - Quick scroll to contact/price section
   - Hypothesis: Budget-conscious buyers

**Conversion Analysis**:
- Which pattern converts best?
- What's the optimal content order?
- Should page layout be personalized?

---

### 📍 Journey 4: Return Visitor Behavior

**Name**: "Multi-Visit Conversion Path"
**Segment By**: Visit number

**Track**:
1. First visit behavior
2. Second visit behavior
3. Conversion visit (which visit number?)

**Metrics**:
- Average visits before conversion
- Behavior differences between visits
- Time between visits
- Content consumption progression

**Optimization**:
- Remarketing timing
- Content for return visitors
- Progressive disclosure strategy

---

## Retention Analysis

### 📅 Recommended Retention Cohorts

#### Cohort 1: Language-Based Retention
**Period**: Weekly
**Group By**: Language
**Track**: Return visits within 7, 14, 30 days
**Goal**: Understand which languages have highest intent

---

#### Cohort 2: Engagement-Based Retention
**Period**: Weekly
**Group By**: Initial engagement level (Hot/Warm/Casual)
**Track**: Return rate and conversion on return
**Goal**: Validate engagement quality scoring

---

#### Cohort 3: Traffic Source Retention
**Period**: Monthly
**Group By**: Traffic source (organic, direct, referral, social)
**Track**: Return visits and conversion timing
**Goal**: Optimize marketing channel mix

---

### 🔁 Retention Metrics to Monitor

1. **7-Day Return Rate**
   - Target: 15-25% (luxury real estate typically high-consideration)
   - By language segment
   - By engagement tier

2. **30-Day Conversion Window**
   - Track: Time from first visit to conversion
   - Average: 14-21 days (real estate consideration period)
   - Identify fast vs slow converters

3. **Multi-Visit Conversion Rate**
   - Compare: 1-visit vs 2-visit vs 3+ visit conversions
   - Optimize: Content for each visit stage

---

## Key Metrics Dashboard

### 📊 Recommended Dashboard Layout

#### Section 1: Conversion Overview (Top Priority)
```
┌─────────────────────────────────────────────────────┐
│ CONVERSION METRICS (Last 30 Days)                   │
├─────────────────────────────────────────────────────┤
│ Total Leads:           [12] 📈 +20%                 │
│ ├─ Form Submissions:   [8]  📋                      │
│ └─ Phone Actions:      [4]  📞                      │
│                                                      │
│ Conversion Rate:       [3.2%] 📊                    │
│ Form Abandonment:      [22%] 🚪 (Good!)            │
│ ├─ Form Starts:        [34]                         │
│ └─ Completions:        [8]  (23.5% completion)      │
│                                                      │
│ Leads per Language:    [Chart by language]          │
└─────────────────────────────────────────────────────┘
```

---

#### Section 2: Engagement Quality
```
┌─────────────────────────────────────────────────────┐
│ ENGAGEMENT METRICS                                   │
├─────────────────────────────────────────────────────┤
│ Avg Time on Page:         [2m 45s]                  │
│ Gallery Engagement:       [35%] (viewed 1+ images)  │
│ High Engagement Rate:     [12%] (5+ images)         │
│ Contact Section Views:    [42%]                     │
│ 75%+ Scroll Depth:        [38%]                     │
└─────────────────────────────────────────────────────┘
```

---

#### Section 3: Funnel Performance
```
┌─────────────────────────────────────────────────────┐
│ PRIMARY FUNNEL                                       │
├─────────────────────────────────────────────────────┤
│ Landing          [400] ─┐                           │
│ Engaged          [280] ─┤ 70%                       │
│ Interested       [160] ─┤ 40%                       │
│ Intent           [80]  ─┤ 20%                       │
│ Conversion       [12]  ─┘ 3%                        │
└─────────────────────────────────────────────────────┘
```

---

#### Section 4: Language Performance
```
┌─────────────────────────────────────────────────────┐
│ LANGUAGE BREAKDOWN (Conversions / Traffic)          │
├─────────────────────────────────────────────────────┤
│ 🇬🇧 English:     [5 / 180]  = 2.8% conv rate        │
│ 🇳🇱 Nederlands:  [3 / 85]   = 3.5% conv rate  ⭐     │
│ 🇩🇪 Deutsch:     [2 / 70]   = 2.9% conv rate        │
│ 🇵🇹 Português:   [1 / 40]   = 2.5% conv rate        │
│ 🇸🇪 Svenska:     [1 / 15]   = 6.7% conv rate  🏆     │
│ 🇫🇷 Français:    [0 / 10]   = 0.0% conv rate        │
└─────────────────────────────────────────────────────┘
```

---

#### Section 5: User Journey Insights
```
┌─────────────────────────────────────────────────────┐
│ TOP CONVERSION PATHS                                 │
├─────────────────────────────────────────────────────┤
│ 1. Gallery → Contact → Form        [40%]            │
│ 2. Features → Gallery → Phone      [25%]            │
│ 3. Direct → Contact → Phone        [20%]            │
│ 4. Gallery → Map → Form            [15%]            │
└─────────────────────────────────────────────────────┘
```

---

### 🎯 Critical Metrics to Monitor Daily

1. **New Leads**: `form-submission` + `phone-click` count
2. **Conversion Rate**: Leads / Total Visitors
3. **Hot Leads**: `gallery-high-engagement` + `contact-section-view` count
4. **Bounce Rate**: Visitors with `time-on-page` < 30s

---

### 📈 Weekly Review Metrics

1. **Funnel Conversion Rates**: Each step drop-off
2. **Language Performance**: Compare conversion rates
3. **Engagement Trends**: Gallery views, scroll depth
4. **Content Performance**: Which sections drive conversions
5. **Traffic Quality**: Avg time on page, engagement rate

---

### 📊 Monthly Deep Dive

1. **Multi-Visit Analysis**: Conversion path timing
2. **Cohort Retention**: Language and engagement cohorts
3. **A/B Test Results**: Content experiments
4. **ROI Analysis**: Cost per lead by traffic source
5. **Optimization Opportunities**: Low-performing segments

---

## Implementation Details

### 📁 Files Modified

1. **`index.html.backup`** (Template)
   - Line 8: Umami script tag added to `<head>`

2. **`index.html`** (Language Selector)
   - Line 7: Umami script tag added to `<head>`

3. **`build-i18n.js`** (Build Script)
   - Line 493: Umami script tag added to generated index.html

4. **`script.js`** (Analytics Implementation)
   - Lines 85-156: Form submission tracking with unique IDs and interaction tracking
   - Lines 362-448: Phone tracking (click, copy, select, section view)
   - Lines 446-490: Gallery tracking
   - Lines 488-520: Scroll depth tracking
   - Lines 518-560: Navigation & language tracking
   - Lines 558-598: Map tracking
   - Lines 596-629: Time on page tracking
   - Lines 627-659: External link tracking
   - Lines 657-686: Component initialization

### 🔧 Technical Notes

- All events check for `window.umami` availability before tracking
- Events are debounced where appropriate (scroll, resize)
- One-time events use flags or `once: true` to prevent duplicates
- All events include `language` property for segmentation
- Privacy-compliant: No PII tracked, only aggregate metrics

---

### 🚀 Deployment Checklist

- [x] Umami script added to all HTML templates
- [x] Build script updated to include Umami
- [x] Event tracking implemented in script.js
- [x] All language versions include tracking
- [ ] Test events in Umami dashboard after deployment
- [ ] Configure Goals in Umami dashboard
- [ ] Set up Funnels in Umami dashboard
- [ ] Create custom dashboard layout
- [ ] Set up email reports (weekly/monthly)

---

### 🧪 Testing Events

To test events locally:

1. Open browser console on any language page
2. Type: `umami.track('test-event', { test: 'value' })`
3. Check Umami dashboard for event appearance
4. Interact with site features (gallery, scroll, form)
5. Verify events appear in real-time dashboard

---

### 📞 Support & Questions

- **Umami Docs**: https://umami.is/docs
- **Event Tracking**: https://umami.is/docs/track-events
- **Dashboard**: https://cloud.umami.is
- **Website ID**: `00643849-5c2d-4e5b-9095-85fe1a7e3f48`

---

## Optimization Strategy

### 🎯 Phase 1: Data Collection (Weeks 1-4)
- Collect baseline data across all events
- Identify traffic patterns and language distribution
- Establish conversion rate benchmarks
- Monitor for tracking errors or anomalies

### 📊 Phase 2: Analysis (Weeks 5-8)
- Analyze funnel drop-off points
- Compare language performance
- Identify high-converting user patterns
- Map user journeys to conversion

### 🚀 Phase 3: Optimization (Weeks 9+)
- Test content improvements on low-performing sections
- Optimize gallery based on engagement data
- A/B test CTA placement and copy
- Personalize experience by language/traffic source
- Adjust marketing spend based on language ROI

---

### 📈 Success Criteria

**3-Month Goals:**
- Conversion rate: 3-5%
- Hot leads: 10% of visitors
- Avg time on page: 2-3 minutes
- Contact section views: 40%+
- Gallery engagement: 30%+

**6-Month Goals:**
- Conversion rate: 5-7%
- Multi-language optimization complete
- Funnel conversion rate improved 20%
- Return visitor conversion tracked
- ROI positive on all marketing channels

---

*Last Updated: January 9, 2025*
*Version: 1.0*
