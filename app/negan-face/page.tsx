'use client'

import { useState, useEffect, useRef } from 'react'
import './face.css'

type FaceState = 'happy' | 'surprised' | 'sad' | 'thinking'

const stateConfig = {
  happy: {
    text: ':)',
    label: 'HAPPY',
    color: '#10B981',
  },
  surprised: {
    text: ':O',
    label: 'SURPRISED',
    color: '#06B6D4',
  },
  sad: {
    text: ':(',
    label: 'SAD',
    color: '#EF4444',
  },
  thinking: {
    text: ':|',
    label: 'THINKING',
    color: '#FFB84D',
  },
}

const getRandomDelay = () => {
  return Math.random() * 4000 + 2000 // 2-6 seconds
}

export default function NeganFace() {
  const [currentState, setCurrentState] = useState<FaceState>('happy')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Random state cycling
  useEffect(() => {
    const changeState = () => {
      const states: FaceState[] = ['happy', 'surprised', 'sad', 'thinking']
      const randomIndex = Math.floor(Math.random() * states.length)
      setCurrentState(states[randomIndex])
    }

    const delay = getRandomDelay()
    const timer = setTimeout(changeState, delay)

    return () => clearTimeout(timer)
  }, [currentState])

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

  return (
    <div className={`face-container ${isFullscreen ? 'fullscreen-mode' : ''}`} ref={containerRef}>
      <div className="face-layout">
        <div className="face-main">
          <div className="face-card" style={{ borderColor: config.color }}>
            <div className="face-text" style={{ color: config.color }}>
              {config.text}
            </div>

            <div className="face-status">
              <div className="status-label" style={{ color: config.color }}>
                {config.label}
              </div>
              <div className="status-dot" style={{ backgroundColor: config.color }}></div>
            </div>
          </div>

          <button
            className="fullscreen-toggle"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? '⤡ Exit FS' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>

      {!isFullscreen && (
        <div className="face-footer">
          <p className="footer-note">
            <strong>Negan on the Desk</strong><br />
            Emoticon mood indicator
          </p>
        </div>
      )}
    </div>
  )
}
