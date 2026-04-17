// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const assignment = await Submission.findById(params.id);

//     if (!assignment) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Submission not found',
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         assignment,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSION BY ID ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submission',
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const { status, marks, feedback, reviewedBy } = body;

//     const updatedAssignment = await Submission.findByIdAndUpdate(
//       params.id,
//       {
//         $set: {
//           status: status || 'Submitted',
//           marks: Number(marks) || 0,
//           feedback: feedback || '',
//           reviewedBy: reviewedBy || '',
//         },
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedAssignment) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Submission not found',
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission updated successfully',
//         assignment: updatedAssignment,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to update submission',
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();

//     const deletedAssignment = await Submission.findByIdAndDelete(params.id);

//     if (!deletedAssignment) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Submission not found',
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission deleted successfully',
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('DELETE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to delete submission',
//       },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;

//     const submission = await Submission.findById(id).lean();

//     if (!submission) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Submission not found',
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       submission,
//     });
//   } catch (error) {
//     console.error('GET SUBMISSION BY ID ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submission',
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;
//     const body = await req.json();

//     const {
//       teacherId,
//       status,
//       marks,
//       feedback,
//       reviewedBy,
//     } = body;

//     const existingSubmission = await Submission.findById(id);

//     if (!existingSubmission) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Submission not found',
//         },
//         { status: 404 }
//       );
//     }

//     if (!teacherId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Teacher ID is required',
//         },
//         { status: 400 }
//       );
//     }

//     if (
//       existingSubmission.teacherId?.toString() !== teacherId?.toString()
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'You are not allowed to update this submission',
//         },
//         { status: 403 }
//       );
//     }

//     const allowedStatuses = ['Submitted', 'Under Review', 'Checked'];

//     if (status && !allowedStatuses.includes(status)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Invalid status value',
//         },
//         { status: 400 }
//       );
//     }

//     const parsedMarks = Number(marks);

//     if (marks !== undefined && (Number.isNaN(parsedMarks) || parsedMarks < 0 || parsedMarks > 100)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Marks must be between 0 and 100',
//         },
//         { status: 400 }
//       );
//     }

//     existingSubmission.status = status ?? existingSubmission.status;
//     existingSubmission.marks = marks !== undefined ? parsedMarks : existingSubmission.marks;
//     existingSubmission.feedback = feedback ?? existingSubmission.feedback;
//     existingSubmission.reviewedBy = reviewedBy ?? existingSubmission.reviewedBy;
//     existingSubmission.reviewedAt = new Date();

//     await existingSubmission.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Submission updated successfully',
//       assignment: existingSubmission,
//     });
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to update submission',
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const { teacherId, status, marks, feedback, reviewedBy } = body;

//     const auth = await getAuthTeacherId(req); // reuse from above
//     if (!auth.success) {
//       return NextResponse.json(
//         { success: false, message: auth.error },
//         { status: auth.status }
//       );
//     }

//     // If provided `teacherId` doesn't match the logged‑in teacher, reject
//     if (!teacherId || teacherId !== String(auth.teacherId)) {
//       return NextResponse.json(
//         { success: false, message: 'Access denied' },
//         { status: 403 }
//       );
//     }

//     const updated = await Submission.findByIdAndUpdate(
//       params.id,
//       {
//         status,
//         marks,
//         feedback,
//         reviewedBy,
//         reviewedAt: new Date(),
//       },
//       { new: true, runValidators: true }
//     ).lean();

//     if (!updated) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, assignment: updated },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to update submission' },
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

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const submissionId = params?.id;

    if (!submissionId || !mongoose.Types.ObjectId.isValid(submissionId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid submission ID' },
        { status: 400 }
      );
    }

    const body = await req.json();

    const teacherId = String(body.teacherId || '').trim();
    const status = String(body.status || '').trim();
    const feedback = String(body.feedback || '').trim();
    const reviewedBy = String(body.reviewedBy || '').trim();
    const marks = Number(body.marks);

    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
      return NextResponse.json(
        { success: false, message: 'Valid teacherId is required' },
        { status: 400 }
      );
    }

    const allowedStatuses = ['Submitted', 'Under Review', 'Checked'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }

    if (Number.isNaN(marks) || marks < 0 || marks > 100) {
      return NextResponse.json(
        { success: false, message: 'Marks must be between 0 and 100' },
        { status: 400 }
      );
    }

    const teacher = await User.findById(teacherId).lean();

    if (!teacher) {
      return NextResponse.json(
        { success: false, message: 'Teacher not found' },
        { status: 404 }
      );
    }

    if (String(teacher.role || '').toUpperCase() !== 'TEACHER') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only teachers can update submissions' },
        { status: 403 }
      );
    }

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }

    if (!submission.teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: 'This submission is not assigned to any teacher',
        },
        { status: 403 }
      );
    }

    if (String(submission.teacherId) !== teacherId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access denied. You can update only your own assigned submissions',
        },
        { status: 403 }
      );
    }

    submission.status = status;
    submission.marks = marks;
    submission.feedback = feedback;
    submission.reviewedBy = reviewedBy || teacher.name || '';
    submission.teacherName = submission.teacherName || teacher.name || '';
    submission.teacherLoginId = submission.teacherLoginId || teacher.loginId || '';

    await submission.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Submission updated successfully',
        assignment: submission,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('UPDATE SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to update submission',
      },
      { status: 500 }
    );
  }
}