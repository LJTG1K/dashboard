import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

let subagentState = {
  count: 0,
  lastUpdated: Date.now(),
}

const INTERNAL_API_KEY = 'negan-face-internal-api'

function hasValidInternalKey(request: NextRequest): boolean {
  const key = request.headers.get('x-negan-key')
  return key === INTERNAL_API_KEY
}

export async function GET(request: NextRequest) {
  // Allow requests with internal API key
  if (!hasValidInternalKey(request)) {
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
  // Allow requests with internal API key
  if (!hasValidInternalKey(request)) {
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
