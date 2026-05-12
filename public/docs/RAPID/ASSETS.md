# Project RAPID — Assets & Resources

**Last Updated:** 2026-05-12

---

## 🔗 Live URLs

| Resource | URL |
|----------|-----|
| **Live Site** | https://rapid-five-zeta.vercel.app/listings |
| **GitHub Repo** | https://github.com/LJTG1K/rapid.git |
| **Vercel Dashboard** | https://vercel.com |
| **Product Data** | Google Sheet (private) |

---

## 🛠️ Development

**Tech Stack:**
- Framework: Next.js (React + Node.js)
- Hosting: Vercel (auto-deploy on git push)
- Language: TypeScript/JavaScript
- Styling: Tailwind CSS (or current CSS setup)

**Key Files:**
- `/app/listings/page.tsx` — Main listings page
- `/app/listings/[slug]/page.tsx` — Individual product pages
- `/lib/slugify.ts` — URL slug generator
- `/lib/data.ts` (or similar) — Data fetching from sheets

**Deployment:**
- Git-connected to GitHub
- Auto-deploys on push to main branch
- Environment variables (if any): Check `.env.local`

---

## 📊 Data Sources

**Product Data:**
- Source: Google Sheet (Sugargoo product catalog)
- Sheet Structure: (Empty Col A) | ITEM NAME | ITEM IMAGE | DESCRIPTION | PRICE | LINK
- API: Currently reading via native Google Sheets API
- Total Products: 3M+ available; 104 brands curated

**Brands:**
- Fashion, streetwear, electronics, collectibles (r/FashionReps focus)
- 104 live brands (as of May 7)

---

## 🔐 Credentials & Access

**GitHub:**
- **Email:** lachlan.j.ta@gmail.com
- **Repo:** https://github.com/LJTG1K/rapid.git
- **Token:** (stored securely; use git CLI with SSH or HTTPS)

**Vercel:**
- **Project:** RAPID
- **Account:** Associated with GitHub account
- **Auto-deploy:** Enabled (main branch)

**Google Sheets:**
- **Access:** Via Google API (credentials in Vercel env)
- **Owner:** Lachlan
- **Shareable:** Yes (add users as needed)

---

## 🎨 Design & Content

**Branding:**
- Logo: (not set; can add)
- Color scheme: (current design; note in comments if changes)
- Typography: (current; note in comments if changes)

**Product Pages:**
- Title: Product name
- Image: From Google Sheet
- Description: From Google Sheet
- Price: From Google Sheet
- CTA: "Buy on Sugargoo" → external link
- Related Products: 8 items (brand-first logic)

**Listings Page:**
- Layout: Grid of product cards
- Each card: image, name, price, brand badge, "Buy on Sugargoo" button
- Filtering: (not yet implemented; future feature)
- Search: (not yet implemented; future feature)

---

## 📈 Analytics & Tracking

**Currently Not Set Up:**
- Google Analytics 4
- Conversion tracking
- User behavior
- Traffic sources

**To Set Up:**
- GA4 script in `_app.tsx` or `layout.tsx`
- Sugargoo sign-up conversion pixel
- User journey tracking

---

## 🤝 External Integrations

**Sugargoo:**
- **Integration Type:** Affiliate link (outbound to Sugargoo)
- **Link Format:** https://www.sugargoo.com/...
- **Sign-up Tracking:** TBD (need Sugargoo affiliate dashboard access)
- **Revenue Model:** Affiliate commissions + potential creator partnerships

**r/FashionReps Community:**
- **Audience:** 2M+ members
- **Outreach Strategy:** TBD (awaiting approval)
- **Platforms:** Reddit, YouTube (haul reviewers), TikTok (influencers)

---

## 📋 Checklist for New Features

**Before Adding Features:**
- [ ] Discuss with Lachlan (approval required)
- [ ] Create feature branch on GitHub
- [ ] Test locally before push
- [ ] Test on Vercel staging (if available)
- [ ] Create pull request for review
- [ ] Merge to main → auto-deploy

---

## 🚀 Deployment Checklist

**Deploying Changes:**
1. [ ] Commit changes locally
2. [ ] Push to GitHub (`git push origin main`)
3. [ ] Vercel auto-deploys (check dashboard)
4. [ ] Test live URL
5. [ ] Monitor for errors (Vercel logs)

**Rollback (if needed):**
- Revert commit on GitHub
- Push revert
- Vercel redeploys previous version

---

## 📞 Communication

**Questions or Issues?**
- Discussion channel: Telegram (Negan ↔ Lachlan)
- Use project code: "RAPID"
- Reference: Status, Assets, README files

---

**Owner:** Lachlan  
**Maintained by:** Negan  
**Last Updated:** 2026-05-12
