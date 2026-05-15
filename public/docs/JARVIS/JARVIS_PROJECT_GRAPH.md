# JARVIS Project Dependency Graph

**Date:** 2026-05-15  
**Purpose:** Map how projects depend on each other, share resources, and create opportunities for coordination.

---

## Project Landscape

```
RAPID (CRITICAL)
  ↓ prerequisite
GRAND_TOUR (CRITICAL)
  ↓ supports
[Seller onboarding]

BLANKS (HIGH)
  ↔ knowledge-share
RAPID (CRITICAL)

GTOY (MEDIUM)
  [Paused, waiting for stock]
```

---

## Projects Summary

### RAPID — Sugargoo Marketplace Gateway 🚀
- **Status:** LIVE (launching ads this week)
- **Timeline:** Phase 1 (Launch) through Phase 5 (Scale)
- **Current focus:** Ads with image creatives (May 20 target)
- **Team:** Lachlan (biz), Negan (marketing/tech)
- **Budget:** $3,000/month (Meta ads)
- **Target:** 25-50 sign-ups/month at $60-120 CAC

### GRAND_TOUR — China Seller Partnership Tour 🌏
- **Status:** PLANNING (Phase 1: Research)
- **Timeline:** 6 weeks (May 15 - Jun 30 target)
- **Current focus:** Identify 50+ target sellers
- **Team:** Lachlan (lead)
- **Budget:** $8,000-12,000 AUD
- **Target:** 20-30 sellers, exclusive deals + ad partnerships

### BLANKS — G Blanks E-Commerce 👕
- **Status:** ACTIVE (optimization phase)
- **Timeline:** Ongoing
- **Current focus:** Drop CPA from current to $20-25 AUD
- **Team:** Lachlan (owner), Negan (analytics)
- **Budget:** $80/day Meta ads
- **Spend to date:** $10,831 AUD

### GTOY — Yu-Gi-Oh Models 🃏
- **Status:** PAUSED (stock issues)
- **Timeline:** Reactivate late May
- **Current focus:** Awaiting stock + relaunch plan
- **Spend to date:** $7,659 AUD
- **Status:** Hands off until briefed

### JARVIS — Personal OS Evolution 🤖
- **Status:** IN_DEVELOPMENT (Phase 1: Foundation)
- **Timeline:** 20 weeks (May 12 - Oct 2026)
- **Current focus:** Memory audit, relational indexing, logging
- **Team:** Negan (primary)
- **Purpose:** Enable proactive context recall and autonomous execution

---

## Dependency Map

### RAPID → GRAND_TOUR (Prerequisite)

```
RAPID LIVE (May 20?)
    ↓
    └─→ Grand Tour can launch seller pitch
        (Sellers need RAPID marketplace to list on)
    ↓
GRAND_TOUR SUCCESS (Jun 30?)
    ↓
    └─→ 20-30 exclusive sellers go live on RAPID
        └─→ Exclusive inventory + ad revenue streams
```

**Timeline impact:**
- If RAPID delayed → Grand Tour pushed back
- If Grand Tour delayed → Missed Q2 seller acquisition window
- **Critical path:** RAPID must launch by May 20

**Coordination needed:**
- Brief Grand Tour sellers on RAPID onboarding flow before tour
- Prepare seller contracts (exclusive deals, revenue share)
- Ensure RAPID can handle seller onboarding traffic

---

### RAPID ↔ BLANKS (Knowledge Share)

```
RAPID LEARNING (ongoing):
  - Meta targeting: Advantage Audience vs specific interests
  - CPC trends: Budget allocation by campaign stage
  - Creative fatigue: Rotation schedule
  - Audience saturation: Frequency metrics
  - Cost per conversion tracking

BLANKS NEEDS (ongoing optimization):
  - Better audience targeting (less fatigue, lower CPC)
  - Creative rotation discipline
  - Conversion cost reduction ($20-25 AUD target)

OPPORTUNITY:
  Share RAPID's weekly optimization insights with BLANKS
  (e.g., "Tested new interest, got 15% lower CPC")
```

**Timeline:** Starts post-RAPID-launch (May 21+)

