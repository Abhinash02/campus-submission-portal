import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';
import Student from '@/models/student';

export async function POST(req) {
  try {
    await connectDB();

    const {
      name,
      loginId,
      password,
      email,
      rollNo,
      course,
      className,
      section,
      createdBy,
      creatorRole,
    } = await req.json();

    if (!createdBy || !creatorRole) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized request' },
        { status: 401 }
      );
    }

    if (!['ADMIN', 'TEACHER'].includes(creatorRole)) {
      return NextResponse.json(
        { success: false, message: 'Only admin or teacher can create student' },
        { status: 403 }
      );
    }

    const existingUser = await User.findOne({ loginId });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Login ID already exists' },
        { status: 400 }
      );
    }

    const existingRoll = await Student.findOne({ rollNumber: rollNo });
    if (existingRoll) {
      return NextResponse.json(
        { success: false, message: 'Roll number already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      loginId,
      password,
      role: 'STUDENT',
      email: email || '',
      course,
      className,
      section,
      createdBy: String(createdBy),
    });

    const student = await Student.create({
      userId: user._id,
      studentName: name,
      rollNumber: rollNo,
      course,
      className,
      section,
    });

    return NextResponse.json({
      success: true,
      message: 'Student created successfully',
      student,
    });
  } catch (error) {
    console.error('CREATE STUDENT ERROR:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create student' },
      { status: 500 }
    );
  }
}