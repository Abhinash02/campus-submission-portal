import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { auth } from '@/lib/auth';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'STUDENT') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const description = formData.get('description');
    const teacherId = formData.get('teacherId');
    const file = formData.get('file');

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: { user: true },
    });

    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });

    let fileUrl = null;

    if (file && typeof file !== 'string' && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const dir = path.join(process.cwd(), 'public/uploads');
      await mkdir(dir, { recursive: true });
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      await writeFile(path.join(dir, fileName), buffer);
      fileUrl = `/uploads/${fileName}`;
    }

    await prisma.assignmentSubmission.create({
      data: {
        studentId: student.id,
        teacherId,
        description,
        fileUrl,
        status: 'PENDING',
      },
    });

    await prisma.notification.create({
      data: {
        teacherId,
        message: `New assignment submitted by ${student.user.name} (${student.user.rollNo})`,
      },
    });

    return NextResponse.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Submission failed', error: error.message }, { status: 500 });
  }
}