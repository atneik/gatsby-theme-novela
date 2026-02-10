# Portfolio Review: Recommendations for Principal UX Engineering Position

## 1. CONTENT & SPELLING/GRAMMAR

### Broken Markdown Links
| File | Issue |
|------|-------|
| `www/content/posts/2021-01-01-mojo-vision/index.mdx` | `[Mojo Vision] (url)` — space before `(` breaks the link |
| `www/content/posts/2022-08-01-orca/index.mdx` | `[Orca] (url)` — same issue |

### Phrasing Issues
- `www/content/authors/authors.yml`: "blur the gap" should be **"bridge the gap"**
- `www/gatsby-config.js`: Description says "User Experience Engineer and Prototyper" — doesn't reflect **Principal-level** positioning
- `README.md`: "Before starting install" → "Before starting, install"

---

## 2. CONTENT STRATEGY (Principal UX Engineering Angle)

### Incomplete/Placeholder Content — Remove or Complete
| Project | Issue | Recommendation |
|---------|-------|----------------|
| **Mojo Vision** (2021) | Entire post is "Coming soon..." placeholder | Complete it or remove — a placeholder damages credibility |
| **Xbox** (2016) | Ends mid-section after "Dashboards and BI" heading with no content | Finish the section or remove the empty heading |
| **SharePoint Spaces** (2020) | "Document Library" section marked "In progress" | Complete or remove — published draft looks unprofessional |

### Content Depth Inversion (Biggest Strategic Problem)
Your **oldest academic projects** (2014) have the most depth (100-138 lines), while your **most recent professional work** (2020-2022) is the thinnest (14-31 lines). For a Principal role, this is backwards:

| Year | Project | Lines | Quality |
|------|---------|-------|---------|
| 2014 | Global Terrorism Viz | 138 | Detailed (academic) |
| 2014 | Stitch | 133 | Detailed (academic) |
| 2022 | **Orca** | **14** | **One paragraph** |
| 2021 | **Mojo Vision** | **16** | **Placeholder** |
| 2016 | **Xbox** | **31** | **Incomplete** |

**Recommendation:** Invest heavily in fleshing out Orca, Xbox, Mojo Vision, and SharePoint Spaces. These are the projects hiring managers care about.

### Missing for Principal-Level Positioning
- **Impact metrics** — No user satisfaction scores, engagement numbers, or business impact on any project
- **Leadership evidence** — No mention of team size led, mentoring, or strategic influence
- **UX process documentation** — Recent projects lack user research, iteration cycles, usability testing
- **Role clarity** — Xbox and Mojo Vision don't specify what you actually did
- **Cross-functional collaboration** — Minimal evidence of working with engineering, PM, or leadership
- **Design system contributions** — Expected at Principal level, not mentioned

### Bio Update
Current bio is too generic. For Principal UX Engineering, it should reference specific expertise areas (e.g., design systems, prototyping at scale, AR/VR interaction patterns, front-end architecture).

---

## 3. ACCESSIBILITY

Fixed. Check again.

---

## 4. SECURITY

### Critical
| Issue | Location | Risk |
|-------|----------|------|
| **`dangerouslySetInnerHTML` without sanitization** (4 instances) | `Articles.Hero.tsx:50`, `Bio.tsx:21`, `Subscription.tsx:70`, `Articles.Category.Hero.tsx:40` | XSS |
| **Hardcoded `document.domain`** in custom HTML | `www/src/html.tsx:13-15` | Subdomain takeover, deprecated API |
| **`postMessage` with wildcard `'*'` origin** | `Layout.tsx:21` | Information disclosure |

### Medium
| Issue | Location | Risk |
|-------|----------|------|
| Unencoded user input in share URLs | `Article.Share.tsx:212-220` | URL injection |
| Missing `noreferrer` on social links (has `noopener nofollow` but not `noreferrer`) | `SocialLinks.tsx:57` | Referrer leakage |
| `document.execCommand('copy')` is deprecated | `Article.Share.tsx` | Future breakage |

---

## 5. SEO

### Critical Gaps
| Issue | Impact | Fix Effort |
|-------|--------|-----------|
| **No `sitemap.xml`** — `gatsby-plugin-sitemap` not installed | Slower indexing, no Search Console submission | 10 min |
| **No `robots.txt`** — `gatsby-plugin-robots-txt` not installed | No crawl directives | 10 min |
| **Google Analytics** plugin installed but **not configured** in gatsby-config | No visitor tracking (dead dependency) | 15 min |

### Medium
- Missing `og:type` meta tag (articles should declare `og:type: article`)
- `twitter:creator` uses full URL instead of `@handle` format
- No service worker / offline support

### What's Already Good
- Excellent structured data (schema.org JSON-LD for articles)
- Comprehensive OG and Twitter Card meta tags
- Best-in-class image optimization (responsive, WebP, blur-up)
- RSS feed properly configured
- Canonical URL support
- Proper external link handling (`noreferrer`)

---

## 6. VISUAL & AESTHETICS

| Issue | Details |
|-------|---------|
| **Inconsistent responsive breakpoints** | Mix of `mediaqueries` helper and hardcoded `@media` values (e.g., `max-width: 540px` in Articles.List.tsx instead of media helper) |
| **Layout shift** | Content rendered with `opacity: 0` instead of proper `display: none` or skeleton, causing CLS |
| **Inconsistent focus indicator styles** | Some components use accent color borders, others use transforms, most have none |
| **Inline styles mixed with Emotion** | Table component uses `style={{}}` instead of styled-components pattern |
| **Code blocks** use `overflow: scroll` | Should be `overflow: auto` (always shows scrollbars even when unnecessary) |

---

## 7. POTENTIALLY DEAD LINKS TO VERIFY

| Project | URL | Age |
|---------|-----|-----|
| Digital Photo Frame | `http://anikethanda.com/frame` | 10+ years |
| KiloWalk | `http://anikethanda.com/KiloWalk/` | 10+ years |
| Terror Data | `http://cse512-14w.github.io/...` | 10+ years |
| SharePoint Spaces | `http://exploresharepointspaces.com` | May be discontinued |
| Mojo Vision | `https://www.mojo.vision/` | Company may be shut down |

---

## Priority Summary

| Priority | Category | Items |
|----------|----------|-------|
| **P0 — Fix Now** | Typos, broken markdown links, placeholder content (Mojo Vision) | 6 items |
| **P1 — Before Sharing** | Flesh out recent projects (Orca, Xbox, SharePoint), update bio/description for Principal level, fix `document.domain` and XSS | 8 items |
| **P2 — Important** | Accessibility (focus indicators, alt text, skip link, form labels), add sitemap/robots.txt, verify dead links | 10 items |
| **P3 — Polish** | Color contrast, responsive consistency, analytics setup, share URL encoding, layout shift | 8 items |
