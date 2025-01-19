import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  // In a real application, you would validate the credentials against a database
  if (username === 'admin' && password === 'password') {
    cookies().set('auth', 'true', { httpOnly: true, secure: true })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}

