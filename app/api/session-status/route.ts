import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Simple in-memory store for session state (resets on deploy)
let sessionState = {
  lastActivityTime: Date.now(),
  isProcessing: false,
  currentTask: null as string | null,
}

export async function GET() {
  try {
    // Try to read from a persistent state file if it exists
    const stateFilePath = path.join(process.cwd(), '.session-state.json')
    let state = sessionState
    
    try {
      if (fs.existsSync(stateFilePath)) {
        const fileContent = fs.readFileSync(stateFilePath, 'utf-8')
        state = JSON.parse(fileContent)
      }
    } catch (e) {
      // Use in-memory state if file read fails
    }

    // Check if OpenClaw is running by looking for process
    const isRunning = process.uptime() > 0 // Simplified: process is running if uptime > 0
    
    return NextResponse.json({
      status: state.isProcessing ? 'running' : (isRunning ? 'idle' : 'offline'),
      model: 'anthropic/claude-haiku-4-5',
      sessionTime: Math.floor(process.uptime() * 1000), // Convert to milliseconds
      currentTask: state.currentTask,
      lastMessageTime: state.lastActivityTime,
      isAlive: true,
    })
  } catch (error) {
    console.error('Error in session status:', error)
    
    return NextResponse.json({
      status: 'offline',
      model: 'anthropic/claude-haiku-4-5',
      sessionTime: 0,
      currentTask: null,
      lastMessageTime: null,
      isAlive: false,
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Update session state
    sessionState = {
      lastActivityTime: body.lastActivityTime || Date.now(),
      isProcessing: body.isProcessing ?? false,
      currentTask: body.currentTask || null,
    }
    
    // Try to persist to file
    const stateFilePath = path.join(process.cwd(), '.session-state.json')
    try {
      fs.writeFileSync(stateFilePath, JSON.stringify(sessionState))
    } catch (e) {
      // Silently fail if we can't write to file
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update session state' }, { status: 400 })
  }
}
