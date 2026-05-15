import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

let subagentState = {
  count: 0,
  lastUpdated: Date.now(),
}

function isLocalhost(request: NextRequest): boolean {
  const host = request.headers.get('host') || ''
  const forwarded = request.headers.get('x-forwarded-for')
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : ''
  
  return (
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    clientIp === '127.0.0.1' ||
    clientIp.startsWith('::1')
  )
}

export async function GET(request: NextRequest) {
  // Allow localhost requests to bypass auth
  if (!isLocalhost(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const stateFilePath = path.join(process.cwd(), '.subagent-state.json')
    let state = subagentState
    
    try {
      if (fs.existsSync(stateFilePath)) {
        const fileContent = fs.readFileSync(stateFilePath, 'utf-8')
        state = JSON.parse(fileContent)
      }
    } catch (e) {
      // Use in-memory state if file read fails
    }
    
    // Consider subagents "stale" if not updated in 10 seconds
    const isStale = Date.now() - state.lastUpdated > 10000
    const activeCount = isStale ? 0 : state.count
    
    return NextResponse.json({
      status: activeCount > 0 ? 'running' : 'idle',
      count: activeCount,
    })
  } catch (error) {
    console.error('Error in subagents endpoint:', error)
    
    return NextResponse.json({
      status: 'idle',
      count: 0,
    })
  }
}

export async function POST(request: NextRequest) {
  // Allow localhost requests to bypass auth
  if (!isLocalhost(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()
    
    subagentState = {
      count: body.count ?? 0,
      lastUpdated: Date.now(),
    }
    
    const stateFilePath = path.join(process.cwd(), '.subagent-state.json')
    try {
      fs.writeFileSync(stateFilePath, JSON.stringify(subagentState))
    } catch (e) {
      // Silently fail if we can't write
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subagent state' }, { status: 400 })
  }
}
