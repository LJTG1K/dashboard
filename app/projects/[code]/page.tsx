import Link from 'next/link'
import { getProject, projects } from '@/lib/projects'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    code: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    code: project.code,
  }))
}

export default async function ProjectPage({ params }: PageProps) {
  const { code } = await params
  const project = getProject(code.toUpperCase())

  if (!project) {
    notFound()
  }

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
          ← Back to Dashboard
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{project.emoji}</div>
            <h1 style={{ margin: 0 }}>{project.name}</h1>
            <p className="text-gray-600" style={{ marginTop: '0.5rem' }}>
              Project {project.code}
            </p>
          </div>
          <div className={`status-badge status-${project.status}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
            {project.status === 'live' && '🟢 Live'}
            {project.status === 'optimizing' && '🟡 Optimizing'}
            {project.status === 'paused' && '🟠 Paused'}
            {project.status === 'paused-gray' && '⏸️ Paused'}
          </div>
        </div>

        <p style={{ fontSize: '1.125rem', color: 'var(--gray-700)', lineHeight: 1.6 }}>
          {project.description}
        </p>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Key Metrics</h3>
          <div className="stats-grid" style={{ marginTop: '1rem' }}>
            {project.metrics?.map((metric, idx) => (
              <div key={idx} className="stat-card" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                  {metric.label}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card">
        <h3>📋 Next Steps</h3>
        <div style={{ marginTop: '1rem' }}>
          {project.nextSteps?.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '0.75rem',
                padding: '0.75rem 0',
                borderBottom: idx < (project.nextSteps?.length || 0) - 1 ? '1px solid var(--gray-200)' : 'none',
              }}
            >
              <span style={{ color: 'var(--gray-400)', minWidth: '1.5rem' }}>▪</span>
              <span style={{ color: 'var(--gray-700)' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="card">
        <h3>🔗 Resources & Links</h3>
        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {project.resources?.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '1rem',
                border: '1px solid var(--gray-200)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'var(--primary)',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)'
                e.currentTarget.style.backgroundColor = 'var(--gray-50)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-200)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {resource.label} →
            </a>
          ))}
        </div>
      </div>

      {/* Project Info */}
      <div className="card">
        <h3>ℹ️ Project Info</h3>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <div>
              <p className="text-xs text-gray-500">Priority Level</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '0.25rem' }}>
                {project.priority}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Updated</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '0.25rem' }}>
                {project.lastUpdate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Files */}
      <div className="card">
        <h3>📂 Full Documentation</h3>
        <p className="text-gray-600" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          Access detailed information from the project files:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--gray-50)', borderRadius: '0.5rem', borderLeft: '3px solid var(--primary)' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>README.md</p>
            <p className="text-xs text-gray-600">Overview, key metrics, what we've built</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--gray-50)', borderRadius: '0.5rem', borderLeft: '3px solid var(--warning)' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>STATUS.md</p>
            <p className="text-xs text-gray-600">Progress, blockers, action items, timelines</p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--gray-50)', borderRadius: '0.5rem', borderLeft: '3px solid var(--success)' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>ASSETS.md</p>
            <p className="text-xs text-gray-600">Links, credentials, tools, checklists</p>
          </div>
        </div>
        <p className="text-xs text-gray-500" style={{ marginTop: '1rem' }}>
          Find these files in: <code style={{ background: 'var(--gray-100)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>/projects/{project.code}/</code>
        </p>
      </div>
    </>
  )
}
