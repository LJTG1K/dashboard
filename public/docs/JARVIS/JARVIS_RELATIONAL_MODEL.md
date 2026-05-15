# JARVIS Relational Model

**Purpose:** Define entities and relationships to enable structured queries and proactive context recall.

**Date:** 2026-05-15  
**Status:** Foundation Design (implemented as JSON schema)

---

## Core Entities

### 1. PROJECT
Central entity representing major work initiatives.

```json
{
  "id": "rapid",
  "name": "RAPID",
  "full_name": "RAPID Sugargoo Marketplace Gateway",
  "description": "Marketplace platform connecting shoppers to Chinese sellers via Sugargoo",
  "owner": "lachlan",
  "status": "LIVE",
  "importance": "CRITICAL",
  "phases": ["research", "build", "launch", "scale"],
  "current_phase": "launch",
  "start_date": "2026-04-01",
  "target_completion": "2026-06-30",
  "url": "https://rapid-five-zeta.vercel.app",
  "repo": "https://github.com/LJTG1K/rapid.git",
  "team": ["lachlan", "negan"],
  "dependencies": ["sugargoo_api", "meta_ads_account_2", "vercel"],
  "blocked_by": [],
  "blocks": ["grand_tour"],
  "next_milestone": "Ads launch with first 10 image creatives",
  "next_milestone_date": "2026-05-20"
}
```

### 2. DECISION
Major choice points that shape project direction.

```json
{
  "id": "dec_meta_targeting_2026_05_14",
  "date": "2026-05-14",
  "project": "rapid",
  "title": "Handle Meta Interest Targeting Limitation",
  "context": "Specific interests (Fashion Reps, Sneaker Culture) unavailable in Meta library",
  "options": [
    "Use broad Advantage Audience (Meta optimizes with no constraints)",
    "Request custom interest creation (slow, uncertain)",
    "Pivot to behavior-based targeting (alternative approach)",
    "Use lookalike audiences only (risky for cold traffic)"
  ],
  "chosen": "Use broad Advantage Audience",
  "rationale": "Advantage Audience performs well on cold traffic; Meta's algorithm can infer audience from behavior + geo. Fastest path to launch.",
  "made_by": "negan",
  "approved_by": "lachlan",
  "reversibility": "High (can add interests later if they become available)",
  "impact": "Audience targeting less specific but faster optimization",
  "status": "IMPLEMENTED",
  "next_review": "2026-05-22"
}
```

### 3. DISCOVERY
Insights, learnings, or surprises that inform future work.

```json
{
  "id": "disc_taobao_tutorial_repurpose_2026_05_15",
  "date": "2026-05-15",
  "project": "rapid",
  "type": "Opportunity",
  "title": "25K-view Taobao tutorial can be adapted for RAPID",
  "description": "Found high-quality video 'HOW TO BUY FROM TAOBAO' with 25K views and strong r/FashionReps engagement. Identified 8 major sections that can be pivoted to position RAPID as the simpler solution.",
  "source": "Lachlan shared video link",
  "significance": "HIGH",
  "action": "Create timestamp-by-timestamp edit suggestions (completed)",
  "related_docs": ["RAPID_VIDEO_EDIT_SUGGESTIONS.md"],
  "implication": "Could drive significant organic traffic if repurposed correctly"
}
```

### 4. BLOCKER
Issues blocking progress, with resolution status.

```json
{
  "id": "block_rapid_pixel_setup_2026_05_14",
  "date": "2026-05-14",
  "project": "rapid",
  "title": "RAPID pixel not configured for ad tracking",
  "description": "Ad campaigns created but no ads attached yet. Pixel tracking can't be tested without ad creatives firing events.",
  "severity": "MEDIUM",
  "blocked_since": "2026-05-14",
  "root_cause": "Waiting for image creatives from Nano Banana 2",
  "blocker": "Lachlan (finishing touches on image briefs)",
  "resolution_path": "1. Generate 10 image concepts with Nano Banana 2 → 2. Attach to ad sets → 3. Test pixel firing → 4. Launch",
  "target_resolution": "2026-05-20",
  "status": "BLOCKED_WAITING",
  "depends_on": ["nano_banana_image_generation"]
}
```

### 5. ASSET
Shared resources, tools, APIs, credentials.

