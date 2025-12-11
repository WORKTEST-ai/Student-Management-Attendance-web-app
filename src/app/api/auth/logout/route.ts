import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // To log out, we clear the 'auth' cookie by setting its maxAge to -1.
  const cookie = serialize('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: -1, // Expire the cookie immediately
  });

  return NextResponse.json({ success: true, message: 'Logged out successfully' }, {
    headers: { 'Set-Cookie': cookie },
  });
}
