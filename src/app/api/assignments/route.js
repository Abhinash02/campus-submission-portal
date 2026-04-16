import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import Assignment from '@/models/submission';

export async function GET() {
  try {
    await connectDB();

    const assignments = await Assignment.find({})
      .populate('studentId', 'name loginId email course')
      .populate('teacherId', 'name loginId email subject')
      .sort({ createdAt: -1 });

    return NextResponse.json(assignments, { status: 200 });
  } catch (error) {
    console.error('GET ASSIGNMENTS ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      studentId,
      teacherId,
      status,
      marks,
      submissionText,
    } = body;

    if (!title || !studentId || !teacherId) {
      return NextResponse.json(
        { message: 'Title, studentId and teacherId are required' },
        { status: 400 }
      );
    }

    const assignment = await Assignment.create({
      title: title.trim(),
      description: description || '',
      studentId,
      teacherId,
      status: status || 'PENDING',
      marks: marks || 0,
      submissionText: submissionText || '',
    });

    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('studentId', 'name loginId email course')
      .populate('teacherId', 'name loginId email subject');

    return NextResponse.json(
      {
        message: 'Assignment created successfully',
        assignment: populatedAssignment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE ASSIGNMENT ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}