```json
{
  "id": "meta_ads_account_2",
  "name": "RAPID Ad Account",
  "type": "META_ADS_ACCOUNT",
  "account_id": "act_1374342484518449",
  "owner": "lachlan",
  "access": ["negan"],
  "projects": ["rapid"],
  "budget": 3000,
  "budget_currency": "AUD",
  "budget_period": "monthly",
  "status": "ACTIVE",
  "last_accessed": "2026-05-15",
  "access_method": "API",
  "token_env": "META_ACCOUNT_2_TOKEN",
  "notes": "Used for RAPID marketplace ads. Separate from BLANKS account.",
  "maintenance": "Token refresh quarterly"
}
```

### 6. PERSON
People involved in projects.

```json
{
  "id": "lachlan",
  "name": "Lachlan Taylor",
  "role": "Business Owner / Founder",
  "timezone": "AWST",
  "relation_to_negan": "Co-founder, decision maker",
  "preferences": {
    "communication": "Casual, direct, mates",
    "frequency": "1-2 check-ins per day",
    "documentation": "Markdown, accessible on dashboard",
    "decisions": "Explicit approval needed",
    "pace": "Piece by piece, no rushing"
  },
  "projects": ["rapid", "blanks", "gtoy", "grand_tour"],
  "decision_authority": "ALL",
  "projects_created": ["rapid", "blanks", "gtoy", "jarvis"]
}
```

### 7. MILESTONE
Major completion targets.

```json
{
  "id": "rapid_milestone_ads_launch",
  "project": "rapid",
  "title": "Ad campaigns live with first image creatives",
  "date": "2026-05-20",
  "phase": "launch",
  "dependencies": ["image_briefs_completed", "pixel_configured", "landing_page_ready"],
  "deliverables": [
    "10 Nano Banana image concepts generated",
    "Creatives attached to ad sets",
    "Pixel firing tested + verified",
    "Heartbeat monitoring enabled"
  ],
  "owner": "lachlan",
  "status": "IN_PROGRESS",
  "risk": "Image generation delays could push to May 22",
  "rollup_to": "RAPID Phase 1 (Launch)"
}
```

---

## Relationships

### PROJECT → DECISION (1:Many)
*A project has many decisions that shape its direction.*

**Example:**
- Project: RAPID
- Decisions:
  - "Multi-campaign funnel structure (May 14)"
  - "Use Advantage Audience for targeting (May 14)"
  - "Adapt Taobao video for RAPID (May 15)"

**Use case:** "Show all decisions made about RAPID" → Audit trail of why we're doing what we're doing.

---

### PROJECT → BLOCKER (1:Many)
*A project can have multiple blocking issues.*

**Example:**
- Project: RAPID
- Blockers:
  - "Pixel not configured (waiting for creatives)"
  - "Nano Banana image generation pending"
  - "Ads paused, waiting for creative launch"

**Use case:** "What's stopping RAPID from launching?" → Identify critical path blockers.

---

### BLOCKER → DECISION (Many:1)
*Multiple blockers might trace back to a single decision.*

**Example:**
- Decision: "Use Advantage Audience (no specific interests)"
- Blockers:
  - "Audience size narrower than planned"
  - "Age range had to expand to 18-65 (secondary blocker)"

---

### PROJECT → DISCOVERY (1:Many)
*A project learns many things as it progresses.*

**Example:**
- Project: RAPID
- Discoveries:
  - "Meta interest targeting unavailable (May 14)"
  - "Taobao video repurposing opportunity (May 15)"
  - "Brand identity must be strictly enforced in all creatives (May 15)"

**Use case:** "What have we learned about RAPID so far?" → Capture insights for next phase.

---

### PROJECT → PROJECT (Many:Many, via "impacts")
*Projects affect each other.*

**Example:**
```
RAPID → GRAND_TOUR
  Impact: RAPID is destination for Grand Tour sellers
  Coordination: Need seller onboarding flow before tour launches
  Timeline: Must be live by June 1

RAPID → BLANKS  
  Impact: RAPID's brand learnings could improve BLANKS ad copy
  Coordination: Share creative audit trail
  Timeline: Post-launch optimization
```

**Use case:** "What happens if RAPID launches late?" → See cascading effects.

---

