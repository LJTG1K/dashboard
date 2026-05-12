import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string; file: string }> }
) {
  try {
    const { code, file } = await params
    
    // Security: Only allow .md files
    if (!file.endsWith('.md')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }
    
    // Security: Prevent directory traversal
    if (code.includes('..') || code.includes('/') || file.includes('..')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }
    
    // Try to read file from projects directory (one level up from dashboard)
    let filePath: string
    
    // Try multiple possible paths
    const possiblePaths = [
      resolve(process.cwd(), '..', 'projects', code, file),
      resolve('/data/.openclaw/workspace/projects', code, file),
      resolve(process.cwd(), 'projects', code, file),
    ]
    
    let content: string | null = null
    
    for (const path of possiblePaths) {
      if (existsSync(path)) {
        try {
          content = readFileSync(path, 'utf-8')
          filePath = path
          break
        } catch (e) {
          // Continue to next path
        }
      }
    }
    
    if (!content) {
      return NextResponse.json(
        { error: `File not found: ${code}/${file}` },
        { status: 404 }
      )
    }
    
    // Return as downloadable file
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${code}_${file}"`,
        'Content-Length': String(Buffer.byteLength(content)),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    )
  }
}
