'use client'

import { useState, useEffect, useRef } from 'react'
import './face.css'

type FaceState = 'thinking' | 'waiting' | 'deploying' | 'typing' | 'listening' | 'alert' | 'idle'

interface SessionStatus {
  status: 'running' | 'waiting' | 'idle'
  lastMessageTime?: number
  currentTask?: string
  model?: string
  sessionTime?: number
  subagentCount?: number
}

interface SubagentInfo {
  status: 'running' | 'completed' | 'failed'
  count: number
}

const determineState = (
  sessionStatus: SessionStatus | null,
  subagentInfo: SubagentInfo | null,
  isWaitingOnUser: boolean
): FaceState => {
  // If offline, idle
  if (!sessionStatus || sessionStatus.status === 'offline') return 'idle'

  // Priority 1: If subagents running, deploying
  if (subagentInfo?.count ?? 0 > 0) return 'deploying'

  // Priority 2: If waiting on user, waiting
  if (isWaitingOnUser) return 'waiting'

  // Priority 3: If status is running/processing, thinking
  if (sessionStatus.status === 'running') return 'thinking'

  // Priority 4: Check if message was just sent (typing state)
  const now = Date.now()
  if (sessionStatus.lastMessageTime) {
    const timeSinceMessage = now - sessionStatus.lastMessageTime
    // Show typing for 5 seconds after a message
    if (timeSinceMessage < 5000) {
      return 'typing'
    }
    // Show waiting if it's been >30 seconds since last activity
    if (timeSinceMessage > 30000) {
      return 'waiting'
    }
  }

  // Default to listening (idle but ready)
  return 'listening'
}

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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sessionStatus, setSessionStatus] = useState<SessionStatus | null>(null)
  const [subagentInfo, setSubagentInfo] = useState<SubagentInfo | null>(null)
  const [isWaitingOnUser, setIsWaitingOnUser] = useState(false)
  const [lastUserMessageTime, setLastUserMessageTime] = useState<number | null>(null)
  const [statusText, setStatusText] = useState('Connecting...')
  const containerRef = useRef<HTMLDivElement>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Poll for real session status every 2 seconds
  useEffect(() => {
    const pollSessionStatus = async () => {
      try {
        // Fetch session status via API
        const response = await fetch('/api/session-status')
        if (!response.ok) throw new Error('Failed to fetch session status')
        
        const data: SessionStatus = await response.json()
        setSessionStatus(data)

        // Update status text
        if (data.currentTask) {
          setStatusText(data.currentTask)
        } else {
          setStatusText(`Session active • ${data.sessionTime ? Math.floor(data.sessionTime / 60) : 0}m`)
        }
      } catch (error) {
        console.error('Error polling session status:', error)
        setStatusText('Offline')
      }
    }

    const pollSubagents = async () => {
      try {
        const response = await fetch('/api/subagents')
        if (!response.ok) throw new Error('Failed to fetch subagents')
        
        const data: SubagentInfo = await response.json()
        setSubagentInfo(data)
      } catch (error) {
        console.error('Error polling subagents:', error)
      }
    }

    // Initial poll
    pollSessionStatus()
    pollSubagents()

    // Set up interval
    pollIntervalRef.current = setInterval(() => {
      pollSessionStatus()
      pollSubagents()
    }, 2000)

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
    }
  }, [])

  // Determine state based on real data
  useEffect(() => {
    const newState = determineState(sessionStatus, subagentInfo, isWaitingOnUser)
    setCurrentState(newState)
  }, [sessionStatus, subagentInfo, isWaitingOnUser])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen()
          setIsFullscreen(true)
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen()
          setIsFullscreen(false)
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const config = stateConfig[currentState]
  
  // Format session details
  const sessionTimeStr = sessionStatus?.sessionTime
    ? `${Math.floor(sessionStatus.sessionTime / 3600)}h ${Math.floor((sessionStatus.sessionTime % 3600) / 60)}m`
    : 'N/A'

  return (
    <div className={`face-container ${isFullscreen ? 'fullscreen-mode' : ''}`} ref={containerRef}>
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
              {statusText || config.message}
            </div>

            {/* Mini Details */}
            <div className="face-details">
              <div className="detail-row">
                <span className="detail-icon">⏱️</span>
                <span className="detail-text">Session • {sessionTimeStr}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🔗</span>
                <span className="detail-text">{sessionStatus ? '🟢 Live' : '⚫ Offline'} • AWST (UTC+8)</span>
              </div>
              {subagentInfo && subagentInfo.count > 0 && (
                <div className="detail-row">
                  <span className="detail-icon">🚀</span>
                  <span className="detail-text">{subagentInfo.count} subagent{subagentInfo.count !== 1 ? 's' : ''} running</span>
                </div>
              )}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="control-buttons">
            <button
              className="state-toggle"
              onClick={() => setShowStateList(!showStateList)}
              title="Toggle state list"
            >
              {showStateList ? '✕ Close' : '⋮ States'}
            </button>
            <button
              className="fullscreen-toggle"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? '⤡ Exit FS' : '⛶ Fullscreen'}
            </button>
          </div>
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
      {!isFullscreen && (
        <div className="face-footer">
          <p className="footer-note">
            <strong>Negan on the Desk</strong><br />
            Real-time state reflection. Live tracking coming soon.
          </p>
        </div>
      )}
    </div>
  )
}
