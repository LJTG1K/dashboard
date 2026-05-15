import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Call openclaw subagents list to get active subagents
    const { stdout } = await execAsync('openclaw subagents list 2>/dev/null || echo ""')
    
    // Parse the output to count running subagents
    // Expected format: list of subagents with status indicators
    const lines = stdout.split('\n').filter(line => line.trim())
    
    // Count running subagents (simple heuristic: any line with a status)
    const runningCount = lines.filter(
      line => line.includes('running') || line.includes('active') || line.includes('processing')
    ).length

    return NextResponse.json({
      status: runningCount > 0 ? 'running' : 'idle',
      count: runningCount,
    })
  } catch (error) {
    console.error('Error fetching subagents:', error)
    
    // Return fallback on error
    return NextResponse.json({
      status: 'idle',
      count: 0,
    })
  }
}
