import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'cityguardian_complaints',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result?.secure_url || '');
        }
      )
      .end(file);
  });
};

export default cloudinary;