### PERSON → DECISION (Many:1)
*Decisions are made by and approved by specific people.*

**Example:**
- Decision: "Use Advantage Audience"
- Made by: Negan
- Approved by: Lachlan
- Authority: Lachlan (final say)

---

### ASSET → PROJECT (Many:Many)
*Assets are shared across projects.*

**Example:**
- Asset: Meta Ads API
- Projects using it: RAPID, BLANKS, GTOY
- Risk: If API changes, affects all three projects

**Use case:** "What breaks if the Meta API token expires?" → Identify critical dependencies.

---

### PROJECT → MILESTONE (1:Many)
*A project has multiple milestones.*

**Example:**
- Project: RAPID
- Milestones:
  - "Product pages launched (May 7) ✅"
  - "Ads live with creatives (May 20) 🟡"
  - "50+ sign-ups in first month (June 15) 🚀"
  - "$1K/month recurring revenue (July 1) 🎯"

---

## ER Diagram

```
PROJECT
├── 1:Many → DECISION
├── 1:Many → BLOCKER
├── 1:Many → DISCOVERY
├── 1:Many → MILESTONE
└── Many:Many → PROJECT (impacts)

DECISION
├── Made by → PERSON
├── Approved by → PERSON
└── May create → BLOCKER

BLOCKER
├── Blocks → MILESTONE
├── Related to → DECISION
└── Resolved by → DECISION

DISCOVERY
├── Informs → DECISION
└── Related to → ASSET

PERSON
├── Owns → PROJECT
├── Makes → DECISION
└── Approves → DECISION

ASSET
└── Used by → PROJECT

MILESTONE
├── Part of → PROJECT
└── Depends on → [DECISION, ASSET, BLOCKER]
```

---

## Query Patterns (Enabled by This Model)

**Once this model is implemented, these queries become possible:**

1. **"What decisions have we made about RAPID?"**
   ```
   SELECT * FROM DECISION WHERE project = "rapid" ORDER BY date DESC
   ```

2. **"What's blocking RAPID right now?"**
   ```
   SELECT * FROM BLOCKER WHERE project = "rapid" AND status != "RESOLVED"
   ```

3. **"How does RAPID affect BLANKS?"**
   ```
   SELECT * FROM PROJECT WHERE id = "rapid" AND impacts.target = "blanks"
   ```

4. **"What have we learned about Meta ads?"**
   ```
   SELECT * FROM DISCOVERY WHERE projects CONTAINS ["rapid", "blanks", "gtoy"]
   ```

5. **"Which assets are critical to RAPID?"**
   ```
   SELECT * FROM ASSET WHERE projects CONTAINS "rapid" AND criticality = "CRITICAL"
   ```

6. **"When is the next RAPID milestone and what's blocking it?"**
   ```
   SELECT milestone.date, blocker.* FROM MILESTONE 
   WHERE project = "rapid" 
   JOIN BLOCKER ON blocker.milestone_id = milestone.id
   ```

---

## Implementation Notes

### Storage Format
All entities will be stored as JSON in `JARVIS_LOG.json` with the following structure:

```json
{
  "entities": {
    "projects": [{...}, {...}],
    "decisions": [{...}, {...}],
    "discoveries": [{...}, {...}],
    "blockers": [{...}, {...}],
    "assets": [{...}, {...}],
    "people": [{...}, {...}],
    "milestones": [{...}, {...}]
  },
  "last_updated": "2026-05-15T10:30:00Z"
}
```

### Query Implementation
Python script (or future JavaScript) will:
1. Load JSON from `JARVIS_LOG.json`
2. Build in-memory index for O(1) lookups
3. Support filtering by any field
4. Return formatted results for display

### Integration with Existing Memory
- `MEMORY.md` remains human-readable reference
- Daily logs (memory/YYYY-MM-DD.md) continue as-is
- Structured log aggregates everything in queryable format
- No breaking changes; augmentation only

---

## Next Steps

1. ✅ Design relational model (this document)
2. 🔄 Implement JARVIS_LOG.json with schema
3. 🔄 Backfill historical data (May 1-15)
4. 🔄 Build query functions
5. 🚀 Test queries from Phase 1 plan

---

_Relational Model Design — JARVIS Phase 1_  
_Prepared by: Negan_  
_Date: 2026-05-15_
