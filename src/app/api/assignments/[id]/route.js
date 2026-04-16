import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import Assignment from '@/models/submission';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const assignment = await Assignment.findById(params.id)
      .populate('studentId', 'name loginId email course')
      .populate('teacherId', 'name loginId email subject');

    if (!assignment) {
      return NextResponse.json(
        { message: 'Assignment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(assignment, { status: 200 });
  } catch (error) {
    console.error('GET ASSIGNMENT BY ID ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to fetch assignment' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
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

    const updateData = {
      title,
      description,
      studentId,
      teacherId,
      status,
      marks,
      submissionText,
    };

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('studentId', 'name loginId email course')
      .populate('teacherId', 'name loginId email subject');

    if (!updatedAssignment) {
      return NextResponse.json(
        { message: 'Assignment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Assignment updated successfully',
        assignment: updatedAssignment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('UPDATE ASSIGNMENT ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to update assignment' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedAssignment = await Assignment.findByIdAndDelete(params.id);

    if (!deletedAssignment) {
      return NextResponse.json(
        { message: 'Assignment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Assignment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE ASSIGNMENT ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to delete assignment' },
      { status: 500 }
    );
  }
}