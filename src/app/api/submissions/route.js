// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       title,
//       subject,
//       description,
//       fileLink,
//       fileName,
//       studentName,
//       studentLoginId,
//     } = body;

//     if (!title || !subject || !studentName || !studentLoginId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'title, subject, studentName and studentLoginId are required',
//         },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.create({
//       title: title.trim(),
//       subject: subject.trim(),
//       description: description || '',
//       fileLink: fileLink || '',
//       fileName: fileName || '',
//       studentName: studentName.trim(),
//       studentLoginId: studentLoginId.trim(),
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission saved successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('SUBMISSION CREATE ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to save submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const studentLoginId = searchParams.get('studentLoginId');

//     let query = {};
//     if (studentLoginId) {
//       query.studentLoginId = studentLoginId.trim();
//     }

//     const submissions = await Submission.find(query).sort({ createdAt: -1 });

//     return NextResponse.json(
//       { success: true, submissions },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const submission = await Submission.create({
//       title: body.title,
//       subject: body.subject,
//       description: body.description || '',
//       fileLink: body.fileLink || '',
//       fileName: body.fileName || '',
//       studentName: body.studentName,
//       studentLoginId: body.studentLoginId,
//       className: body.className,
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission saved successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('SUBMISSION CREATE ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to save submission', error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const studentLoginId = searchParams.get('studentLoginId');
//     const className = searchParams.get('className');

//     let query = {};

//     if (studentLoginId) {
//       query.studentLoginId = studentLoginId.trim();
//     }

//     if (className) {
//       query.className = className.trim();
//     }

//     const submissions = await Submission.find(query).sort({ createdAt: -1 });

//     return NextResponse.json(
//       { success: true, submissions },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch submissions', error: error.message },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       title,
//       subject,
//       description,
//       fileLink,
//       fileName,
//       studentName,
//       studentLoginId,
//       className,
//       courseName,
//     } = body;

//     if (!title || !subject || !studentName || !studentLoginId || !className) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             'title, subject, studentName, studentLoginId and className are required',
//         },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.create({
//       title: title.trim(),
//       subject: subject.trim(),
//       description: description || '',
//       fileLink: fileLink || '',
//       fileName: fileName || '',
//       studentName: studentName.trim(),
//       studentLoginId: studentLoginId.trim(),
//       className: className.trim(),
//       courseName: courseName?.trim() || '',
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission saved successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('SUBMISSION CREATE ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to save submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const studentLoginId = searchParams.get('studentLoginId');

//     let query = {};
//     if (studentLoginId) {
//       query.studentLoginId = studentLoginId.trim();
//     }

//     const submissions = await Submission.find(query).sort({ createdAt: -1 });

//     return NextResponse.json(
//       { success: true, submissions },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       title,
//       subject,
//       description,
//       fileLink,
//       fileName,
//       studentName,
//       studentLoginId,
//       className,
//       courseName,
//     } = body;

//     if (!title || !subject || !studentName || !studentLoginId || !className) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             'title, subject, studentName, studentLoginId and className are required',
//         },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.create({
//       title: title.trim(),
//       subject: subject.trim(),
//       description: description || '',
//       fileLink: fileLink || '',
//       fileName: fileName || '',
//       studentName: studentName.trim(),
//       studentLoginId: studentLoginId.trim(),
//       className: className.trim(),
//       courseName: courseName?.trim() || '',
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission saved successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('SUBMISSION CREATE ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to save submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const studentLoginId = searchParams.get('studentLoginId');

//     let query = {};
//     if (studentLoginId) {
//       query.studentLoginId = studentLoginId.trim();
//     }

//     const submissions = await Submission.find(query).sort({ createdAt: -1 });

//     return NextResponse.json(
//       { success: true, submissions },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       title,
//       subject,
//       description,
//       fileLink,
//       fileName,
//       studentName,
//       studentLoginId,
//       className,
//       courseName,
//     } = body;

//     // ✅ FIXED: Proper validation with .trim()
//     // if (!title?.trim() || !subject?.trim() || !studentName?.trim() || !studentLoginId?.trim() || !className?.trim()) {
//     if (!title?.trim() || !subject?.trim() || !studentName?.trim() || !studentLoginId?.trim()) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'title, subject, studentName, studentLoginId and className are required',
//         },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.create({
//       title: title.trim(),
//       subject: subject.trim(),
//       description: description || '',
//       fileLink: fileLink || '',
//       fileName: fileName || '',
//       studentName: studentName.trim(),
//       studentLoginId: studentLoginId.trim(),
//       className: className.trim(),
//       courseName: courseName?.trim() || '',
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission saved successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('SUBMISSION CREATE ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to save submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const studentLoginId = searchParams.get('studentLoginId');

//     let query = {};
//     if (studentLoginId) {
//       query.studentLoginId = studentLoginId.trim();
//     }

//     const submissions = await Submission.find(query).sort({ createdAt: -1 });

//     return NextResponse.json(
//       { success: true, submissions },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     const {
//       title, subject, description, fileLink, fileName,
//       studentName, studentLoginId, className, courseName
//     } = body;

//     // ✅ Only require core fields
//     if (!title?.trim() || !subject?.trim() || !studentName?.trim() || !studentLoginId?.trim()) {
//       return NextResponse.json({
//         success: false,
//         message: 'title, subject, studentName and studentLoginId are required'
//       }, { status: 400 });
//     }

//     const submission = await Submission.create({
//       title: title.trim(),
//       subject: subject.trim(),
//       description: description || '',
//       fileLink: fileLink || '',
//       fileName: fileName || '',
//       studentName: studentName.trim(),
//       studentLoginId: studentLoginId.trim(),
//       className: className?.trim() || 'Not Specified',
//       courseName: courseName?.trim() || 'Not Specified',
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: ''
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Submission saved successfully',
//       submission
//     }, { status: 201 });
//   } catch (error) {
//     console.error('SUBMISSION CREATE ERROR:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Failed to save submission',
//       error: error.message
//     }, { status: 500 });
//   }
// }

// export async function GET(req) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(req.url);
//     const studentLoginId = searchParams.get('studentLoginId');

//     let query = {};
//     if (studentLoginId) {
//       query.studentLoginId = studentLoginId.trim();
//     }

//     const submissions = await Submission.find(query).sort({ createdAt: -1 });

//     return NextResponse.json({ success: true, submissions }, { status: 200 });
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Failed to fetch submissions',
//       error: error.message
//     }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const teacherId = req.nextUrl.searchParams.get('teacherId');

//     if (!teacherId) {
//       return NextResponse.json(
//         { success: false, message: 'teacherId is required' },
//         { status: 400 }
//       );
//     }

//     const submissions = await Submission.find({ teacherId })
//       .sort({ createdAt: -1 })
//       .populate('studentId', 'name loginId className course');

//     return NextResponse.json(
//       { success: true, submissions },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('FETCH SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     await connectDB();

//     const submissions = await Submission.find()
//       .populate('studentId', 'name loginId email course className section')
//       .populate('teacherId', 'name loginId email subject');

//     return NextResponse.json({
//       success: true,
//       submissions,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// // export async function POST(req) {
// //   try {
// //     await connectDB();

// //     const body = await req.json();

// //     const {
// //       studentId,
// //       studentName,
// //       studentLoginId,
// //       teacherId,
// //       teacherName,
// //       teacherLoginId,
// //       title,
// //       subject,
// //       description,
// //       fileUrl,
// //       fileName,
// //       className,
// //       courseName,
// //     } = body;

// //     if (!studentId) {
// //       return NextResponse.json(
// //         { success: false, message: 'studentId is required' },
// //         { status: 400 }
// //       );
// //     }

// //     if (!teacherId) {
// //       return NextResponse.json(
// //         { success: false, message: 'teacherId is required' },
// //         { status: 400 }
// //       );
// //     }

// //     if (!title) {
// //       return NextResponse.json(
// //         { success: false, message: 'title is required' },
// //         { status: 400 }
// //       );
// //     }

// //     if (!subject) {
// //       return NextResponse.json(
// //         { success: false, message: 'subject is required' },
// //         { status: 400 }
// //       );
// //     }

// //     const submission = await Submission.create({
// //       studentId,
// //       studentName,
// //       studentLoginId,
// //       teacherId,
// //       teacherName,
// //       teacherLoginId,
// //       title,
// //       subject,
// //       description: description || '',
// //       fileUrl: fileUrl || '',
// //       fileName: fileName || '',
// //       className: className || 'Not Specified',
// //       courseName: courseName || 'Not Specified',
// //       status: 'Submitted',
// //       marks: 0,
// //       feedback: '',
// //       reviewedBy: '',
// //     });

// //     return NextResponse.json(
// //       {
// //         success: true,
// //         message: 'Submission created successfully',
// //         submission,
// //       },
// //       { status: 201 }
// //     );
// //   } catch (error) {
// //     console.error('CREATE SUBMISSION ERROR:', error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: 'Failed to create submission',
// //         error: error.message,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }


// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description,
//       fileUrl,
//       fileName,
//       className,
//       courseName,
//     } = body;

//     if (!studentId) {
//       return NextResponse.json(
//         { success: false, message: 'studentId is required' },
//         { status: 400 }
//       );
//     }

//     if (!teacherId) {
//       return NextResponse.json(
//         { success: false, message: 'teacherId is required' },
//         { status: 400 }
//       );
//     }

//     if (!title?.trim()) {
//       return NextResponse.json(
//         { success: false, message: 'title is required' },
//         { status: 400 }
//       );
//     }

//     if (!subject?.trim()) {
//       return NextResponse.json(
//         { success: false, message: 'subject is required' },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.create({
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description: description || '',
//       fileUrl: fileUrl || '',
//       fileName: fileName || '',
//       className: className || 'Not Specified',
//       courseName: courseName || 'Not Specified',
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission created successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('CREATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import User from '@/models/user';

// export const dynamic = 'force-dynamic';

// export async function GET(request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const studentLoginId = searchParams.get('studentLoginId');
//     const teacherId = searchParams.get('teacherId');

//     const filter = {};

//     if (studentLoginId) {
//       const studentUser = await User.findOne({
//         loginId: studentLoginId,
//         role: 'STUDENT',
//       });

//       if (!studentUser) {
//         return NextResponse.json({
//           success: true,
//           submissions: [],
//         });
//       }

//       filter.studentId = studentUser._id;
//     }

//     if (teacherId) {
//       filter.teacherId = teacherId;
//     }

//     const submissions = await Submission.find(filter)
//       .populate('studentId', 'name loginId email course className section')
//       .populate('teacherId', 'name loginId email subject className')
//       .sort({ createdAt: -1 });

//     const formattedSubmissions = submissions.map((item) => ({
//       _id: item._id,
//       title: item.title || '',
//       subject: item.subject || '',
//       description: item.description || '',
//       fileUrl: item.fileUrl || '',
//       fileName: item.fileName || '',
//       status: item.status || 'Submitted',
//       marks: item.marks ?? 0,
//       feedback: item.feedback || '',
//       reviewedBy: item.reviewedBy || '',
//       className: item.className || '',
//       courseName: item.courseName || '',
//       studentId: item.studentId?._id || '',
//       studentName: item.studentId?.name || item.studentName || '',
//       studentLoginId: item.studentId?.loginId || item.studentLoginId || '',
//       teacherId: item.teacherId?._id || '',
//       teacherName: item.teacherId?.name || item.teacherName || '',
//       teacherLoginId: item.teacherId?.loginId || item.teacherLoginId || '',
//       createdAt: item.createdAt,
//       updatedAt: item.updatedAt,
//     }));

//     return NextResponse.json({
//       success: true,
//       submissions: formattedSubmissions,
//     });
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch submissions' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();

//     const body = await request.json();
//     const {
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description,
//       fileUrl,
//       fileName,
//       className,
//       courseName,
//     } = body;

//     if (
//       !studentId ||
//       !studentName ||
//       !studentLoginId ||
//       !teacherId ||
//       !teacherName ||
//       !teacherLoginId ||
//       !title ||
//       !subject
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Student, teacher, title and subject data are required',
//         },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.create({
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description: description || '',
//       fileUrl: fileUrl || '',
//       fileName: fileName || '',
//       className: className || 'Not Specified',
//       courseName: courseName || 'Not Specified',
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//     });

//     const populatedSubmission = await Submission.findById(submission._id)
//       .populate('studentId', 'name loginId email course className section')
//       .populate('teacherId', 'name loginId email subject className');

//     return NextResponse.json({
//       success: true,
//       message: 'Assignment submitted successfully',
//       submission: populatedSubmission,
//     });
//   } catch (error) {
//     console.error('POST SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Failed to submit assignment' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import Teacher from '@/models/teacher';
// import User from '@/models/user';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const teacherId = searchParams.get('teacherId');
//     const page = Number(searchParams.get('page') || 1);
//     const limit = Number(searchParams.get('limit') || 5);
//     const search = String(searchParams.get('search') || '').trim();
//     const course = String(searchParams.get('course') || '').trim();
//     const status = String(searchParams.get('status') || '').trim();

//     if (!teacherId) {
//       return NextResponse.json(
//         { success: false, message: 'teacherId is required' },
//         { status: 400 }
//       );
//     }

//     const teacher =
//       (await User.findById(teacherId).lean()) ||
//       (await Teacher.findById(teacherId).lean());

//     if (!teacher) {
//       return NextResponse.json(
//         { success: false, message: 'Teacher not found' },
//         { status: 404 }
//       );
//     }

//     const teacherName = teacher.name || teacher.teacherName || '';
//     const teacherSubject = teacher.subject || '';
//     const teacherCourse = teacher.course || '';

//     const query = {};

//     if (teacherId) {
//       query.teacherId = teacherId;
//     }

//     if (course) {
//       query.course = course;
//     }

//     if (status) {
//       query.status = status;
//     }

//     if (teacherSubject) {
//       query.subject = teacherSubject;
//     }

//     if (search) {
//       query.$or = [
//         { studentName: { $regex: search, $options: 'i' } },
//         { studentLoginId: { $regex: search, $options: 'i' } },
//         { title: { $regex: search, $options: 'i' } },
//         { course: { $regex: search, $options: 'i' } },
//       ];
//     }

//     const total = await Submission.countDocuments(query);

//     const submissions = await Submission.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .lean();

//     const allCourses = await Submission.distinct('course', {
//       teacherId,
//     });

//     return NextResponse.json({
//       success: true,
//       teacher: {
//         id: teacher._id,
//         name: teacherName,
//         loginId: teacher.loginId || '',
//         subject: teacherSubject,
//         course: teacherCourse,
//         email: teacher.email || '',
//       },
//       submissions,
//       courseOptions: allCourses.filter(Boolean),
//       pagination: {
//         total,
//         totalPages: Math.ceil(total / limit) || 1,
//         currentPage: page,
//         limit,
//       },
//     });
//   } catch (error) {
//     console.error('FETCH SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch submissions' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import User from '@/models/user';

// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     await connectDB();

//     const submissions = await Submission.find({})
//       .sort({ createdAt: -1 })
//       .lean();

//     return NextResponse.json(
//       { success: true, submissions },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch submissions' },
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
//     const description = String(body.description || '').trim();
//     const subject = String(body.subject || '').trim();

//     if (
//       !studentId ||
//       !studentName ||
//       !studentLoginId ||
//       !teacherId ||
//       !teacherName ||
//       !teacherLoginId ||
//       !title ||
//       !description ||
//       !subject
//     ) {
//       return NextResponse.json(
//         { success: false, message: 'All required fields must be filled' },
//         { status: 400 }
//       );
//     }

//     const student = await User.findById(studentId).lean();
//     const teacher = await User.findById(teacherId).lean();

//     if (!student || student.role !== 'STUDENT') {
//       return NextResponse.json(
//         { success: false, message: 'Student not found' },
//         { status: 404 }
//       );
//     }

//     if (!teacher || teacher.role !== 'TEACHER') {
//       return NextResponse.json(
//         { success: false, message: 'Teacher not found' },
//         { status: 404 }
//       );
//     }

//     const submission = await Submission.create({
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId,
//       teacherName,
//       teacherLoginId,
//       title,
//       description,
//       subject,
//       course: student.course || '',
//       className: student.className || '',
//       section: student.section || '',
//       status: 'Submitted',
//       marks: 0,
//       feedback: '',
//       reviewedBy: '',
//       fileUrl: body.fileUrl || '',
//       fileName: body.fileName || '',
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
//       { success: false, message: 'Failed to submit assignment' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import User from '@/models/user';
// import Student from '@/models/student';

// export const dynamic = 'force-dynamic';

// // export async function GET(req) {
// //   try {
// //     await connectDB();

// //     const { searchParams } = new URL(req.url);
// //     const className = searchParams.get('className');
// //     const subject = searchParams.get('subject');

// //     const filter = {};

// //     if (className) {
// //       filter.className = className;
// //     }

// //     if (subject) {
// //       filter.subject = subject;
// //     }

// //     const submissions = await Submission.find(filter).sort({ createdAt: -1 });

// //     return NextResponse.json(
// //       {
// //         success: true,
// //         submissions,
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error('GET SUBMISSIONS ERROR:', error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: 'Failed to fetch submissions',
// //         submissions: [],
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }


// // export async function GET(req) {
// //   try {
// //     await connectDB();

// //     const { searchParams } = new URL(req.url);

// //     const teacherId = searchParams.get('teacherId') || '';
// //     const search = searchParams.get('search') || '';
// //     const courseName = searchParams.get('courseName') || '';
// //     const status = searchParams.get('status') || '';
// //     const page = Number(searchParams.get('page')) || 1;
// //     const limit = Number(searchParams.get('limit')) || 5;

// //     const filter = {};

// //     if (teacherId) {
// //       filter.teacherId = teacherId;
// //     }

// //     if (courseName) {
// //       filter.courseName = courseName;
// //     }

// //     if (status) {
// //       filter.status = status;
// //     }

// //     if (search.trim()) {
// //       filter.$or = [
// //         { studentName: { $regex: search, $options: 'i' } },
// //         { studentLoginId: { $regex: search, $options: 'i' } },
// //         { title: { $regex: search, $options: 'i' } },
// //       ];
// //     }

// //     const total = await Submission.countDocuments(filter);
// //     const totalPages = Math.max(1, Math.ceil(total / limit));
// //     const currentPage = Math.min(page, totalPages);
// //     const skip = (currentPage - 1) * limit;

// //     const submissions = await Submission.find(filter)
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(limit);

// //     let teacher = null;
// //     if (teacherId) {
// //       teacher = await User.findById(teacherId).select('-password').lean();
// //     }

// //     const allTeacherCourses = await Submission.distinct('courseName', {
// //       teacherId,
// //       courseName: { $nin: ['', null] },
// //     });

// //     return NextResponse.json({
// //       success: true,
// //       submissions,
// //       teacher,
// //       courseOptions: allTeacherCourses,
// //       pagination: {
// //         total,
// //         totalPages,
// //         currentPage,
// //       },
// //     });
// //   } catch (error) {
// //     console.error('GET SUBMISSIONS ERROR:', error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: 'Failed to fetch submissions',
// //         submissions: [],
// //         courseOptions: [],
// //         pagination: {
// //           total: 0,
// //           totalPages: 1,
// //           currentPage: 1,
// //         },
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }


// // export async function GET(req) {
// //   try {
// //     await connectDB();

// //     const { searchParams } = new URL(req.url);

// //     const teacherId = searchParams.get('teacherId') || '';
// //     const search = searchParams.get('search') || '';
// //     const courseName = searchParams.get('courseName') || '';
// //     const status = searchParams.get('status') || '';
// //     const page = Number(searchParams.get('page')) || 1;
// //     const limit = Number(searchParams.get('limit')) || 5;

// //     const filter = {};

// //     if (teacherId) {
// //       filter.teacherId = teacherId;
// //     }

// //     if (courseName) {
// //       filter.courseName = courseName;
// //     }

// //     if (status) {
// //       filter.status = status;
// //     }

// //     if (search.trim()) {
// //       filter.$or = [
// //         { studentName: { $regex: search, $options: 'i' } },
// //         { studentLoginId: { $regex: search, $options: 'i' } },
// //         { title: { $regex: search, $options: 'i' } },
// //       ];
// //     }

// //     const total = await Submission.countDocuments(filter);
// //     const totalPages = Math.max(1, Math.ceil(total / limit));
// //     const currentPage = Math.min(page, totalPages);
// //     const skip = (currentPage - 1) * limit;

// //     const submissions = await Submission.find(filter)
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(limit)
// //       .lean();

// //     let teacher = null;
// //     if (teacherId) {
// //       teacher = await User.findById(teacherId).select('-password').lean();
// //     }

// //     const courseOptions = await Submission.distinct('courseName', {
// //       teacherId,
// //       courseName: { $nin: ['', null] },
// //     });

// //     return NextResponse.json({
// //       success: true,
// //       submissions,
// //       teacher,
// //       courseOptions,
// //       pagination: {
// //         total,
// //         totalPages,
// //         currentPage,
// //       },
// //     });
// //   } catch (error) {
// //     console.error('GET SUBMISSIONS ERROR:', error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: 'Failed to fetch submissions',
// //         submissions: [],
// //         teacher: null,
// //         courseOptions: [],
// //         pagination: {
// //           total: 0,
// //           totalPages: 1,
// //           currentPage: 1,
// //         },
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const teacherId = searchParams.get('teacherId') || '';
//     const search = searchParams.get('search') || '';
//     const courseName = searchParams.get('courseName') || '';
//     const status = searchParams.get('status') || '';
//     const page = Number(searchParams.get('page')) || 1;
//     const limit = Number(searchParams.get('limit')) || 5;

//     const filter = {};

//     if (teacherId) filter.teacherId = teacherId;
//     if (courseName) filter.courseName = courseName;
//     if (status) filter.status = status;

//     if (search.trim()) {
//       filter.$or = [
//         { studentName: { $regex: search, $options: 'i' } },
//         { studentLoginId: { $regex: search, $options: 'i' } },
//         { title: { $regex: search, $options: 'i' } },
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

//     let teacher = null;
//     if (teacherId) {
//       teacher = await User.findById(teacherId).select('-password').lean();
//     }

//     const courseOptions = await Submission.distinct('courseName', {
//       teacherId,
//       courseName: { $nin: ['', null] },
//     });

//     return NextResponse.json({
//       success: true,
//       submissions,
//       teacher,
//       courseOptions,
//       pagination: {
//         total,
//         totalPages,
//         currentPage,
//       },
//     });
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         submissions: [],
//         teacher: null,
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
//     const fileUrl = String(body.fileUrl || '').trim();
//     const fileName = String(body.fileName || '').trim();

//     let className = String(body.className || '').trim();
//     let courseName = String(body.courseName || '').trim();
//     let section = String(body.section || '').trim();

//     if (!studentId || !studentName || !studentLoginId || !title || !subject) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Student, title, and subject are required',
//         },
//         { status: 400 }
//       );
//     }

//     const user = await User.findById(studentId).lean();
//     const studentProfile = await Student.findOne({ userId: studentId }).lean();

//     if (!className) {
//       className =
//         studentProfile?.className?.trim() ||
//         user?.className?.trim() ||
//         '';
//     }

//     if (!courseName) {
//       courseName =
//         studentProfile?.course?.trim() ||
//         user?.course?.trim() ||
//         'Not Specified';
//     }

//     if (!section) {
//       section =
//         studentProfile?.section?.trim() ||
//         user?.section?.trim() ||
//         '';
//     }

//     const submission = await Submission.create({
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId: teacherId || null,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description,
//       fileUrl,
//       fileName,
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
//         message: 'Submission created successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('POST SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import User from '@/models/user';
// import Student from '@/models/student';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const teacherId = searchParams.get('teacherId') || '';
//     const studentId = searchParams.get('studentId') || '';
//     const search = searchParams.get('search') || '';
//     const courseName = searchParams.get('courseName') || '';
//     const status = searchParams.get('status') || '';
//     const page = Number(searchParams.get('page')) || 1;
//     const limit = Number(searchParams.get('limit')) || 5;

//     const filter = {};

//     if (teacherId) filter.teacherId = teacherId;
//     if (studentId) filter.studentId = studentId;
//     if (courseName) filter.courseName = courseName;
//     if (status) filter.status = status;

//     if (search.trim()) {
//       const searchRegex = { $regex: search.trim(), $options: 'i' };

//       if (teacherId) {
//         filter.$or = [
//           { studentName: searchRegex },
//           { studentLoginId: searchRegex },
//           { title: searchRegex },
//         ];
//       } else if (studentId) {
//         filter.$or = [
//           { title: searchRegex },
//           { subject: searchRegex },
//           { teacherName: searchRegex },
//           { teacherLoginId: searchRegex },
//         ];
//       } else {
//         filter.$or = [
//           { studentName: searchRegex },
//           { studentLoginId: searchRegex },
//           { teacherName: searchRegex },
//           { teacherLoginId: searchRegex },
//           { title: searchRegex },
//           { subject: searchRegex },
//         ];
//       }
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

//     let teacher = null;
//     if (teacherId) {
//       teacher = await User.findById(teacherId).select('-password').lean();
//     }

//     const distinctFilter = {
//       courseName: { $nin: ['', null] },
//     };

//     if (teacherId) distinctFilter.teacherId = teacherId;
//     if (studentId) distinctFilter.studentId = studentId;

//     const courseOptions = await Submission.distinct('courseName', distinctFilter);

//     return NextResponse.json({
//       success: true,
//       submissions,
//       teacher,
//       courseOptions,
//       pagination: {
//         total,
//         totalPages,
//         currentPage,
//       },
//     });
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         submissions: [],
//         teacher: null,
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
//     const fileUrl = String(body.fileUrl || '').trim();
//     const fileName = String(body.fileName || '').trim();

//     let className = String(body.className || '').trim();
//     let courseName = String(body.courseName || '').trim();
//     let section = String(body.section || '').trim();

//     if (!studentId || !studentName || !studentLoginId || !title || !subject) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Student, title, and subject are required',
//         },
//         { status: 400 }
//       );
//     }

//     const user = await User.findById(studentId).lean();
//     const studentProfile = await Student.findOne({ userId: studentId }).lean();

//     if (!className) {
//       className =
//         studentProfile?.className?.trim() ||
//         user?.className?.trim() ||
//         '';
//     }

//     if (!courseName) {
//       courseName =
//         studentProfile?.course?.trim() ||
//         user?.course?.trim() ||
//         'Not Specified';
//     }

//     if (!section) {
//       section =
//         studentProfile?.section?.trim() ||
//         user?.section?.trim() ||
//         '';
//     }

//     const submission = await Submission.create({
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId: teacherId || null,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description,
//       fileName,
//       fileUrl,
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
//         message: 'Submission created successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('POST SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import User from '@/models/user';
// import Student from '@/models/student';

// export const dynamic = 'force-dynamic';

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const teacherId = searchParams.get('teacherId') || '';
//     const studentId = searchParams.get('studentId') || '';
//     const search = searchParams.get('search') || '';
//     const courseName = searchParams.get('courseName') || '';
//     const status = searchParams.get('status') || '';
//     const page = Number(searchParams.get('page')) || 1;
//     const limit = Number(searchParams.get('limit')) || 5;

//     const filter = {};

//     if (teacherId) filter.teacherId = teacherId;
//     if (studentId) filter.studentId = studentId;
//     if (courseName) filter.courseName = courseName;
//     if (status) filter.status = status;

//     if (search.trim()) {
//       const searchRegex = { $regex: search.trim(), $options: 'i' };

//       if (teacherId) {
//         filter.$or = [
//           { studentName: searchRegex },
//           { studentLoginId: searchRegex },
//           { title: searchRegex },
//         ];
//       } else if (studentId) {
//         filter.$or = [
//           { title: searchRegex },
//           { subject: searchRegex },
//           { teacherName: searchRegex },
//           { teacherLoginId: searchRegex },
//         ];
//       } else {
//         filter.$or = [
//           { studentName: searchRegex },
//           { studentLoginId: searchRegex },
//           { teacherName: searchRegex },
//           { teacherLoginId: searchRegex },
//           { title: searchRegex },
//           { subject: searchRegex },
//         ];
//       }
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

//     let teacher = null;
//     if (teacherId) {
//       teacher = await User.findById(teacherId).select('-password').lean();
//     }

//     const distinctFilter = {
//       courseName: { $nin: ['', null] },
//     };

//     if (teacherId) distinctFilter.teacherId = teacherId;
//     if (studentId) distinctFilter.studentId = studentId;

//     const courseOptions = await Submission.distinct('courseName', distinctFilter);

//     return NextResponse.json({
//       success: true,
//       submissions,
//       teacher,
//       courseOptions,
//       pagination: {
//         total,
//         totalPages,
//         currentPage,
//       },
//     });
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         submissions: [],
//         teacher: null,
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

//     let fileUrl = String(body.fileUrl || '').trim();
//     let className = String(body.className || '').trim();
//     let courseName = String(body.courseName || '').trim();
//     let section = String(body.section || '').trim();

//     if (!studentId || !studentName || !studentLoginId || !title || !subject) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Student, title, and subject are required',
//         },
//         { status: 400 }
//       );
//     }

//     const user = await User.findById(studentId).lean();
//     const studentProfile = await Student.findOne({ userId: studentId }).lean();

//     if (!className) {
//       className =
//         studentProfile?.className?.trim() ||
//         user?.className?.trim() ||
//         '';
//     }

//     if (!courseName) {
//       courseName =
//         studentProfile?.course?.trim() ||
//         user?.course?.trim() ||
//         'Not Specified';
//     }

//     if (!section) {
//       section =
//         studentProfile?.section?.trim() ||
//         user?.section?.trim() ||
//         '';
//     }

//     if (!fileUrl && fileName) {
//       fileUrl = `/uploads/${fileName}`;
//     }

//     const submission = await Submission.create({
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId: teacherId || null,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description,
//       fileName,
//       fileUrl,
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
//         message: 'Submission created successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('POST SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';
// import User from '@/models/user';
// import Student from '@/models/student';

// export const dynamic = 'force-dynamic';

// // export async function GET(req) {
// //   try {
// //     await connectDB();

// //     const searchParams = req.nextUrl.searchParams;

// //     const teacherId = searchParams.get('teacherId') || '';
// //     const teacherLoginId = searchParams.get('teacherLoginId') || '';
// //     const studentId = searchParams.get('studentId') || '';
// //     const search = searchParams.get('search') || '';
// //     const courseName = searchParams.get('courseName') || '';
// //     const className = searchParams.get('className') || '';
// //     const status = searchParams.get('status') || '';

// //     const rawPage = Number(searchParams.get('page'));
// //     const rawLimit = Number(searchParams.get('limit'));

// //     const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
// //     const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 5;

// //     const filter = {};

// //     if (teacherId) filter.teacherId = teacherId;
// //     if (teacherLoginId) filter.teacherLoginId = teacherLoginId;
// //     if (studentId) filter.studentId = studentId;
// //     if (courseName) filter.courseName = courseName;
// //     if (className) filter.className = className;
// //     if (status) filter.status = status;

// //     if (search.trim()) {
// //       const searchRegex = { $regex: search.trim(), $options: 'i' };

// //       if (teacherId || teacherLoginId) {
// //         filter.$or = [
// //           { studentName: searchRegex },
// //           { studentLoginId: searchRegex },
// //           { title: searchRegex },
// //           { subject: searchRegex },
// //           { className: searchRegex },
// //           { courseName: searchRegex },
// //         ];
// //       } else if (studentId) {
// //         filter.$or = [
// //           { title: searchRegex },
// //           { subject: searchRegex },
// //           { teacherName: searchRegex },
// //           { teacherLoginId: searchRegex },
// //           { className: searchRegex },
// //           { courseName: searchRegex },
// //         ];
// //       } else {
// //         filter.$or = [
// //           { studentName: searchRegex },
// //           { studentLoginId: searchRegex },
// //           { teacherName: searchRegex },
// //           { teacherLoginId: searchRegex },
// //           { title: searchRegex },
// //           { subject: searchRegex },
// //           { className: searchRegex },
// //           { courseName: searchRegex },
// //           { section: searchRegex },
// //         ];
// //       }
// //     }

// //     const total = await Submission.countDocuments(filter);
// //     const totalPages = Math.max(1, Math.ceil(total / limit));
// //     const currentPage = Math.min(page, totalPages);
// //     const skip = (currentPage - 1) * limit;

// //     const submissions = await Submission.find(filter)
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(limit)
// //       .lean();

// //     let teacher = null;
// //     if (teacherId) {
// //       teacher = await User.findById(teacherId).select('-password').lean();
// //     }

// //     const distinctFilter = {};

// //     if (teacherId) distinctFilter.teacherId = teacherId;
// //     if (teacherLoginId) distinctFilter.teacherLoginId = teacherLoginId;
// //     if (studentId) distinctFilter.studentId = studentId;

// //     const [courseOptions, classOptions] = await Promise.all([
// //       Submission.distinct('courseName', {
// //         ...distinctFilter,
// //         courseName: { $nin: ['', null] },
// //       }),
// //       Submission.distinct('className', {
// //         ...distinctFilter,
// //         className: { $nin: ['', null] },
// //       }),
// //     ]);

// //     return NextResponse.json({
// //       success: true,
// //       submissions,
// //       teacher,
// //       courseOptions: courseOptions.sort(),
// //       classOptions: classOptions.sort(),
// //       pagination: {
// //         total,
// //         totalPages,
// //         currentPage,
// //         limit,
// //       },
// //     });
// //   } catch (error) {
// //     console.error('GET SUBMISSIONS ERROR:', error);

// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: 'Failed to fetch submissions',
// //         submissions: [],
// //         teacher: null,
// //         courseOptions: [],
// //         classOptions: [],
// //         pagination: {
// //           total: 0,
// //           totalPages: 1,
// //           currentPage: 1,
// //           limit: 5,
// //         },
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }


// export async function GET() {
//   try {
//     await connectDB();

//     const submissions = await Submission.find({})
//       .sort({ createdAt: -1 })
//       .populate('studentId', 'name className course section loginId')
//       .populate('teacherId', 'name loginId subject');

//     const formatted = submissions.map((item) => ({
//       _id: item._id,
//       title: item.title || '',
//       studentName: item.studentName || item.studentId?.name || '',
//       teacherName: item.teacherName || item.teacherId?.name || '',
//       teacherLoginId: item.teacherLoginId || item.teacherId?.loginId || '',
//       className:
//         item.className ||
//         item.studentId?.className ||
//         '',
//       course: item.course || item.studentId?.course || '',
//       section: item.section || item.studentId?.section || '',
//       status: item.status || 'Submitted',
//       marks: item.marks ?? null,
//       createdAt: item.createdAt,
//     }));

//     return NextResponse.json({
//       success: true,
//       submissions: formatted,
//     });
//   } catch (error) {
//     console.error('GET SUBMISSIONS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submissions',
//         submissions: [],
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

//     let fileUrl = String(body.fileUrl || '').trim();
//     let className = String(body.className || '').trim();
//     let courseName = String(body.courseName || '').trim();
//     let section = String(body.section || '').trim();

//     if (!studentId || !studentName || !studentLoginId || !title || !subject) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Student, title, and subject are required',
//         },
//         { status: 400 }
//       );
//     }

//     const user = await User.findById(studentId).lean();
//     const studentProfile = await Student.findOne({ userId: studentId }).lean();

//     if (!className) {
//       className =
//         studentProfile?.className?.trim() ||
//         user?.className?.trim() ||
//         '';
//     }

//     if (!courseName) {
//       courseName =
//         studentProfile?.course?.trim() ||
//         user?.course?.trim() ||
//         'Not Specified';
//     }

//     if (!section) {
//       section =
//         studentProfile?.section?.trim() ||
//         user?.section?.trim() ||
//         '';
//     }

//     if (!fileUrl && fileName) {
//       fileUrl = `/uploads/${fileName}`;
//     }

//     const submission = await Submission.create({
//       studentId,
//       studentName,
//       studentLoginId,
//       teacherId: teacherId || null,
//       teacherName,
//       teacherLoginId,
//       title,
//       subject,
//       description,
//       fileName,
//       fileUrl,
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
//         message: 'Submission created successfully',
//         submission,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('POST SUBMISSION ERROR:', error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';
import Submission from '@/models/submission';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const teacherId = String(searchParams.get('teacherId') || '').trim();
    const search = String(searchParams.get('search') || '').trim();
    const courseName = String(searchParams.get('courseName') || '').trim();
    const status = String(searchParams.get('status') || '').trim();
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.max(parseInt(searchParams.get('limit') || '5', 10), 1);
    const skip = (page - 1) * limit;

    if (!teacherId) {
      return NextResponse.json(
        { success: false, message: 'teacherId is required' },
        { status: 400 }
      );
    }

    const teacher = await User.findById(teacherId).select('-password').lean();

    if (!teacher || teacher.role !== 'TEACHER') {
      return NextResponse.json(
        { success: false, message: 'Teacher not found' },
        { status: 404 }
      );
    }

    const query = {
      teacherId,
    };

    if (courseName) {
      query.courseName = courseName;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentLoginId: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Submission.countDocuments(query);

    const submissions = await Submission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const courseOptionsAgg = await Submission.distinct('courseName', { teacherId });
    const courseOptions = courseOptionsAgg.filter(Boolean).sort();

    return NextResponse.json(
      {
        success: true,
        teacher,
        submissions,
        courseOptions,
        pagination: {
          total,
          totalPages: Math.max(Math.ceil(total / limit), 1),
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET SUBMISSIONS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submissions',
      },
      { status: 500 }
    );
  }
}