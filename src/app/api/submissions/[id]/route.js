// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;
//     const body = await req.json();

//     const { status, marks, feedback, reviewedBy } = body;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: 'Submission id is required' },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.findByIdAndUpdate(
//       id,
//       {
//         status: status || 'Submitted',
//         marks: Number(marks) || 0,
//         feedback: feedback || '',
//         reviewedBy: reviewedBy || '',
//       },
//       { new: true }
//     );

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission updated successfully',
//         submission,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to update submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;
//     const body = await req.json();

//     const { status, marks, feedback, reviewedBy } = body;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: 'Submission id is required' },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.findByIdAndUpdate(
//       id,
//       {
//         status: status || 'Submitted',
//         marks: Number(marks) || 0,
//         feedback: feedback || '',
//         reviewedBy: reviewedBy || '',
//       },
//       { new: true }
//     );

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission updated successfully',
//         submission,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to update submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;
//     const body = await req.json();

//     const { status, marks, feedback, reviewedBy } = body;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: 'Submission id is required' },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.findByIdAndUpdate(
//       id,
//       {
//         status: status || 'Submitted',
//         marks: Number(marks) || 0,
//         feedback: feedback || '',
//         reviewedBy: reviewedBy || '',
//       },
//       { new: true }
//     );

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission updated successfully',
//         submission,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to update submission',
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

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const submission = await Submission.findById(params.id)
//       .populate('studentId', 'name loginId className course')
//       .populate('teacherId', 'name loginId subject className');

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, submission },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to fetch submission',
//         error: error.message,
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

//     const submission = await Submission.findById(params.id);

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     submission.status = status || submission.status;
//     submission.marks = Number(marks) || 0;
//     submission.feedback = feedback || '';
//     submission.reviewedBy = reviewedBy || '';

//     await submission.save();

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission updated successfully',
//         submission,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to update submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();

//     const deleted = await Submission.findByIdAndDelete(params.id);

//     if (!deleted) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: 'Submission deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('DELETE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to delete submission',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function GET(request, { params }) {
//   try {
//     await connectDB();

//     const submission = await Submission.findById(params.id)
//       .populate('studentId', 'name loginId email course className section')
//       .populate('teacherId', 'name loginId email subject className');

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       submission,
//     });
//   } catch (error) {
//     console.error('GET SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch submission' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     await connectDB();

//     const body = await request.json();
//     const { status, marks, feedback, reviewedBy, teacherId } = body;

//     if (!teacherId) {
//       return NextResponse.json(
//         { success: false, message: 'teacherId is required' },
//         { status: 400 }
//       );
//     }

//     const updatedSubmission = await Submission.findByIdAndUpdate(
//       params.id,
//       {
//         status,
//         marks: Number(marks) || 0,
//         feedback: feedback || '',
//         reviewedBy: reviewedBy || '',
//         teacherId,
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     )
//       .populate('studentId', 'name loginId email course className section')
//       .populate('teacherId', 'name loginId email subject className');

//     if (!updatedSubmission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Submission updated successfully',
//       submission: updatedSubmission,
//     });
//   } catch (error) {
//     console.error('PUT SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Failed to update submission' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     await connectDB();

//     const deletedSubmission = await Submission.findByIdAndDelete(params.id);

//     if (!deletedSubmission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Submission deleted successfully',
//     });
//   } catch (error) {
//     console.error('DELETE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete submission' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const { teacherId, status, marks, feedback, reviewedBy } = body;

//     if (!teacherId) {
//       return NextResponse.json(
//         { success: false, message: 'teacherId is required' },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.findOne({
//       _id: params.id,
//       teacherId,
//     });

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found or unauthorized' },
//         { status: 404 }
//       );
//     }

//     submission.status = status ?? submission.status;
//     submission.marks = marks ?? submission.marks;
//     submission.feedback = feedback ?? submission.feedback;
//     submission.reviewedBy = reviewedBy ?? submission.reviewedBy;

//     await submission.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Submission updated successfully',
//       assignment: submission,
//     });
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to update submission' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const { teacherId, status, marks, feedback, reviewedBy } = body;

//     if (!teacherId) {
//       return NextResponse.json(
//         { success: false, message: 'teacherId is required' },
//         { status: 400 }
//       );
//     }

//     const submission = await Submission.findOne({
//       _id: params.id,
//       teacherId: String(teacherId),
//     });

//     if (!submission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found or unauthorized' },
//         { status: 404 }
//       );
//     }

//     submission.status = status ?? submission.status;
//     submission.marks = marks ?? submission.marks;
//     submission.feedback = feedback ?? submission.feedback;
//     submission.reviewedBy = reviewedBy ?? submission.reviewedBy;

//     await submission.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Submission updated successfully',
//       assignment: submission,
//     });
//   } catch (error) {
//     console.error('UPDATE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to update submission' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import Submission from '@/models/submission';

// export const dynamic = 'force-dynamic';

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const updatedSubmission = await Submission.findByIdAndUpdate(
//       params.id,
//       {
//         status: body.status,
//         marks: Number(body.marks) || 0,
//         feedback: body.feedback || '',
//         reviewedBy: body.reviewedBy || '',
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedSubmission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Submission updated successfully',
//         submission: updatedSubmission,
//       },
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

// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();

//     const deletedSubmission = await Submission.findByIdAndDelete(params.id);

//     if (!deletedSubmission) {
//       return NextResponse.json(
//         { success: false, message: 'Submission not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: 'Submission deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('DELETE SUBMISSION ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete submission' },
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

import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import Submission from '@/models/submission';
import User from '@/models/user';

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();

    const teacherId = String(body.teacherId || '').trim();
    const status = String(body.status || '').trim();
    const feedback = String(body.feedback || '').trim();
    const reviewedBy = String(body.reviewedBy || '').trim();
    const marks = Number(body.marks ?? 0);

    if (!teacherId) {
      return NextResponse.json(
        { success: false, message: 'teacherId is required' },
        { status: 400 }
      );
    }

    const teacher = await User.findById(teacherId).lean();
    if (!teacher || teacher.role !== 'TEACHER') {
      return NextResponse.json(
        { success: false, message: 'Invalid teacher' },
        { status: 403 }
      );
    }

    const submission = await Submission.findById(params.id);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }

    if (String(submission.teacherId || '') !== teacherId) {
      return NextResponse.json(
        { success: false, message: 'You can only review your own submissions' },
        { status: 403 }
      );
    }

    submission.status = status || submission.status;
    submission.marks = Math.max(0, Math.min(100, marks));
    submission.feedback = feedback;
    submission.reviewedBy = reviewedBy || teacher.name || '';

    await submission.save();

    return NextResponse.json(
      {
        success: true,
        assignment: submission,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('UPDATE SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update submission',
      },
      { status: 500 }
    );
  }
}