import crypto from 'crypto';

export function isCloudinaryConfigured() {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

function signParams(params, apiSecret) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(sorted + apiSecret).digest('hex');
}

export async function uploadToCloudinary(buffer, fileName, mimeType) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const isImage = mimeType.startsWith('image/');
  const resourceType = isImage ? 'image' : 'raw';
  const timestamp = Math.floor(Date.now() / 1000);
  const extMatch = fileName.match(/\.[^.]+$/);
  const ext = extMatch ? extMatch[0] : '';
  const baseName = fileName.replace(/\.[^.]+$/, '').replace(/\s+/g, '-');
  const publicId = `${Date.now()}-${baseName}${!isImage ? ext : ''}`;

  const signPayload = {
    folder: 'assignment-portal',
    public_id: publicId,
    timestamp,
  };
  const signature = signParams(signPayload, apiSecret);

  const form = new FormData();
  form.append('file', new Blob([buffer], { type: mimeType }), fileName);
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('public_id', publicId);
  form.append('folder', 'assignment-portal');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: 'POST', body: form }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || 'Cloudinary upload failed');
  }

  return { fileUrl: data.secure_url, publicId: data.public_id };
}
