import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correctPassword = process.env.DASHBOARD_PASSWORD

  if (!correctPassword) {
    console.error('DASHBOARD_PASSWORD not set in environment')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true })
    
    // Set a secure httpOnly cookie (expires in 7 days)
    response.cookies.set({
      name: 'auth_token',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  }

  return NextResponse.json(
    { error: 'Invalid password' },
    { status: 401 }
  )
}
