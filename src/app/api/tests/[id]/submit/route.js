import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/mongodb/db';
import Test from '@/models/test';
import TestAttempt from '@/models/testAttempt';
import User from '@/models/user';
import { getWindowStatus } from '@/lib/timeWindow';

export const dynamic = 'force-dynamic';

export async function POST(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const studentId = String(body.studentId || '').trim();
    const answers = body.answers || [];

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json({ success: false, message: 'Valid studentId required' }, { status: 400 });
    }

    const test = await Test.findById(params.id).lean();
    if (!test || !test.isActive) {
      return NextResponse.json({ success: false, message: 'Test not found' }, { status: 404 });
    }

    const window = getWindowStatus(test.openAt, test.closeAt);
    if (!window.open) {
      return NextResponse.json({ success: false, message: window.message }, { status: 403 });
    }

    const existing = await TestAttempt.findOne({ testId: test._id, studentId }).lean();
    if (existing) {
      return NextResponse.json({ success: false, message: 'You already submitted this test' }, { status: 409 });
    }

    const student = await User.findById(studentId).lean();
    if (!student || student.role !== 'STUDENT') {
      return NextResponse.json({ success: false, message: 'Invalid student' }, { status: 403 });
    }

    const gradedAnswers = test.questions.map((q, idx) => {
      const submitted = answers.find((a) => a.questionIndex === idx);
      const selectedIndex = submitted ? Number(submitted.selectedIndex) : -1;
      const isCorrect = selectedIndex === q.correctIndex;
      return {
        questionIndex: idx,
        selectedIndex,
        isCorrect,
        marksAwarded: isCorrect ? (q.marks || 1) : 0,
      };
    });

    const marksObtained = gradedAnswers.reduce((s, a) => s + a.marksAwarded, 0);

    const attempt = await TestAttempt.create({
      testId: test._id,
      studentId: student._id,
      studentName: student.name || '',
      studentLoginId: student.loginId || '',
      testTitle: test.title,
      subject: test.subject || '',
      answers: gradedAnswers,
      marksObtained,
      totalMarks: test.totalMarks,
    });

    return NextResponse.json({
      success: true,
      message: 'Test submitted',
      result: {
        marksObtained,
        totalMarks: test.totalMarks,
        answers: gradedAnswers,
        attemptId: attempt._id,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: 'You already submitted this test' }, { status: 409 });
    }
    console.error('TEST SUBMIT ERROR:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit test' }, { status: 500 });
  }
}
