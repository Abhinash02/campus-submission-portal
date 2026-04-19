import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/mongodb/db';
import User from '@/models/user';

export async function GET() {
  try {
    await connectDB();

    await User.deleteOne({ loginId: 'admin' });

    const hashedPassword = await bcrypt.hash('123456', 10);

    const admin = await User.create({
      name: 'Admin',
      loginId: 'admin',
      password: 123456,
      role: 'ADMIN',
      email: 'admin@gmail.com',
    });

    return NextResponse.json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        loginId: admin.loginId,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('SEED ADMIN ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to seed admin', error: error.message },
      { status: 500 }
    );
  }
}