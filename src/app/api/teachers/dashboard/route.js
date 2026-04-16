// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const className = searchParams.get('className');

//     if (!className) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'className is required',
//         },
//         { status: 400 }
//       );
//     }

//     const totalTeachers = await User.countDocuments({ role: 'TEACHER' });
//     const totalStudents = await User.countDocuments({
//       role: 'STUDENT',
//       className,
//     });

//     const totalSubmissions = await Submission.countDocuments({ className });

//     const submissionAgg = await Submission.aggregate([
//       {
//         $match: { className },
//       },
//       {
//         $group: {
//           _id: '$className',
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const submissionsByClass = {};
//     submissionAgg.forEach((item) => {
//       submissionsByClass[item._id] = item.count;
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         totalTeachers,
//         totalStudents,
//         totalSubmissions,
//         submissionsByClass,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('TEACHER DASHBOARD ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to load teacher dashboard stats',
//         totalTeachers: 0,
//         totalStudents: 0,
//         totalSubmissions: 0,
//         submissionsByClass: {},
//       },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const className = String(searchParams.get('className') || '').trim();

//     if (!className) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'className is required',
//         },
//         { status: 400 }
//       );
//     }

//     const totalTeachers = await User.countDocuments({
//       role: 'TEACHER',
//       className,
//     });

//     const students = await User.find(
//       { role: 'STUDENT', className },
//       {
//         _id: 1,
//         name: 1,
//         loginId: 1,
//         course: 1,
//         className: 1,
//         section: 1,
//       }
//     )
//       .sort({ name: 1 })
//       .lean();

//     const totalStudents = students.length;
//     const totalSubmissions = await Submission.countDocuments({ className });

//     const submissionAgg = await Submission.aggregate([
//       {
//         $match: { className },
//       },
//       {
//         $group: {
//           _id: '$courseName',
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ]);

//     const submissionsByCourse = {};
//     submissionAgg.forEach((item) => {
//       submissionsByCourse[item._id || 'Unknown'] = item.count;
//     });

//     const courseOptions = [...new Set(students.map((item) => item.course).filter(Boolean))];

//     return NextResponse.json(
//       {
//         success: true,
//         totalTeachers,
//         totalStudents,
//         totalSubmissions,
//         submissionsByCourse,
//         courseOptions,
//         students,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('TEACHER DASHBOARD ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to load teacher dashboard stats',
//         totalTeachers: 0,
//         totalStudents: 0,
//         totalSubmissions: 0,
//         submissionsByCourse: {},
//         courseOptions: [],
//         students: [],
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';
import Teacher from '@/models/teacher';
import Submission from '@/models/submission';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const loginId = String(searchParams.get('loginId') || '').trim();

    if (!loginId) {
      return NextResponse.json(
        { success: false, message: 'Teacher loginId is required' },
        { status: 400 }
      );
    }

    const teacherUser = await User.findOne({
      loginId,
      role: 'TEACHER',
    }).lean();

    if (!teacherUser) {
      return NextResponse.json(
        { success: false, message: 'Teacher not found' },
        { status: 404 }
      );
    }

    const teacherProfile = await Teacher.findOne({ userId: teacherUser._id }).lean();

    const course = teacherProfile?.course || teacherUser.course || '';
    const className = teacherProfile?.className || teacherUser.className || '';
    const section = teacherProfile?.section || teacherUser.section || '';
    const subject = teacherProfile?.subject || teacherUser.subject || '';

    if (!course || !className || !section) {
      return NextResponse.json(
        {
          success: true,
          totalStudents: 0,
          totalSubmissions: 0,
          submissionsByCourse: {},
          students: [],
          teacherInfo: {
            name: teacherUser.name,
            subject,
            course,
            className,
            section,
          },
          teacherAssignmentMissing: true,
          message: 'Teacher course/class/section is not assigned yet',
        },
        { status: 200 }
      );
    }

    const students = await User.find({
      role: 'STUDENT',
      course,
      className,
      section,
    })
      .select('-password')
      .sort({ name: 1 })
      .lean();

    const totalStudents = students.length;

    const submissions = await Submission.find({
      courseName: course,
      className,
      section,
    }).lean();

    const totalSubmissions = submissions.length;

    const submissionsByCourse = {};
    submissions.forEach((item) => {
      const key = item.courseName || 'Not Specified';
      submissionsByCourse[key] = (submissionsByCourse[key] || 0) + 1;
    });

    return NextResponse.json(
      {
        success: true,
        totalStudents,
        totalSubmissions,
        submissionsByCourse,
        students,
        teacherInfo: {
          name: teacherUser.name,
          subject,
          course,
          className,
          section,
        },
        teacherAssignmentMissing: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('TEACHER DASHBOARD ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to load teacher dashboard',
      },
      { status: 500 }
    );
  }
}