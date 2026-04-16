// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const studentId = searchParams.get('studentId') || '';
//     const search = searchParams.get('search') || '';
//     const courseName = searchParams.get('courseName') || '';
//     const status = searchParams.get('status') || '';
//     const page = Number(searchParams.get('page')) || 1;
//     const limit = Number(searchParams.get('limit')) || 5;

//     const filter = {};

//     if (studentId) filter.studentId = studentId;
//     if (courseName) filter.courseName = courseName;
//     if (status) filter.status = status;

//     if (search.trim()) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { subject: { $regex: search, $options: 'i' } },
//         { teacherName: { $regex: search, $options: 'i' } },
//       ];
//     }

//     const total = await Submission.countDocuments(filter);
//     const totalPages = Math.max(1, Math.ceil(total / limit));
//     const currentPage = Math.min(page, totalPages);
//     const skip = (currentPage - 1) * limit;

//     const submissions = await Submission.find(filter)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const courseOptions = await Submission.distinct('courseName', {
//       studentId,
//       courseName: { $nin: ['', null] },
//     });

//     return NextResponse.json({
//       success: true,
//       submissions,
//       courseOptions,
//       pagination: {
//         total,
//         totalPages,
//         currentPage,
//       },
//     });
//   } catch (error) {
//     console.error('GET STUDENT SUBMISSIONS ERROR:', error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         submissions: [],
//         courseOptions: [],
//         pagination: {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         },
//       },
//       { status: 500 }
//     );
//   }
// }