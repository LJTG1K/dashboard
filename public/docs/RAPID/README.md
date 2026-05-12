# Project RAPID — Sugargoo Marketplace Gateway

## Overview

**RAPID** is a marketplace website connecting global shoppers to 1,500+ Chinese sellers via Sugargoo as the logistics agent.

**Target Audience:** r/FashionReps community (2M+ members) — quality-obsessed fashion enthusiasts hunting replica/designer pieces at budget prices.

**Revenue Model:** 
- Sugargoo affiliate commissions on sign-ups
- Potential creator/influencer partnerships (haul reviewers)
- Future: sponsored listings, premium brands

---

## Key Metrics

| Metric | Value |
|--------|-------|
| **Live URL** | https://rapid-five-zeta.vercel.app/listings |
| **Brands Live** | 104 (added 37 on May 7) |
| **Total Products** | 3M+ (via Sugargoo) |
| **Platform** | Next.js (React + Node.js full-stack) |
| **Hosting** | Vercel (git-connected auto-deploy) |
| **Git Repo** | https://github.com/LJTG1K/rapid.git |

---

## Target Audience Deep Dive

**r/FashionReps Community:**
- 2M+ subreddit members
- Pain points: 
  - Finding reliable sellers (QC concerns)
  - Shipping costs & logistics complexity
  - Trust in quality/authenticity
- What drives engagement:
  - Haul reviews (photo walkthroughs of recent purchases)
  - QC (quality check) discussions
  - Seller recommendations & ratings
  - Shipping updates & agent comparisons
- Platforms they use: Taobao, 1688, AliExpress → agents like Sugargoo
- Creator ecosystem: Haul reviewers monetize via YouTube, TikTok, Reddit rep influence

---

## Tech Stack

- **Frontend:** React (Next.js)
- **Backend:** Node.js API (Next.js server-side)
- **Hosting:** Vercel (seamless Next.js, auto-deploy on git push)
- **Database:** Google Sheets (current; scalable via API)
- **Deploy:** Automatic on GitHub push

---

## What We've Built (May 7)

✅ **Product Pages** (`/listings/[slug].tsx`)
- Dynamic routing with slugified product names
- URL-friendly URLs (e.g., `/listings/west-coast-hiphop-black-sweatpants`)
- Standalone page: image, details, price, verified badge, Sugargoo link
- 8 related products displayed (brand-first, category fallback)
- ISR (Incremental Static Regeneration) for scaling

✅ **Clickable Product Cards** (Listings page)
- Wrapped in Link components → individual product pages
- "Buy on Sugargoo" button opens external link independently

✅ **Slugify Utility** (`lib/slugify.ts`)
- Converts product names to URL-friendly slugs
- Consistent special character & spacing handling

✅ **Sheet Structure Fix**
- Identified: (Empty Col A) | ITEM NAME | IMAGE | DESC | PRICE | LINK
- API already handles correctly — no modifications needed
- Product pages + listings = fully functional

---

## Current Status

**🟢 LIVE & SCALING**

- Website: Fully operational
- Product pages: Ready for production
- Listings: Real data + clickable cards
- Ready for: SEO optimization, content marketing, community outreach

---

## Next Steps

- [ ] SEO optimization (metadata, Open Graph, structured data)
- [ ] Content marketing strategy (blog, haul reviews, seller spotlights)
- [ ] r/FashionReps outreach & community engagement
- [ ] Creator partnerships (haul reviewers, influencers)
- [ ] Analytics setup (traffic, conversion funnels)
- [ ] A/B testing (layout, copy, CTA variations)
- [ ] Scale to more brands/sellers

---

## Key Decisions

- **Go piece by piece** — foundation first, features second
- **No changes without approval** — analytics only for now
- **Focus on user experience** — shopping, discovery, trust

---

## Links & Resources

- **Live URL:** https://rapid-five-zeta.vercel.app/listings
- **GitHub:** https://github.com/LJTG1K/rapid.git
- **Vercel Dashboard:** https://vercel.com
- **Research Doc:** See MEMORY.md (May 5 research notes)

---

**Last Updated:** 2026-05-07  
**Owner:** Lachlan  
**Status:** Production Ready
