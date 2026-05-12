import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string; file: string }> }
) {
  const { code, file } = await params
  
  try {
    // Construct the file path safely
    const projectPath = path.join(process.cwd(), '..', 'projects', code, `${file}.md`)
    
    // Prevent directory traversal
    const realPath = path.resolve(projectPath)
    const projectsDir = path.resolve(path.join(process.cwd(), '..', 'projects'))
    
    if (!realPath.startsWith(projectsDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      )
    }
    
    // Read the file
    if (!fs.existsSync(realPath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }
    
    const content = fs.readFileSync(realPath, 'utf-8')
    
    return NextResponse.json({
      content,
      filename: `${file}.md`,
      code,
    })
  } catch (error) {
    console.error('Error reading file:', error)
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    )
  }
}
