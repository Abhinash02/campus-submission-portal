import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { isCloudinaryConfigured, uploadToCloudinary } from '@/lib/cloudinary';

const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const mimeType = file.type || 'application/octet-stream';
    if (!ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { success: false, message: 'Only PDF and image files are allowed' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = file.name.replace(/\s+/g, '-');

    if (isCloudinaryConfigured()) {
      const { fileUrl } = await uploadToCloudinary(buffer, safeName, mimeType);
      return NextResponse.json({ success: true, fileUrl, fileName: safeName });
    }

    const dir = path.join(process.cwd(), 'public/uploads');
    await mkdir(dir, { recursive: true });
    const storedName = `${Date.now()}-${safeName}`;
    await writeFile(path.join(dir, storedName), buffer);

    return NextResponse.json({
      success: true,
      fileUrl: `/uploads/${storedName}`,
      fileName: safeName,
    });
  } catch (error) {
    console.error('UPLOAD ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed', error: error.message },
      { status: 500 }
    );
  }
}
