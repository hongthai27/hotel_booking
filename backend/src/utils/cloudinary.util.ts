import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.config';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string): Promise<string> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'hotel-booking',
  });
  return result.secure_url;
};

export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export const deleteCloudinaryImage = async (imageUrl: string): Promise<void> => {
  try {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) return;

    const urlParts = imageUrl.split('/upload/');
    if (urlParts.length === 2) {
      const afterUpload = urlParts[1]; 
      const pathWithoutVersion = afterUpload.replace(/^v\d+\//, ''); 
      const publicId = pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf('.')); 
      
      await cloudinary.uploader.destroy(publicId);
      console.log(`[Cloudinary] Đã xóa ảnh rác: ${publicId}`);
    }
  } catch (err) {
    console.error('[Cloudinary] Xóa ảnh thất bại:', err);
  }
};