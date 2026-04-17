// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const teacherId = String(searchParams.get('teacherId') || '').trim();
//     const search = String(searchParams.get('search') || '').trim();
//     const courseName = String(searchParams.get('courseName') || '').trim();
//     const status = String(searchParams.get('status') || '').trim();
//     const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
//     const limit = Math.max(parseInt(searchParams.get('limit') || '5', 10), 1);
//     const skip = (page - 1) * limit;

//     if (!teacherId) {
//       return NextResponse.json(
//         { success: false, message: 'teacherId is required' },
//         { status: 400 }
//       );
//     }

//     const teacher = await User.findById(teacherId).select('-password').lean();

//     if (!teacher || teacher.role !== 'TEACHER') {
//       return NextResponse.json(
//         { success: false, message: 'Teacher not found' },
//         { status: 404 }
//       );
//     }

//     const query = {
//       teacherId,
//     };

//     if (courseName) {
//       query.courseName = courseName;
//     }

//     if (status) {
//       query.status = status;
//     }

//     if (search) {
//       query.$or = [
//         { studentName: { $regex: search, $options: 'i' } },
//         { studentLoginId: { $regex: search, $options: 'i' } },
//         { title: { $regex: search, $options: 'i' } },
//       ];
//     }

//     const total = await Submission.countDocuments(query);

//     const submissions = await Submission.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const courseOptionsAgg = await Submission.distinct('courseName', { teacherId });
//     const courseOptions = courseOptionsAgg.filter(Boolean).sort();

//     return NextResponse.json(
//       {
//         success: true,
//         teacher,
//         submissions,
//         courseOptions,
//         pagination: {
//           total,
//           totalPages: Math.max(Math.ceil(total / limit), 1),
//           currentPage: page,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import User from '@/models/user';

// export const dynamic = 'force-dynamic';

// // export async function GET(req) {
// //   try {
// //     await connectDB();

// //     const { searchParams } = new URL(req.url);

// //     const teacherId = String(searchParams.get('teacherId') || '').trim();
// //     const search = String(searchParams.get('search') || '').trim();
// //     const courseName = String(searchParams.get('courseName') || '').trim();
// //     const status = String(searchParams.get('status') || '').trim();
// //     const page = Math.max(1, Number(searchParams.get('page') || 1));
// //     const limit = Math.max(1, Number(searchParams.get('limit') || 5));
// //     const skip = (page - 1) * limit;

// //     if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
// //       return NextResponse.json(
// //         { success: false, message: 'Valid teacherId is required' },
// //         { status: 400 }
// //       );
// //     }

// //     const teacher = await User.findById(teacherId).select('-password').lean();

// //     if (!teacher) {
// //       return NextResponse.json(
// //         { success: false, message: 'Teacher not found' },
// //         { status: 404 }
// //       );
// //     }

// //     if (String(teacher.role || '').toUpperCase() !== 'TEACHER') {
// //       return NextResponse.json(
// //         { success: false, message: 'Access denied. Teachers only.' },
// //         { status: 403 }
// //       );
// //     }

// //     const query = {
// //       teacherId: new mongoose.Types.ObjectId(teacherId),
// //     };

// //     if (search) {
// //       query.$or = [
// //         { studentName: { $regex: search, $options: 'i' } },
// //         { studentLoginId: { $regex: search, $options: 'i' } },
// //         { title: { $regex: search, $options: 'i' } },
// //       ];
// //     }

// //     if (courseName) {
// //       query.courseName = courseName;
// //     }

// //     if (status) {
// //       query.status = status;
// //     }

// //     const [submissions, total, courseAgg] = await Promise.all([
// //       Submission.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
// //       Submission.countDocuments(query),
// //       Submission.aggregate([
// //         { $match: { teacherId: new mongoose.Types.ObjectId(teacherId) } },
// //         { $group: { _id: '$courseName' } },
// //         { $sort: { _id: 1 } },
// //       ]),
// //     ]);

// //     const courseOptions = courseAgg.map((item) => item._id).filter(Boolean);

