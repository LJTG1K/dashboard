# 🎯 Negan Dashboard

A web-based project management dashboard for tracking marketing projects, campaigns, and metrics across Lachlan's business operations.

## Features

✨ **Project Overview**
- Visual status tracking (Live, Optimizing, Paused)
- Key metrics at a glance
- Priority levels for all projects

📊 **Individual Project Pages**
- Detailed project information
- Key metrics and stats
- Next steps and action items
- Resource links and documentation

🎨 **Clean, Modern UI**
- Responsive design (mobile, tablet, desktop)
- Dark sidebar navigation
- Intuitive project cards
- Quick reference tables

## Projects

The dashboard currently tracks 4 projects:

| Code | Project | Status |
|------|---------|--------|
| **RAPID** | Sugargoo Marketplace Gateway | 🟢 Live |
| **BLANKS** | G Blanks Ads & E-Commerce | 🟡 Optimizing |
| **SUGARGOO** | Sugargoo Meta Lead Forms | 🟠 Paused |
| **GTOY** | GTOY Card Models | ⏸️ Paused |

## Tech Stack

- **Framework:** Next.js 15 (React 19)
- **Styling:** CSS (custom design system)
- **Deployment:** Vercel
- **Language:** TypeScript

## Development

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

This dashboard is ready to deploy to Vercel:

### Option 1: Deploy from GitHub

1. Push this folder to GitHub
2. Import project in Vercel dashboard
3. Select the `dashboard` directory as root
4. Click Deploy

### Option 2: Deploy from CLI

```bash
npm install -g vercel
vercel
```

### Environment

No environment variables required. The dashboard uses static data from `lib/projects.ts`.

**To update projects:** Edit `lib/projects.ts` and redeploy.

## File Structure

```
dashboard/
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Dashboard home page
│   ├── globals.css         # Global styles
│   └── projects/
│       └── [code]/
│           └── page.tsx    # Individual project pages
├── lib/
│   └── projects.ts         # Project data & types
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Usage

### Accessing the Dashboard

Once deployed:
- **Production:** https://your-dashboard.vercel.app
- **Development:** http://localhost:3000

### Navigation

- **Home:** View all projects and stats
- **Project Pages:** Click any project card to see details
- **Quick Reference:** View all projects in table format on home page
- **Resources:** Access links to documentation, tools, and external resources

## Updating Projects

To add or update a project:

1. Edit `lib/projects.ts`
2. Add/modify project object in the `projects` array
3. Include: code, name, emoji, description, status, priority, metrics, next steps, resources
4. Commit and push
5. Vercel auto-deploys

Example:

```typescript
{
  code: 'NEW-PROJECT',
  name: 'My New Project',
  emoji: '🚀',
  description: 'Project description here',
  status: 'live',
  priority: 'HIGH',
  lastUpdate: '2026-05-12',
  metrics: [
    { label: 'Metric 1', value: 'Value 1' },
    // ...
  ],
  nextSteps: [
    'Action 1',
    'Action 2',
  ],
  resources: [
    { label: 'Link Name', url: 'https://...' },
  ],
}
```

## Styling

The dashboard uses a custom CSS design system with CSS variables for:

- **Colors:** Primary blue, grays, status colors (green, yellow, red)
- **Spacing:** Consistent rem-based spacing
- **Responsive:** Mobile-first design with media queries
- **Components:** Cards, buttons, badges, tables, grids

All styles are in `app/globals.css`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Static site generation (SSG) for fast load times
- Optimized images and assets
- Minimal JavaScript
- Mobile-optimized design

## License

Internal use only.

---

**Questions?** Check the project documentation files in `/projects/[CODE]/README.md`
