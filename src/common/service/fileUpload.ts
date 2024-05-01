import { BadRequestException } from '@nestjs/common';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';

import { ConfigService } from '@nestjs/config';
const config = new ConfigService();

export const fileFilter = (req, file, cb) => {
  // Check if the file is an image and its size is <= 2MB
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new BadRequestException('Only image files are allowed!'), false);
  }
  cb(null, true);
};

export const cloudinaryUploader = async (
  file: Express.Multer.File,
): Promise<string> => {
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: config.get('CLOUDINARY_NAME'),
    api_key: config.get('CLOUDINARY_API_KEY'),
    api_secret: config.get('CLOUDINARY_API_SECRET'),
  });

  return new Promise<string>((resolve, reject) => {
    try {
      if (!file || !file.buffer) {
        reject(new Error('Invalid file object or buffer.'));
        return;
      }

      const uploadOptions: UploadApiOptions = {
        resource_type: 'auto',
        folder: 'lisaprop',
        transformation: {
          quality: 'auto',
        },
      };

      const uploadCallback = (error: any, result: any) => {
        if (error) {
          reject(new Error('Error uploading file to Cloudinary.'));
        } else {
          resolve(result.secure_url);
        }
      };

      cloudinary.uploader
        .upload_stream(uploadOptions, uploadCallback)
        .end(file.buffer);
    } catch (error) {
      reject(new Error('Error creating upload stream.'));
    }
  });
};

// COMMENTED CODE

// import { MulterModuleOptions } from '@nestjs/platform-express/multer/interfaces';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { BadRequestException } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';

// // Multer options for file uploads
// export const storage = diskStorage({
//   destination: './uploads', // Define the upload directory
//   filename: (req, file, cb) => {
//     // Generate a unique filename
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
//   },
// });

// export const fileFilter = (req, file, cb) => {
//   // Check if the file is an image and its size is <= 2MB
//   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//     return cb(new BadRequestException('Only image files are allowed!'), false);
//   }
//   if (file.size > 2 * 1024 * 1024) {
//     return cb(
//       new BadRequestException('File size should not exceed 2MB!'),
//       false,
//     );
//   }
//   cb(null, true);
// };

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'daogordsm',
//   api_key: '471187261754322',
//   api_secret: 'qhZUsPF-WlEQlSgcyOne3w1at34',
// });

// export const cloudinaryUploader = async (
//   file: Express.Multer.File,
// ): Promise<string> => {
//   return new Promise<string>((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,
//       { folder: 'lisaprop' },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.url); // Return the Cloudinary URL of the uploaded file
//         }
//       },
//     );
//   });
// };
