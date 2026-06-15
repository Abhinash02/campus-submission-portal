import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import Test from '@/models/test';
import { getWindowStatus } from '@/lib/timeWindow';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const includeAnswers = searchParams.get('includeAnswers') === 'true';

    const test = await Test.findById(params.id).lean();
    if (!test || !test.isActive) {
      return NextResponse.json({ success: false, message: 'Test not found' }, { status: 404 });
    }

    const safe = { ...test };
    if (!includeAnswers && safe.questions) {
      safe.questions = safe.questions.map(({ text, options, marks }) => ({
        text,
        options,
        marks,
      }));
    }

    safe.window = getWindowStatus(test.openAt, test.closeAt);

    return NextResponse.json({ success: true, test: safe });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch test' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Test.findByIdAndUpdate(params.id, { isActive: false });
    return NextResponse.json({ success: true, message: 'Test removed' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete test' }, { status: 500 });
  }
}