**Coordination needed:**
- Weekly RAPID heartbeat reports → sent to BLANKS optimization
- Same creative testing approach across both accounts
- Shared audience insights (what works, what doesn't)

**Potential wins:**
- BLANKS CPA reduction (borrowing RAPID learnings)
- Faster iteration on both accounts (shared playbook)
- Better ad account management overall

---

### RAPID + BLANKS + GTOY (Meta Ecosystem)

```
Three accounts, one API, shared learnings:
- RAPID: Testing new audience segments
- BLANKS: Optimization focus
- GTOY: Restarting with fresh strategy

OPPORTUNITY: Meta Account Management System
- Centralized heartbeat for all three
- Shared alert thresholds
- Combined optimization roadmap
- Cross-account audience insights

RISK: Single point of failure (Meta API token)
- If token revoked, all three accounts go dark
- MITIGATION: Multi-token setup, backup plan documented
```

---

### RAPID → JARVIS (Feedback Loop)

```
RAPID ADS RUNNING (May 20+)
    ↓
    ├─→ Daily data: spend, CPC, CTR, conversions
    ├─→ Weekly blockers: creative issues, audience saturation
    └─→ Insights: what's working, what's not

JARVIS LOGS THIS DATA
    ↓
    ├─→ Detects patterns (e.g., "CPC rising every Tuesday")
    ├─→ Suggests optimizations (proactive)
    └─→ Flags anomalies (alerts Lachlan)

LACHLAN MAKES DECISIONS
    ↓
    └─→ JARVIS logs decision + rationale
        └─→ Creates learning loop for next campaign
```

**Impact:** By June, JARVIS will have rich data about what works in Meta advertising for this audience.

---

## Shared Resources

### Meta Ads API (CRITICAL)

| Account | Project | Token env | Status | Risk |
|---------|---------|-----------|--------|------|
| act_1314480656821502 | BLANKS | META_ACCOUNT_1_TOKEN | Active | Token expiry |
| act_1374342484518449 | RAPID | META_ACCOUNT_2_TOKEN | Active | Token expiry |
| act_1104707718528346 | GTOY | META_ACCOUNT_3_TOKEN | Active | Token expiry |

**Dependency:** All three advertising projects depend on Meta API tokens.

**Risk scenario:** If Meta revokes tokens, all ads stop immediately.

**Mitigation:**
- [ ] Set calendar reminder for token refresh (quarterly)
- [ ] Document fallback authentication method
- [ ] Test token rotation process

---

### GitHub (CRITICAL)

| Repo | Project | Owner | Active |
|------|---------|-------|--------|
| LJTG1K/rapid | RAPID | Lachlan | Yes (daily commits) |
| [Others] | [Others] | [Others] | TBD |

**Dependency:** RAPID deployment relies on GitHub → Vercel auto-deploy pipeline.

**Risk scenario:** If GitHub access lost, can't deploy new versions of RAPID.

**Mitigation:**
- [ ] Alternative git hosting (GitLab, Bitbucket)
- [ ] Local git backup
- [ ] Manual deployment process documented

---

### Vercel Hosting (CRITICAL)

| Project | URL | Connected to | Auto-deploy |
|---------|-----|--------------|------------|
| RAPID | rapid-five-zeta.vercel.app | GitHub | Yes |

**Dependency:** RAPID marketplace lives on Vercel.

**Risk scenario:** If Vercel goes down, marketplace unavailable.

**Mitigation:**
- [ ] CDN setup (Cloudflare)
- [ ] Backup hosting provider configured
- [ ] DNS failover documented

---

## Cross-Project Opportunities

### 1. Shared Creative Library 📸

**Idea:** Build templates for ad creatives that work across accounts.

**Example:** 
- RAPID testing image concepts (Nano Banana) → Prove winning formats
- Port successful formats to BLANKS (adapt for different audience)
- Test adapted versions on BLANKS → Refine for lower CPC

**Timeline:** Post-RAPID-launch (June 1+)

**Owner:** Negan

**Estimated impact:** 10-15% CPC reduction on BLANKS (if formats translate)

---

### 2. Unified Heartbeat System 📊

**Idea:** Single heartbeat monitors all three advertising accounts.

**Current state:** 
- RAPID has detailed heartbeat protocol
- BLANKS optimization ad-hoc
- GTOY not monitored (paused)

**Proposed:** One heartbeat that:
- Pulls data from all three accounts
- Compares performance (what's working where)
- Flags cross-account anomalies
- Suggests optimization patterns

**Timeline:** Phase 2 (after RAPID launch data exists)

**Owner:** Negan

**Estimated impact:** 15-20% better optimization across all accounts

---

### 3. Seller Feedback Loop (RAPID → Grand Tour Pitch) 🎯

**Idea:** As RAPID sellers list products, gather seller feedback → use in Grand Tour pitch.

**Example:**
- Week 1 RAPID sellers: "Great platform, easy to list"
- Grand Tour pitch: "See? Real sellers love RAPID" (proof of concept)

**Timeline:** Grand Tour Phase 2 (week 3-4 of tour)

**Owner:** Lachlan

**Estimated impact:** Higher close rate on seller partnerships (proof > pitch)

---

### 4. RAPID Community Built In Blog (RAPID + Grand Tour Content) 📝

**Idea:** Generate blog content from Grand Tour seller stories + RAPID user hauls.

**Example posts:**
- "Meet the sellers on RAPID" (Grand Tour profiles)
- "How Lachlan met 30 Chinese sellers in 3 weeks" (story)
- "Haul reviews from RAPID users" (social proof)

**Timeline:** Post-launch (June+)

**Owner:** Negan

**Estimated impact:** SEO + organic traffic (long-tail keywords)

---

## Risk Matrix

### Critical Dependencies

| Dependency | Impact | Likelihood | Mitigation |
|------------|--------|------------|-----------|
| Meta API Token Expiry | All ads stop | Medium | Quarterly refresh, backup tokens |
| GitHub Access Lost | Can't deploy RAPID | Low | GitLab backup, local git |
| Vercel Down | Marketplace unavailable | Very Low | CDN, backup host |
| Image Creative Delays | RAPID launch delayed | Medium | Fallback to text-based ads |
| Seller Quality Issues | Grand Tour ROI poor | Medium | Better vetting process |

### Timeline Risks

| Risk | Timeline Impact | Mitigation |
|------|-----------------|-----------|
| RAPID ads delay past May 22 | Grand Tour push to June 15 | Build 2-week buffer in Grand Tour plan |
| Grand Tour logistics fail | Missed seller window | Plan virtual backup option |
| Meta interest targeting stays unavailable | Harder CAC targets | Accepted risk; Advantage Audience working |

---

## Coordination Calendar

### May 15-20: Pre-Launch Sync

- [ ] RAPID: Image briefs finalized
- [ ] RAPID: Ads created + pixel tested
- [ ] Grand Tour: Seller research 50% complete
- [ ] BLANKS: Baseline CPA measured for comparison

### May 20-Jun 1: Launch Phase

- [ ] RAPID: Ads go live, heartbeat monitoring starts
- [ ] BLANKS: Share new RAPID learnings
- [ ] Grand Tour: Final seller list + contracts drafted
- [ ] GTOY: Stock status + relaunch plan

### Jun 1-15: Scaling Phase

- [ ] RAPID: First conversion data analyzed
- [ ] RAPID: Adjust targeting based on learnings
- [ ] BLANKS: Apply RAPID insights to optimization
- [ ] Grand Tour: Tour logistics locked down
- [ ] JARVIS: Phase 1 foundation complete

### Jun 15-30: Tour Phase

- [ ] RAPID: Achieving 25-50 sign-up/month target?
- [ ] Grand Tour: In-person seller meetings
- [ ] BLANKS: CPA optimization ongoing
- [ ] JARVIS: Phase 2 (voice) begins

---

## Communication & Handoff

### Weekly Status (Every Monday)

**Participants:** Lachlan, Negan

**Topics:**
1. RAPID ads performance (spend, CPC, CTR, pixel data)
2. Grand Tour progress (seller research, logistics)
3. BLANKS optimization (CPA trend, creative performance)
4. Cross-project blockers
5. JARVIS Phase progress

**Delivery:** 5-10 minute summary, actionable decisions

---

## Summary

**Current state:** Projects somewhat isolated; limited cross-project visibility.

**Future state:** Coordinated ecosystem where:
- RAPID success feeds Grand Tour (exclusive sellers)
- RAPID learnings improve BLANKS (targeting, creative)
- All ads monitored under one heartbeat system
- JARVIS tracks everything for pattern detection

**Timeline to full coordination:** End of June (after RAPID launch data exists)

**Owner of coordination:** Negan (with Lachlan's strategic input)

---

_Cross-Project Dependency Map — JARVIS Phase 1_  
_Prepared by: Negan_  
_Date: 2026-05-15_
