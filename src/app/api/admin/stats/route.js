import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';
import Submission from '@/models/submission';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const studentsByCourseAgg = await User.aggregate([
      {
        $match: {
          role: 'STUDENT',
          course: { $exists: true, $ne: '' },
        },
      },
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const studentsByCourse = {};
    studentsByCourseAgg.forEach((item) => {
      studentsByCourse[item._id] = item.count;
    });

    const totalTeachers = await User.countDocuments({ role: 'TEACHER' });
    const totalStudents = await User.countDocuments({ role: 'STUDENT' });
    const totalSubmissions = await Submission.countDocuments();

    return NextResponse.json(
      {
        success: true,
        studentsByCourse,
        totalTeachers,
        totalStudents,
        totalSubmissions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('ADMIN STATS ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load dashboard stats',
        studentsByCourse: {},
        totalTeachers: 0,
        totalStudents: 0,
        totalSubmissions: 0,
      },
      { status: 500 }
    );
  }
}