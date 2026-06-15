import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import Submission from '@/models/submission';
import TestAttempt from '@/models/testAttempt';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const studentLoginId = searchParams.get('studentLoginId')?.trim();
    const studentId = searchParams.get('studentId')?.trim();

    if (!studentLoginId && !studentId) {
      return NextResponse.json(
        { success: false, message: 'studentLoginId or studentId required' },
        { status: 400 }
      );
    }

    const subQuery = studentLoginId ? { studentLoginId } : { studentId };
    const attemptQuery = studentId ? { studentId } : { studentLoginId };

    const [submissions, attempts] = await Promise.all([
      Submission.find({ ...subQuery, status: 'Checked' })
        .select('title subject marks createdAt updatedAt')
        .sort({ updatedAt: 1 })
        .lean(),
      TestAttempt.find(attemptQuery)
        .select('testTitle subject marksObtained totalMarks submittedAt')
        .sort({ submittedAt: 1 })
        .lean(),
    ]);

    const assignmentMarks = submissions.map((s) => ({
      type: 'assignment',
      title: s.title,
      subject: s.subject || 'General',
      marks: s.marks || 0,
      total: 100,
      date: s.updatedAt || s.createdAt,
    }));

    const testMarks = attempts.map((a) => ({
      type: 'test',
      title: a.testTitle,
      subject: a.subject || 'General',
      marks: a.marksObtained,
      total: a.totalMarks,
      date: a.submittedAt,
    }));

    const allRecords = [...assignmentMarks, ...testMarks].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let running = 0;
    const growth = allRecords.map((r, i) => {
      const pct = r.total ? Math.round((r.marks / r.total) * 100) : 0;
      running += pct;
      return { ...r, percentage: pct, cumulativeAvg: Math.round(running / (i + 1)) };
    });

    const bySubject = {};
    allRecords.forEach((r) => {
      const sub = r.subject || 'General';
      if (!bySubject[sub]) bySubject[sub] = { total: 0, count: 0, marks: 0, maxMarks: 0 };
      bySubject[sub].count += 1;
      bySubject[sub].marks += r.marks;
      bySubject[sub].maxMarks += r.total;
      bySubject[sub].total = bySubject[sub].maxMarks
        ? Math.round((bySubject[sub].marks / bySubject[sub].maxMarks) * 100)
        : 0;
    });

    const totalAssignmentMarks = submissions.reduce((s, x) => s + (x.marks || 0), 0);
    const totalTestMarks = attempts.reduce((s, x) => s + (x.marksObtained || 0), 0);

    return NextResponse.json({
      success: true,
      summary: {
        assignmentsChecked: submissions.length,
        testsTaken: attempts.length,
        totalAssignmentMarks,
        totalTestMarks,
        overallItems: allRecords.length,
      },
      growth,
      bySubject,
      records: allRecords,
    });
  } catch (error) {
    console.error('MARKS DASHBOARD ERROR:', error);
    return NextResponse.json({ success: false, message: 'Failed to load marks' }, { status: 500 });
  }
}
