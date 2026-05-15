'use client'

import { useState, useEffect, useRef } from 'react'
import './face.css'

type FaceState =
  | 'happy'
  | 'very_happy'
  | 'laughing'
  | 'sad'
  | 'crying'
  | 'surprised'
  | 'shocked'
  | 'thinking'
  | 'confused'
  | 'skeptical'
  | 'angry'
  | 'annoyed'
  | 'winking'
  | 'silly'
  | 'cool'
  | 'neutral'
  | 'tired'
  | 'content'
  | 'disappointed'
  | 'nervous'
  | 'embarrassed'
  | 'tongue_out'
  | 'kiss'
  | 'drooling'
  | 'smirk'
  | 'unimpressed'

const stateConfig = {
  happy: { text: ':)' },
  very_happy: { text: ':D' },
  laughing: { text: 'XD' },
  sad: { text: ':(' },
  crying: { text: 'T_T' },
  surprised: { text: ':O' },
  shocked: { text: 'o_o' },
  thinking: { text: ':|' },
  confused: { text: ':S' },
  skeptical: { text: ':/' },
  angry: { text: '>:(' },
  annoyed: { text: ':@' },
  winking: { text: ';)' },
  silly: { text: ':P' },
  cool: { text: 'B)' },
  neutral: { text: ':-]' },
  tired: { text: '-_-' },
  content: { text: '^_^' },
  disappointed: { text: ':v' },
  nervous: { text: '^_^;' },
  embarrassed: { text: '^^;' },
  tongue_out: { text: 'XP' },
  kiss: { text: ':*' },
  drooling: { text: ':~)' },
  smirk: { text: ':-}' },
  unimpressed: { text: '>.>' },
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
      const states = Object.keys(stateConfig) as FaceState[]
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
          <div className="face-card">
            <div className="face-text">{config.text}</div>
          </div>

          {!isFullscreen && (
            <button className="fullscreen-toggle" onClick={toggleFullscreen} title="Enter fullscreen">
              ⛶ Fullscreen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
