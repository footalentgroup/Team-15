import { NextResponse } from 'next/server'
import { refreshToken } from '@/actions/authActions'

export async function POST() {
  try {
    const updatedUserData = await refreshToken()

    const response = NextResponse.json({ success: true, data: updatedUserData })
    response.cookies.set('user', JSON.stringify(updatedUserData), {
      httpOnly: true,
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: error })
  }
}
