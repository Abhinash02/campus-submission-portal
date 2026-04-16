import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';

export async function GET() {
  try {
    await connectDB();

    const teachers = await User.find(
      { role: 'TEACHER' },
      { _id: 1, name: 1, loginId: 1, subject: 1, className: 1 }
    ).sort({ name: 1 });

    return NextResponse.json(
      {
        success: true,
        teachers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET TEACHERS ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch teachers',
        error: error.message,
      },
      { status: 500 }
    );
  }
}