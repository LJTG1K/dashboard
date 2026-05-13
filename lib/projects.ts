export interface Project {
  code: string
  name: string
  emoji: string
  description: string
  status: 'live' | 'optimizing' | 'paused' | 'paused-gray'
  priority: 'VERY HIGH' | 'HIGH' | 'MEDIUM' | 'LOW'
  lastUpdate: string
  metrics?: {
    label: string
    value: string | number
  }[]
  nextSteps?: string[]
  resources?: {
    label: string
    url: string
  }[]
}

export const projects: Project[] = [
  {
    code: 'JARVIS',
    name: 'Negan Evolution — Personal Operating System',
    emoji: '🤖',
    description: 'Transform from reactive assistant to proactive, voice-first POS with persistent memory and autonomous agency',
    status: 'optimizing',
    priority: 'VERY HIGH',
    lastUpdate: '2026-05-12',
    metrics: [
      { label: 'Status', value: 'Phase 1: Foundation (Week 1 Active)' },
      { label: 'Core Pillars', value: '4 (Memory, Voice, Agency, Persona)' },
      { label: 'Timeline', value: '20+ weeks (phased)' },
      { label: 'Current Focus', value: 'Memory Audit & Relational Indexing' },
    ],
    nextSteps: [
      'Week 1 (May 12-18): Memory audit, relational model, structured logging',
      'Week 2 (May 19-25): Proactive context recall implementation',
      'Week 3 (May 26-Jun 1): Advanced logging + pattern detection',
      'Week 4 (Jun 2-8): Cross-project relationship optimization',
      'Phase 2 (Weeks 5-8): Voice integration (STT/TTS)',
      'Phase 3 (Weeks 9-12): Autonomous agency (permission gates, escalation)',
      'Phase 4 (Weeks 13-16): Hardware integration (smart home, sensors)',
    ],
    resources: [
      { label: '🗓️ Week 1 Plan', url: '/docs/JARVIS/WEEK1_PLAN.md' },
      { label: 'README (Philosophy & Pillars)', url: '/docs/JARVIS/README.md' },
      { label: 'STATUS (Phase Roadmap)', url: '/docs/JARVIS/STATUS.md' },
      { label: 'Technical Assets', url: '/docs/JARVIS/ASSETS.md' },
    ],
  },
  {
    code: 'RAPID',
    name: 'Sugargoo Marketplace Gateway',
    emoji: '🚀',
    description: 'Global shoppers → 1,500+ Chinese sellers via Sugargoo',
    status: 'live',
    priority: 'VERY HIGH',
    lastUpdate: '2026-05-13',
    metrics: [
      { label: 'Brands Live', value: '104' },
      { label: 'Products Available', value: '3M+' },
      { label: 'Platform', value: 'Next.js + Vercel' },
      { label: 'Target Audience', value: 'r/FashionReps (2M+)' },
    ],
    nextSteps: [
      'SEO optimization (metadata, schema)',
      'Analytics setup (Google Analytics 4)',
      'Content marketing strategy',
      'r/FashionReps community outreach',
      'Shoot video creative concepts for ads',
    ],
    resources: [
      { label: 'Live Site', url: 'https://rapid-five-zeta.vercel.app/listings' },
      { label: 'GitHub', url: 'https://github.com/LJTG1K/rapid.git' },
      { label: '📺 Paid Ad Concepts (Cold Audience)', url: '/docs/RAPID/CREATIVE_CONCEPTS_PAID_ADS.md' },
      { label: '📺 Organic Concepts (Educational @gilly1k)', url: '/docs/RAPID/CREATIVE_CONCEPTS_REVISED.md' },
      { label: '📺 Hype Concepts (Original)', url: '/docs/RAPID/CREATIVE_CONCEPTS.md' },
      { label: 'README', url: '/docs/RAPID/README.md' },
      { label: 'STATUS', url: '/docs/RAPID/STATUS.md' },
      { label: 'ASSETS', url: '/docs/RAPID/ASSETS.md' },
    ],
  },
  {
    code: 'BLANKS',
    name: 'G Blanks Ads & E-Commerce',
    emoji: '📈',
    description: 'Meta advertising campaigns driving sales to gblanks.shop',
    status: 'optimizing',
    priority: 'HIGH',
    lastUpdate: '2026-05-12',
    metrics: [
      { label: 'Account ID', value: 'act_1314480656821502' },
      { label: 'All-Time Spend', value: '$10,831 AUD' },
      { label: 'Active Campaigns', value: '3' },
      { label: 'Monthly Budget', value: '~$1,300 AUD' },
    ],
    nextSteps: [
      'Debug V3_RETARGETING conversions',
      'Test new ad creatives in V3_SANDBOX',
      'Reduce CPA to $20-25 AUD',
      'Scale V3AB_SOLOFIT1 (top performer)',
    ],
    resources: [
      { label: 'Ads Manager', url: 'https://www.facebook.com/ads/manager' },
      { label: 'Shop', url: 'https://gblanks.shop' },
      { label: 'README', url: '/docs/BLANKS/README.md' },
      { label: 'STATUS', url: '/docs/BLANKS/STATUS.md' },
      { label: 'ASSETS', url: '/docs/BLANKS/ASSETS.md' },
    ],
  },
  {
    code: 'SUGARGOO',
    name: 'Sugargoo Meta Lead Forms',
    emoji: '🛒',
    description: 'Lead form automation with Zapier → email conversion optimization',
    status: 'paused',
    priority: 'MEDIUM',
    lastUpdate: '2026-05-12',
    metrics: [
      { label: 'Account ID', value: 'act_1374342484518449' },
      { label: 'All-Time Spend', value: '$2,075.74 AUD' },
      { label: 'Form-to-Signup', value: '10% (CRITICAL)' },
      { label: 'Reactivation', value: 'Monday' },
    ],
    nextSteps: [
      'Analyze conversion funnel (where drop-off?)',
      'Rewrite email automation copy',
      'A/B test new variations',
      'Simplify Sugargoo sign-up flow',
    ],
    resources: [
      { label: 'Ads Manager', url: 'https://www.facebook.com/ads/manager' },
      { label: 'Zapier', url: 'https://zapier.com' },
      { label: 'README', url: '/docs/SUGARGOO/README.md' },
      { label: 'STATUS', url: '/docs/SUGARGOO/STATUS.md' },
      { label: 'ASSETS', url: '/docs/SUGARGOO/ASSETS.md' },
    ],
  },
  {
    code: 'GTOY',
    name: 'GTOY Card Models',
    emoji: '🎴',
    description: 'Yu-Gi-Oh Pot of Greed/Avarice 3D models (currently out of stock)',
    status: 'paused-gray',
    priority: 'LOW',
    lastUpdate: '2026-05-12',
    metrics: [
      { label: 'Account ID', value: 'act_1104707718528346' },
      { label: 'All-Time Spend', value: '$7,659.93 AUD' },
      { label: 'Stock Status', value: 'Out' },
      { label: 'Reactivation', value: 'Late May' },
    ],
    nextSteps: [
      'Confirm restock arrival + inventory',
      'Review historical campaign data',
      'Refresh creatives if needed',
      'Reactivate when Lachlan gives go-ahead',
    ],
    resources: [
      { label: 'Ads Manager', url: 'https://www.facebook.com/ads/manager' },
      { label: 'README', url: '/docs/GTOY/README.md' },
      { label: 'STATUS', url: '/docs/GTOY/STATUS.md' },
      { label: 'ASSETS', url: '/docs/GTOY/ASSETS.md' },
    ],
  },
]

export function getProject(code: string): Project | undefined {
  return projects.find((p) => p.code === code)
}

export function isFileUrl(url: string): boolean {
  return url.startsWith('/docs/')
}

export function getProjectStats() {
  return {
    total: projects.length,
    active: projects.filter((p) => p.status === 'live' || p.status === 'optimizing')
      .length,
    paused: projects.filter((p) =>
      p.status === 'paused' || p.status === 'paused-gray'
    ).length,
  }
}
