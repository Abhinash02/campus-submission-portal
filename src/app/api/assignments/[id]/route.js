import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import Assignment from '@/models/assignment';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const assignment = await Assignment.findById(params.id).lean();
    if (!assignment) {
      return NextResponse.json({ success: false, message: 'Assignment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch assignment' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Assignment.findByIdAndUpdate(params.id, { isActive: false });
    return NextResponse.json({ success: true, message: 'Assignment removed' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete assignment' }, { status: 500 });
  }
}
