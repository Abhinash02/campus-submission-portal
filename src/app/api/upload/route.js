import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dir = path.join(process.cwd(), 'public/uploads');
    await mkdir(dir, { recursive: true });

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(dir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ fileUrl: `/uploads/${fileName}` });
  } catch (error) {
    return NextResponse.json({ message: 'Upload failed', error: error.message }, { status: 500 });
  }
}