'use client'

import { useState, useEffect } from 'react'
import './face.css'

type FaceState = 'thinking' | 'waiting' | 'deploying' | 'typing' | 'listening' | 'alert' | 'idle'

const stateConfig = {
  thinking: {
    emoji: '🤔',
    label: 'THINKING',
    message: 'Deep analysis in progress...',
    color: '#FFB84D',
    animation: 'pulse-thinking',
  },
  waiting: {
    emoji: '💭',
    label: 'WAITING',
    message: 'Awaiting your response...',
    color: '#7C3AED',
    animation: 'pulse-waiting',
  },
  deploying: {
    emoji: '🚀',
    label: 'DEPLOYING',
    message: 'Spawning subagent...',
    color: '#06B6D4',
    animation: 'pulse-deploy',
  },
  typing: {
    emoji: '✍️',
    label: 'TYPING',
    message: 'Crafting response...',
    color: '#10B981',
    animation: 'pulse-typing',
  },
  listening: {
    emoji: '👀',
    label: 'LISTENING',
    message: 'Ready. Watching for input...',
    color: '#6366F1',
    animation: 'pulse-listen',
  },
  alert: {
    emoji: '⚡',
    label: 'ALERT',
    message: 'Issue detected. Reviewing...',
    color: '#EF4444',
    animation: 'pulse-alert',
  },
  idle: {
    emoji: '😴',
    label: 'IDLE',
    message: 'Between tasks. All quiet.',
    color: '#9CA3AF',
    animation: 'pulse-idle',
  },
}

export default function NeganFace() {
  const [currentState, setCurrentState] = useState<FaceState>('listening')
  const [showStateList, setShowStateList] = useState(false)

  // Auto-cycle through states on interval (for demo)
  useEffect(() => {
    const timer = setTimeout(() => {
      const states: FaceState[] = ['listening', 'thinking', 'typing', 'waiting', 'deploying', 'alert', 'idle']
      const currentIndex = states.indexOf(currentState)
      const nextIndex = (currentIndex + 1) % states.length
      setCurrentState(states[nextIndex])
    }, 5000) // Change state every 5 seconds

    return () => clearTimeout(timer)
  }, [currentState])

  const config = stateConfig[currentState]

  return (
    <div className="face-container">
      <div className="face-layout">
        {/* Main Face Display */}
        <div className="face-main">
          <div className="face-card" style={{ borderColor: config.color }}>
            <div className={`face-emoji ${config.animation}`}>
              {config.emoji}
            </div>

            <div className="face-status">
              <div className="status-label" style={{ color: config.color }}>
                {config.label}
              </div>
              <div className="status-dot" style={{ backgroundColor: config.color }}></div>
            </div>

            <div className="face-message">
              {config.message}
            </div>

            {/* Mini Details */}
            <div className="face-details">
              <div className="detail-row">
                <span className="detail-icon">⏱️</span>
                <span className="detail-text">Session Active • 2h 14m</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🔗</span>
                <span className="detail-text">Connected • AWST (UTC+8)</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">💾</span>
                <span className="detail-text">Memory Updated • 12:34</span>
              </div>
            </div>
          </div>

          {/* Quick Control Button */}
          <button
            className="state-toggle"
            onClick={() => setShowStateList(!showStateList)}
          >
            {showStateList ? '✕ Close' : '⋮ States'}
          </button>
        </div>

        {/* State List (Sidebar) */}
        {showStateList && (
          <div className="state-list">
            <h3>Live States</h3>
            {Object.entries(stateConfig).map(([state, config]) => (
              <button
                key={state}
                className={`state-button ${currentState === state ? 'active' : ''}`}
                onClick={() => {
                  setCurrentState(state as FaceState)
                  setShowStateList(false)
                }}
                style={{
                  borderLeftColor: config.color,
                  backgroundColor:
                    currentState === state ? `${config.color}20` : 'transparent',
                }}
              >
                <span className="state-emoji">{config.emoji}</span>
                <span className="state-name">{config.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Notes */}
      <div className="face-footer">
        <p className="footer-note">
          <strong>Negan on the Desk</strong><br />
          Real-time state reflection. Live tracking coming soon.
        </p>
      </div>
    </div>
  )
}
