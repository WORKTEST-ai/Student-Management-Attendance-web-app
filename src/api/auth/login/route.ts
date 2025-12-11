// IMPORTANT: This file should be in src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import crypto from 'crypto';
import { loadTeachers, loadStudents, getAdminCredentials } from '@/lib/credentials';
import { signToken } from '@/lib/jwt';

// Use a constant-time comparison function to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  
  const aLen = Buffer.byteLength(a);
  const bLen = Buffer.byteLength(b);
  
  // Create buffers of the same size for a constant-time comparison.
  // The size is the maximum of the two lengths to avoid leaking length information.
  const bufA = Buffer.alloc(Math.max(aLen, bLen), 0);
  bufA.write(a);
  const bufB = Buffer.alloc(Math.max(aLen, bLen), 0);
  bufB.write(b);

  // timingSafeEqual returns true if the two buffers are of the same length
  // and their contents are equal. It is designed to run in constant time
  // to prevent timing attacks.
  return crypto.timingSafeEqual(bufA, bufB) && aLen === bLen;
}


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    // 1. Admin Check
    const admin = getAdminCredentials();
    if (admin.email && safeCompare(email, admin.email)) {
      if (safeCompare(password, admin.password)) {
        const payload = { role: 'Admin', email, name: 'Admin User' };
        const token = await signToken(payload);
        const cookie = serialize('auth', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            path: '/', 
            maxAge: 60 * 60, // 1 hour
        });
        return NextResponse.json({ success: true, role: 'Admin', redirect: '/dashboard' }, {
          headers: { 'Set-Cookie': cookie },
        });
      }
    }

    // 2. Teacher Check
    const TEACHER_EMAIL = process.env.TEACHER_EMAIL;
    if (TEACHER_EMAIL && safeCompare(email, TEACHER_EMAIL)) {
        const teachers = await loadTeachers();
        const foundTeacher = teachers.find(t => safeCompare(password, t.password));

        if (foundTeacher) {
            const payload = { role: 'Teacher', email, teacherId: foundTeacher.id, name: foundTeacher.name };
            const token = await signToken(payload);
            const cookie = serialize('auth', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 });
            return NextResponse.json({ success: true, role: 'Teacher', redirect: '/dashboard' }, {
              headers: { 'Set-Cookie': cookie },
            });
        }
    }

    // 3. Student Check
    const students = await loadStudents();
    const foundStudent = students.find(s => safeCompare(s.email, email) && safeCompare(s.password, password));

    if (foundStudent) {
        const payload = { role: 'Student', email, name: foundStudent.name || `Student ${foundStudent.email}` };
        const token = await signToken(payload);
        const cookie = serialize('auth', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 });
        return NextResponse.json({ success: true, role: 'Student', redirect: '/dashboard' }, {
          headers: { 'Set-Cookie': cookie },
        });
    }

    // 4. If no user is found after all checks
    return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
