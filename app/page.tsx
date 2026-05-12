import Link from 'next/link'
import { projects, getProjectStats } from '@/lib/projects'

export default function Dashboard() {
  const stats = getProjectStats()

  return (
    <>
      <div className="header">
        <h1>📊 Project Dashboard</h1>
        <p className="text-gray-600">Manage your marketing operations across all projects</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.paused}</div>
          <div className="stat-label">Paused</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Revenue Streams</div>
        </div>
      </div>

      {/* Projects Grid */}
      <h2 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>Your Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link
            key={project.code}
            href={`/projects/${project.code}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="project-card">
              <div className="project-card-header">
                <div>
                  <div className="project-emoji">{project.emoji}</div>
                  <div className="project-title">{project.name}</div>
                  <div className="project-code">[{project.code}]</div>
                </div>
                <div className={`status-badge status-${project.status}`}>
                  {project.status === 'live' && '🟢 Live'}
                  {project.status === 'optimizing' && '🟡 Optimizing'}
                  {project.status === 'paused' && '🟠 Paused'}
                  {project.status === 'paused-gray' && '⏸️ Paused'}
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-metrics">
                {project.metrics?.slice(0, 4).map((metric, idx) => (
                  <div key={idx} className="metric">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value">{metric.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontStyle: 'italic' }}>
                  Priority: {project.priority}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>📋 Quick Reference</h3>
        <p className="text-gray-600" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          Use project codes to reference work: "Let's work on RAPID today"
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.code}>
                <td>
                  <code style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {project.code}
                  </code>
                </td>
                <td>{project.name}</td>
                <td>
                  <span className={`status-badge status-${project.status}`}>
                    {project.status === 'live' && '🟢 Live'}
                    {project.status === 'optimizing' && '🟡 Optimizing'}
                    {project.status === 'paused' && '🟠 Paused'}
                    {project.status === 'paused-gray' && '⏸️ Paused'}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    {project.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
