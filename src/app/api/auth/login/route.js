import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/mongodb/db';
import User from '@/models/user';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const loginId = String(body.loginId || '').trim();
    const password = String(body.password || '').trim();

    if (!loginId || !password) {
      return NextResponse.json(
        { message: 'Login ID and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ loginId });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          loginId: user.loginId,
          role: user.role,
          email: user.email,
          course: user.course || '',
          className: user.className || '',
          section: user.section || '',
          subject: user.subject || '',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return NextResponse.json(
      { message: 'Server error during login', error: error.message },
      { status: 500 }
    );
  }
}