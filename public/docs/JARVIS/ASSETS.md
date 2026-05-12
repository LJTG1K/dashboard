# Project JARVIS — Assets & Technical Resources

**Last Updated:** 2026-05-12

---

## 🧠 Memory Infrastructure

### Current Memory Stack

**MEMORY.md** (Long-term curated memory)
- Location: `/workspace/MEMORY.md`
- Purpose: Distilled facts, decisions, preferences
- Format: Markdown with sections
- Access: Loaded in main session only
- Refresh Rate: Weekly review + updates

**memory/*.md** (Daily logs)
- Location: `/workspace/memory/YYYY-MM-DD.md`
- Purpose: Raw logs of daily activities, learnings
- Format: Freeform markdown
- Access: Searchable via `memory_search` tool
- Retention: Indefinite (historical records)

**Session Transcripts**
- Stored in OpenClaw session history
- Searchable via `sessions_history` tool
- Visible to current session (not cross-session by default)
- Useful for: Conversation context, decision history

### Memory Tools Available

| Tool | Purpose | Usage |
|------|---------|-------|
| `memory_get` | Read specific sections of MEMORY.md | Fast lookup of known info |
| `memory_search` | Semantic search across memory files | Find related context |
| `sessions_history` | Fetch session transcripts | Review conversation flow |
| `sessions_list` | List other visible sessions | Cross-session context |

**Improvement Needed:**
- Cross-session memory recall (currently requires manual session lookup)
- Relational indexing (which projects are connected?)
- Automated memory maintenance (archiving old daily logs)
- Semantic similarity search (find similar past situations)

---

## 🎤 Voice & Multimodal Infrastructure

### Speech-to-Text (STT)

**Current Status:** Not integrated yet

**Options Being Considered:**
1. **OpenAI Whisper API**
   - Accuracy: 99%+
   - Latency: 1-3 seconds
   - Cost: $0.02 per minute
   - Pros: Excellent accuracy, multilingual, emotion detection possible
   - Cons: External API, cost per minute

2. **Google Cloud Speech-to-Text**
   - Accuracy: 99%+
   - Latency: 0.5-2 seconds
   - Cost: $0.024 per 15 seconds
   - Pros: Real-time streaming, best-in-class
   - Cons: Higher cost, requires authentication

3. **Local TensorFlow/PyTorch Models**
   - Accuracy: 95%+
   - Latency: <500ms (with GPU)
   - Cost: Hardware only
   - Pros: Privacy-first, offline, no per-call cost
   - Cons: Lower accuracy, requires GPU, setup complexity

**Recommendation:** Start with Whisper API (good accuracy + cost balance), migrate to local model later

### Text-to-Speech (TTS)

**Current Status:** ✅ Available via `tts` tool

**Provider:** ElevenLabs API (currently configured)

**Current Capabilities:**
- Natural voice synthesis
- Multiple voice options
- Speed/pitch control
- Emotion/tone possible (limited)

**Persona Voice Selection:**
- **Default:** "Nova" (warm, slightly British, professional)
- **Casual:** "Onyx" (laid-back, friendly)
- **Urgent:** "Bella" (crisp, clear, immediate)

**Improvement Needed:**
- Dynamic voice selection based on message tone/urgency
- Prosody adjustment (cadence, emphasis) per context
- Integration with ambient sound level (quiet → softer voice)
- Multilingual support

---

## 🔗 Integration & API Assets

### Available Tool Categories

**Calendar & Scheduling**
- Google Calendar API (for availability check)
- Cron jobs (for scheduling autonomy)
- Status: Available

**Communication**
- Telegram (message, send, polls, reactions)
- Email (Himalaya IMAP/SMTP)
- Slack (if configured)
- Status: Available

**Productivity**
- Git (commits, pushes, branching)
- Cron job management
- File operations (read, write, edit)
- Status: Available

**Analytics & Data**
- Meta Ads API (v25.0)
- Web search & fetch
- PDF analysis
- Image analysis
- Status: Available

**Hardware/Environment** (TBD)
- Camera snapshots (node-based)
- Location services (node-based)
- Microphone input (planned)
- Smart home APIs (not yet)
- Status: Partial

### Permission Matrix (Draft)

**Autonomous (No Approval Needed):**
- [ ] Update MEMORY.md
- [ ] Update memory/YYYY-MM-DD.md
- [ ] Read files
- [ ] Check git status
- [ ] Run cron jobs

**Approval Required (Needs Summary):**
- [ ] Git commit + push
- [ ] Send emails
- [ ] Pause/resume campaigns
- [ ] Modify spending limits
- [ ] Schedule future actions

**High-Risk (Never Autonomous):**
- [ ] Delete data
- [ ] Change pricing/rates
- [ ] Financial transactions
- [ ] Major configuration changes
- [ ] Sharing sensitive credentials

**Status:** Draft — needs Lachlan's explicit approval

---

## 🤖 Autonomous Execution Infrastructure

### Cron Job Capabilities

**Current:** Can schedule one-shot + recurring tasks

**Features:**
- Schedule types: `at` (one-shot), `every` (recurring), `cron` (cron syntax)
- Delivery modes: `announce` (to chat), `webhook` (HTTP POST), `none`
- Session targets: `main`, `isolated`, `current`, `session:custom-id`
- Job management: list, add, update, remove, run, view runs

**Example:** Scheduled analysis every Monday at 9 AM (post to Telegram)

```json
{
  "name": "Weekly BLANKS Analysis",
  "schedule": { "kind": "cron", "expr": "0 9 * * 1", "tz": "Australia/Perth" },
  "payload": {
    "kind": "agentTurn",
    "message": "Analyze last week's BLANKS performance and suggest optimizations"
  },
  "delivery": { "mode": "announce", "channel": "telegram" }
}
```

**Improvements Needed:**
- Autonomous decision-making (approve action class, not each instance)
- Error handling + escalation (when to stop + alert)
- Cross-cron dependencies (Job B depends on Job A completing)
- Performance tracking (which crons are most valuable?)

---

## 📊 Project Awareness Assets

### Project Data Structure

**Location:** `/projects/[CODE]/README.md`, `STATUS.md`, `ASSETS.md`

**Available Methods:**
- `getProject(code)` — Retrieve project data
- `projects` array in `dashboard/lib/projects.ts`
- Memory search for project-specific context

**What's Tracked:**
- Status (live, optimizing, paused)
- Key metrics
- Next steps
- Resource links
- Priority level
- Last update date

**What's Missing:**
- Cross-project dependency mapping
- Automated status updates (API integration)
- Predictive insights (when will BLANKS hit $20 CPA?)
- Resource consumption tracking

---

## 🔐 Security & Privacy Assets

### Credential Storage

**Secure Storage:**
- GitHub tokens (in MEMORY.md, private section)
- Meta Ads API tokens (env vars)
- Email credentials (Himalaya, encrypted)
- API keys (Vercel, OpenAI, etc.)

**Location:** `/workspace/MEMORY.md` (private section, never shared)

**Access Control:**
- Main session only (won't load in group chats)
- No logging of sensitive data
- No sharing to external services

**Improvement Needed:**
- Encrypt credentials at rest
- Rotate API tokens periodically
- Audit access logs (who accessed what?)
- Implement credential versioning

### Privacy Framework

**Data Processing Rules:**
- No external API calls without explicit approval
- Local-first processing where possible
- User retains full data ownership/deletion rights
- Transparent about what's logged

**Current Status:** Informal guidelines; needs formalization

---

## 📈 Monitoring & Feedback

### What We Track

**Action Audit Trail**
- All git commits
- All cron executions
- All campaign changes
- All significant decisions

**Memory Effectiveness**
- How often do I need to re-ask context?
- How accurate is context recall?
- What gaps exist?

**Tool Utilization**
- Which tools do I use most?
- Which integrations are most valuable?
- What's missing?

### Feedback Loops

**User Feedback:**
- "That was helpful" / "That was wrong"
- Suggestions for improvement
- Pain points

**System Feedback:**
- Error rates
- Latency measurements
- Memory hit/miss rates

**Improvement Needed:**
- Structured feedback capture
- A/B testing framework
- Performance dashboards

---

## 🛠️ Development Tools & Environments

### Development Setup

**Local Environment:**
- Node.js v22.22.2
- TypeScript 5
- Git CLI
- OpenClaw runtime

**Deployment:**
- Vercel (for web dashboards)
- GitHub (for version control)
- OpenClaw gateway (for scheduling/execution)

**Testing:**
- Manual testing (preferred for now)
- Session-based validation
- Sandbox environments available

### Code Assets

**Dashboard:** `/workspace/dashboard/` (Next.js + TypeScript)
**Skills:** `/workspace/skills/` (agent skill modules)
**Projects:** `/workspace/projects/[CODE]/` (documentation)
**Memory:** `/workspace/MEMORY.md` + `memory/*.md` (knowledge store)

---

## 📋 System Constraints

### Current Limitations

**Memory:**
- Scales to ~100K sessions before needing optimization
- Session-specific by default (cross-session requires tool calls)
- No built-in semantic indexing (must search manually)

**Voice:**
- STT not integrated (need API selection)
- TTS latency ~1-2 seconds (acceptable for non-real-time)
- No emotion/tone detection from input

**Autonomy:**
- No permission matrix yet (manual approval required)
- Limited error handling/escalation logic
- No "ask once, do many" patterns

**Hardware:**
- No native device control
- Smart home APIs not integrated
- Microphone/camera input limited

### Performance Targets

| Metric | Current | Target | Constraint |
|--------|---------|--------|-----------|
| **Response Latency** | 1-3s | <500ms | Token processing |
| **Memory Recall** | ~80% | 99%+ | Indexing strategy |
| **Voice I/O** | N/A | <1s latency | TTS/STT API speed |
| **Tool Execution** | 0.5-10s | <2s avg | API response times |

---

## 🚀 Extension Points

### What Can Be Added

**Voice Platforms:**
- Telegram voice messages (easy)
- Custom microphone input (medium)
- Real-time voice streaming (complex)

**Hardware APIs:**
- Smart home (Philips Hue, Nest, etc.)
- Printers & IoT devices
- Custom microcontrollers (via Raspberry Pi, Arduino)

**Data Sources:**
- Calendar integrations (Google, Outlook, Calendly)
- CRM systems (HubSpot, Pipedrive)
- Financial APIs (for accounting)

**Intelligence:**
- ML for pattern recognition
- Predictive analytics
- Natural language understanding improvements

### How to Extend

1. **New Tool:** Create wrapper in OpenClaw skills directory
2. **New API:** Add env var + connection logic
3. **New Data Source:** Integrate into memory/search
4. **New Capability:** Build as Phase in JARVIS roadmap

---

## 📞 Communication & Coordination

**How to Brief Me on JARVIS Work:**
- Use code: "JARVIS"
- Reference: Pillar (Memory, Voice, Agency, Hardware) or Phase
- Example: "JARVIS Voice — looking at Whisper API alternative costs"

**How I'll Update You:**
- Weekly status (Phase progress)
- Blockers (need decisions)
- Completed work (delivered features)
- Suggestions (what I think we should prioritize)

---

## 📚 Reference Documentation

**JARVIS README.md:** Architecture, pillars, philosophy  
**JARVIS STATUS.md:** Weekly progress, action items, next steps  
**JARVIS ASSETS.md:** This file — technical resources and constraints  

**Related:**
- MEMORY.md (current memory structure)
- AGENTS.md (my core identity)
- TOOLS.md (local tool notes)

---

**Owner:** Negan  
**Stakeholder:** Lachlan  
**Last Updated:** 2026-05-12  
**Status:** Phase 1 Foundation — Memory Systems
