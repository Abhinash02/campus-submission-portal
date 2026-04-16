import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';
import Submission from '@/models/submission';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json(
        {
          success: false,
          message: 'className is required',
        },
        { status: 400 }
      );
    }

    const totalTeachers = await User.countDocuments({ role: 'TEACHER' });
    const totalStudents = await User.countDocuments({
      role: 'STUDENT',
      className,
    });

    const totalSubmissions = await Submission.countDocuments({ className });

    const submissionAgg = await Submission.aggregate([
      {
        $match: { className },
      },
      {
        $group: {
          _id: '$className',
          count: { $sum: 1 },
        },
      },
    ]);

    const submissionsByClass = {};
    submissionAgg.forEach((item) => {
      submissionsByClass[item._id] = item.count;
    });

    return NextResponse.json(
      {
        success: true,
        totalTeachers,
        totalStudents,
        totalSubmissions,
        submissionsByClass,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('TEACHER DASHBOARD ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load teacher dashboard stats',
        totalTeachers: 0,
        totalStudents: 0,
        totalSubmissions: 0,
        submissionsByClass: {},
      },
      { status: 500 }
    );
  }
}