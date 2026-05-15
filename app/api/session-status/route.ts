import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Call openclaw status to get session info
    const { stdout } = await execAsync('openclaw status --json 2>/dev/null || openclaw status 2>/dev/null')
    
    // Parse the output - if it's JSON, parse it; otherwise extract info
    let sessionInfo: any = {}
    
    try {
      sessionInfo = JSON.parse(stdout)
    } catch {
      // Fallback: extract basic info from text output
      const runningMatch = stdout.match(/running|active/i)
      sessionInfo = {
        status: runningMatch ? 'running' : 'idle',
        model: 'anthropic/claude-haiku-4-5',
      }
    }

    // Calculate session time (rough estimate from uptime if available)
    const uptime = process.uptime()
    
    return NextResponse.json({
      status: sessionInfo.status || 'idle',
      model: sessionInfo.model || 'anthropic/claude-haiku-4-5',
      sessionTime: Math.floor(uptime),
      currentTask: sessionInfo.task || null,
      lastMessageTime: Date.now() - (Math.random() * 10000), // Demo: random recent time
    })
  } catch (error) {
    console.error('Error fetching session status:', error)
    
    // Return fallback on error
    return NextResponse.json({
      status: 'idle',
      model: 'anthropic/claude-haiku-4-5',
      sessionTime: 0,
      currentTask: null,
      lastMessageTime: null,
    })
  }
}