// //     return NextResponse.json(
// //       {
// //         success: true,
// //         teacher,
// //         submissions,
// //         courseOptions,
// //         pagination: {
// //           total,
// //           totalPages: Math.ceil(total / limit) || 1,
// //           currentPage: page,
// //         },
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error('GET SUBMISSIONS ERROR:', error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: error?.message || 'Failed to fetch submissions',
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const teacherId = String(searchParams.get('teacherId') || '').trim();
//     const studentLoginId = String(searchParams.get('studentLoginId') || '').trim();
//     const search = String(searchParams.get('search') || '').trim();
//     const courseName = String(searchParams.get('courseName') || '').trim();
//     const status = String(searchParams.get('status') || '').trim();
//     const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
//     const limit = Math.min(
//       Math.max(1, parseInt(searchParams.get('limit') || '5', 10)),
//       20
//     );
//     const skip = (page - 1) * limit;

//     const query = {};

//     // Student-side submissions view
//     if (studentLoginId) {
//       query.studentLoginId = studentLoginId;
//     }

//     // Teacher-side submissions view
//     let teacher = null;

//     if (teacherId) {
//       if (!mongoose.Types.ObjectId.isValid(teacherId)) {
//         return NextResponse.json(
//           { success: false, message: 'Valid teacherId is required' },
//           { status: 400 }
//         );
//       }

//       teacher = await User.findById(teacherId).select('-password').lean();

//       if (!teacher) {
//         return NextResponse.json(
//           { success: false, message: 'Teacher not found' },
//           { status: 404 }
//         );
//       }

//       if (String(teacher.role || '').toUpperCase() !== 'TEACHER') {
//         return NextResponse.json(
//           { success: false, message: 'Access denied. Teachers only.' },
//           { status: 403 }
//         );
//       }

//       query.teacherId = new mongoose.Types.ObjectId(teacherId);
//     }

//     if (!teacherId && !studentLoginId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'teacherId or studentLoginId is required',
//         },
//         { status: 400 }
//       );
//     }

//     if (search) {
//       query.$or = [
//         { studentName: { $regex: search, $options: 'i' } },
//         { studentLoginId: { $regex: search, $options: 'i' } },
//         { title: { $regex: search, $options: 'i' } },
//       ];
//     }

//     if (courseName) {
//       query.courseName = courseName;
//     }

//     if (status) {
//       query.status = status;
//     }

//     const [submissions, total, courseAgg] = await Promise.all([
//       Submission.find(query)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Submission.countDocuments(query),
//       teacherId
//         ? Submission.aggregate([
//             { $match: { teacherId: new mongoose.Types.ObjectId(teacherId) } },
//             { $group: { _id: '$courseName' } },
//             { $sort: { _id: 1 } },
//           ])
//         : Promise.resolve([]),
//     ]);

//     const courseOptions = courseAgg.map((item) => item._id).filter(Boolean);

//     return NextResponse.json(
//       {
//         success: true,
//         teacher,
//         submissions,
//         courseOptions,
//         pagination: {
//           total,
//           totalPages: Math.ceil(total / limit) || 1,
//           currentPage: page,
//           itemsPerPage: limit,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || 'Failed to fetch submissions',
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const studentId = String(body.studentId || '').trim();
//     const studentName = String(body.studentName || '').trim();
//     const studentLoginId = String(body.studentLoginId || '').trim();
//     const teacherId = String(body.teacherId || '').trim();
//     const teacherName = String(body.teacherName || '').trim();
//     const teacherLoginId = String(body.teacherLoginId || '').trim();
//     const title = String(body.title || '').trim();
//     const subject = String(body.subject || '').trim();
//     const description = String(body.description || '').trim();
//     const fileName = String(body.fileName || '').trim();
//     const fileUrl = String(body.fileUrl || '').trim();
//     const className = String(body.className || '').trim();
//     const courseName = String(body.courseName || '').trim();
//     const section = String(body.section || '').trim();

//     if (
//       !studentId ||
//       !studentName ||
//       !studentLoginId ||
//       !teacherId ||
//       !title
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             'studentId, studentName, studentLoginId, teacherId and title are required',
//         },
//         { status: 400 }
//       );
//     }

//     if (!mongoose.Types.ObjectId.isValid(studentId)) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid studentId' },
//         { status: 400 }
//       );
//     }

//     if (!mongoose.Types.ObjectId.isValid(teacherId)) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid teacherId' },
//         { status: 400 }
//       );
//     }

//     const [student, teacher] = await Promise.all([
//       User.findById(studentId).lean(),
//       User.findById(teacherId).lean(),
//     ]);

//     if (!student) {
//       return NextResponse.json(
//         { success: false, message: 'Student not found' },
//         { status: 404 }
//       );
//     }

//     if (!teacher) {
//       return NextResponse.json(
//         { success: false, message: 'Teacher not found' },
//         { status: 404 }
//       );
//     }

//     if (String(student.role || '').toUpperCase() !== 'STUDENT') {
//       return NextResponse.json(
//         { success: false, message: 'Invalid student account' },
//         { status: 403 }
//       );
//     }

//     if (String(teacher.role || '').toUpperCase() !== 'TEACHER') {
//       return NextResponse.json(
//         { success: false, message: 'Invalid teacher account' },
//         { status: 403 }
//       );
//     }

//     const submission = await Submission.create({
//       studentId: student._id,
//       studentName: studentName || student.name || '',
//       studentLoginId: studentLoginId || student.loginId || '',
//       teacherId: teacher._id,
//       teacherName: teacherName || teacher.name || '',
//       teacherLoginId: teacherLoginId || teacher.loginId || '',
//       title,
//       subject,
//       description,
//       fileName,
//       fileUrl,
//       className,
//       courseName: courseName || 'Not Specified',
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
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('CREATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || 'Failed to submit assignment',
//       },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/mongodb/db';
import Submission from '@/models/submission';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const teacherId = String(searchParams.get('teacherId') || '').trim();
    const studentLoginId = String(searchParams.get('studentLoginId') || '').trim();
    const search = String(searchParams.get('search') || '').trim();
    const courseName = String(searchParams.get('courseName') || '').trim();
    const status = String(searchParams.get('status') || '').trim();
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(
      Math.max(1, parseInt(searchParams.get('limit') || '5', 10)),
      20
    );
    const skip = (page - 1) * limit;

    const query = {};

    let teacher = null;

    if (!teacherId && !studentLoginId) {
      if (search) {
        query.$or = [
          { studentName: { $regex: search, $options: 'i' } },
          { studentLoginId: { $regex: search, $options: 'i' } },
          { teacherName: { $regex: search, $options: 'i' } },
          { teacherLoginId: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { courseName: { $regex: search, $options: 'i' } },
        ];
      }

      if (courseName) {
        query.courseName = courseName;
      }

      if (status) {
        query.status = status;
      }

      const [submissions, total, courseAgg] = await Promise.all([
        Submission.find(query)
          .populate('studentId', 'name loginId')
          .populate('teacherId', 'name loginId subject')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Submission.countDocuments(query),
        Submission.aggregate([
          ...(courseName ? [{ $match: { courseName } }] : []),
          { $group: { _id: '$courseName' } },
          { $sort: { _id: 1 } },
        ]),
      ]);

      const courseOptions = courseAgg.map((item) => item._id).filter(Boolean);

      const formattedSubmissions = submissions.map((item) => ({
        _id: item._id,
        studentId: item.studentId?._id || item.studentId || '',
        studentName: item.studentId?.name || item.studentName || '',
        studentLoginId: item.studentId?.loginId || item.studentLoginId || '',
        teacherId: item.teacherId?._id || item.teacherId || '',
        teacherName: item.teacherId?.name || item.teacherName || '',
        teacherLoginId: item.teacherId?.loginId || item.teacherLoginId || '',
        title: item.title || '',
        subject: item.subject || '',
        description: item.description || '',
        fileName: item.fileName || '',
        fileUrl: item.fileUrl || '',
        className: item.className || '',
        courseName: item.courseName || '',
        section: item.section || '',
        status: item.status || 'Submitted',
        marks: item.marks ?? 0,
        feedback: item.feedback || '',
        reviewedBy: item.reviewedBy || '',
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      return NextResponse.json(
        {
          success: true,
          submissions: formattedSubmissions,
          courseOptions,
          pagination: {
            total,
            totalPages: Math.ceil(total / limit) || 1,
            currentPage: page,
            itemsPerPage: limit,
          },
        },
        { status: 200 }
      );
    }

    if (studentLoginId) {
      query.studentLoginId = studentLoginId;
    }

    if (teacherId) {
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return NextResponse.json(
          { success: false, message: 'Valid teacherId is required' },
          { status: 400 }
        );
      }

      teacher = await User.findById(teacherId).select('-password').lean();

      if (!teacher) {
        return NextResponse.json(
          { success: false, message: 'Teacher not found' },
          { status: 404 }
        );
      }

      if (String(teacher.role || '').toUpperCase() !== 'TEACHER') {
        return NextResponse.json(
          { success: false, message: 'Access denied. Teachers only.' },
          { status: 403 }
        );
      }

      query.teacherId = new mongoose.Types.ObjectId(teacherId);
    }

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentLoginId: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    if (courseName) {
      query.courseName = courseName;
    }

    if (status) {
      query.status = status;
    }

    const [submissions, total, courseAgg] = await Promise.all([
      Submission.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Submission.countDocuments(query),
      teacherId
        ? Submission.aggregate([
            { $match: { teacherId: new mongoose.Types.ObjectId(teacherId) } },
            { $group: { _id: '$courseName' } },
            { $sort: { _id: 1 } },
          ])
        : Promise.resolve([]),
    ]);

    const courseOptions = courseAgg.map((item) => item._id).filter(Boolean);

    return NextResponse.json(
      {
        success: true,
        teacher,
        submissions,
        courseOptions,
        pagination: {
          total,
          totalPages: Math.ceil(total / limit) || 1,
          currentPage: page,
          itemsPerPage: limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET SUBMISSIONS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to fetch submissions',
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const studentId = String(body.studentId || '').trim();
    const studentName = String(body.studentName || '').trim();
    const studentLoginId = String(body.studentLoginId || '').trim();
    const teacherId = String(body.teacherId || '').trim();
    const teacherName = String(body.teacherName || '').trim();
    const teacherLoginId = String(body.teacherLoginId || '').trim();
    const title = String(body.title || '').trim();
    const subject = String(body.subject || '').trim();
    const description = String(body.description || '').trim();
    const fileName = String(body.fileName || '').trim();
    const fileUrl = String(body.fileUrl || '').trim();
    const className = String(body.className || '').trim();
    const courseName = String(body.courseName || '').trim();
    const section = String(body.section || '').trim();

    if (
      !studentId ||
      !studentName ||
      !studentLoginId ||
      !teacherId ||
      !title
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'studentId, studentName, studentLoginId, teacherId and title are required',
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid studentId' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid teacherId' },
        { status: 400 }
      );
    }

    const [student, teacher] = await Promise.all([
      User.findById(studentId).lean(),
      User.findById(teacherId).lean(),
    ]);

    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }

    if (!teacher) {
      return NextResponse.json(
        { success: false, message: 'Teacher not found' },
        { status: 404 }
      );
    }

    if (String(student.role || '').toUpperCase() !== 'STUDENT') {
      return NextResponse.json(
        { success: false, message: 'Invalid student account' },
        { status: 403 }
      );
    }

    if (String(teacher.role || '').toUpperCase() !== 'TEACHER') {
      return NextResponse.json(
        { success: false, message: 'Invalid teacher account' },
        { status: 403 }
      );
    }

    const submission = await Submission.create({
      studentId: student._id,
      studentName: studentName || student.name || '',
      studentLoginId: studentLoginId || student.loginId || '',
      teacherId: teacher._id,
      teacherName: teacherName || teacher.name || '',
      teacherLoginId: teacherLoginId || teacher.loginId || '',
      title,
      subject,
      description,
      fileName,
      fileUrl,
      className,
      courseName: courseName || 'Not Specified',
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
    console.error('CREATE SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to submit assignment',
      },
      { status: 500 }
    );
  }
}