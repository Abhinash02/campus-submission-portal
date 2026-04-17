// // app/api/assignments/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';
// import Submission from '@/models/submission';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       studentId,
//       teacherId,
//       title,
//       description,
//       className,
//       courseName,
//       section,
//       // fileUrl, fileName, if you store them
//     } = body;

//     if (!studentId || !teacherId || !title || !courseName || !section || !className) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Missing required fields',
//         },
//         { status: 400 }
//       );
//     }

//     const student = await User.findById(studentId).lean();
//     const teacher = await User.findById(teacherId).lean();

//     if (!student || student.role !== 'STUDENT') {
//       return NextResponse.json(
//         { success: false, message: 'Invalid student' },
//         { status: 400 }
//       );
//     }

//     if (!teacher || teacher.role !== 'TEACHER') {
//       return NextResponse.json(
//         { success: false, message: 'Invalid teacher' },
//         { status: 400 }
//       );
//     }

//     await Submission.create({
//       studentId,
//       studentName: student.name,
//       studentLoginId: student.loginId,
//       teacherId,
//       teacherName: teacher.name,
//       teacherLoginId: teacher.loginId,
//       title,
//       description,
//       // fileUrl: fileUrl || '',
//       // fileName: fileName || '',
//       className,
//       courseName,
//       section,
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Assignment submitted successfully',
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('CREATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to submit assignment',
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import Submission from '@/models/submission';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const studentId = String(body.studentId || '').trim();
    const teacherId = String(body.teacherId || '').trim();
    const title = String(body.title || '').trim();
    const description = String(body.description || '').trim();
    const className = String(body.className || '').trim();
    const courseName = String(body.courseName || '').trim();
    const section = String(body.section || '').trim();
    const fileName = String(body.fileName || '').trim();
    const fileUrl = String(body.fileUrl || '').trim();
    const subject = String(body.subject || '').trim();

    if (!studentId || !teacherId || !title || !className || !courseName || !section) {
      return NextResponse.json(
        {
          success: false,
          message: 'studentId, teacherId, title, className, courseName and section are required',
        },
        { status: 400 }
      );
    }

    const student = await User.findById(studentId).lean();
    if (!student || student.role !== 'STUDENT') {
      return NextResponse.json(
        { success: false, message: 'Invalid student' },
        { status: 404 }
      );
    }

    const teacher = await User.findById(teacherId).lean();
    if (!teacher || teacher.role !== 'TEACHER') {
      return NextResponse.json(
        { success: false, message: 'Invalid teacher' },
        { status: 404 }
      );
    }

    const submission = await Submission.create({
      studentId: student._id,
      studentName: student.name || '',
      studentLoginId: student.loginId || '',
      teacherId: teacher._id,
      teacherName: teacher.name || '',
      teacherLoginId: teacher.loginId || '',
      title,
      subject: subject || teacher.subject || '',
      description,
      fileName,
      fileUrl,
      className,
      courseName,
      section,
      status: 'Submitted',
      marks: 0,
      feedback: '',
      reviewedBy: '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Assignment submitted successfully',
        submission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE ASSIGNMENT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to submit assignment',
      },
      { status: 500 }
    );
  }
}