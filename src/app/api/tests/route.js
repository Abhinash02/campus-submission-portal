import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/mongodb/db';
import Test from '@/models/test';
import User from '@/models/user';
import { getWindowStatus } from '@/lib/timeWindow';

export const dynamic = 'force-dynamic';

function calcTotalMarks(questions) {
  return (questions || []).reduce((sum, q) => sum + (q.marks || 1), 0);
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get('teacherId')?.trim();
    const studentId = searchParams.get('studentId')?.trim();
    const forStudent = searchParams.get('forStudent') === 'true';

    const query = { isActive: true };

    if (teacherId) {
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return NextResponse.json({ success: false, message: 'Invalid teacherId' }, { status: 400 });
      }
      query.teacherId = teacherId;
    }

    if (forStudent && studentId) {
      const student = await User.findById(studentId).lean();
      if (!student) {
        return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
      }
      const filters = [];
      if (student.course) filters.push({ $or: [{ course: '' }, { course: student.course }] });
      if (student.className) filters.push({ $or: [{ className: '' }, { className: student.className }] });
      if (student.section) filters.push({ $or: [{ section: '' }, { section: student.section }] });
      if (filters.length) query.$and = filters;
    }

    const tests = await Test.find(query).sort({ closeAt: 1 }).lean();
    const now = new Date();

    const safeTests = tests.map((t) => {
      const { questions, ...rest } = t;
      return {
        ...rest,
        questionCount: questions?.length || 0,
        window: getWindowStatus(t.openAt, t.closeAt, now),
      };
    });

    return NextResponse.json({ success: true, tests: safeTests });
  } catch (error) {
    console.error('GET TESTS ERROR:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch tests' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const teacherId = String(body.teacherId || '').trim();
    const title = String(body.title || '').trim();
    const subject = String(body.subject || '').trim();
    const openAt = body.openAt;
    const closeAt = body.closeAt;
    const questions = body.questions || [];
    const course = String(body.course || '').trim();
    const className = String(body.className || '').trim();
    const section = String(body.section || '').trim();

    if (!teacherId || !title || !openAt || !closeAt) {
      return NextResponse.json(
        { success: false, message: 'teacherId, title, openAt and closeAt are required' },
        { status: 400 }
      );
    }

    if (!questions.length) {
      return NextResponse.json({ success: false, message: 'Add at least one question' }, { status: 400 });
    }

    for (const q of questions) {
      if (!q.text?.trim() || !q.options?.length || q.correctIndex === undefined) {
        return NextResponse.json(
          { success: false, message: 'Each question needs text, options and a correct answer' },
          { status: 400 }
        );
      }
      if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        return NextResponse.json({ success: false, message: 'Invalid correct answer index' }, { status: 400 });
      }
    }

    const teacher = await User.findById(teacherId).lean();
    if (!teacher || teacher.role !== 'TEACHER') {
      return NextResponse.json({ success: false, message: 'Invalid teacher' }, { status: 404 });
    }

    const cleanedQuestions = questions.map((q) => ({
      text: q.text.trim(),
      options: q.options.map((o) => String(o).trim()).filter(Boolean),
      correctIndex: Number(q.correctIndex),
      marks: Number(q.marks) || 1,
    }));

    const test = await Test.create({
      teacherId: teacher._id,
      teacherName: teacher.name || '',
      title,
      subject: subject || teacher.subject || '',
      questions: cleanedQuestions,
      totalMarks: calcTotalMarks(cleanedQuestions),
      openAt: new Date(openAt),
      closeAt: new Date(closeAt),
      course,
      className,
      section,
    });

    return NextResponse.json({ success: true, test }, { status: 201 });
  } catch (error) {
    console.error('CREATE TEST ERROR:', error);
    return NextResponse.json({ success: false, message: 'Failed to create test' }, { status: 500 });
  }
}
