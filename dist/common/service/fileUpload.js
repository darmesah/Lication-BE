"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUploader = exports.fileFilter = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
const config = new config_1.ConfigService();
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.fileFilter = fileFilter;
const cloudinaryUploader = async (file) => {
    cloudinary_1.v2.config({
        cloud_name: config.get('CLOUDINARY_NAME'),
        api_key: config.get('CLOUDINARY_API_KEY'),
        api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
    return new Promise((resolve, reject) => {
        try {
            if (!file || !file.buffer) {
                reject(new Error('Invalid file object or buffer.'));
                return;
            }
            const uploadOptions = {
                resource_type: 'auto',
                folder: 'lisaprop',
                transformation: {
                    quality: 'auto',
                },
            };
            const uploadCallback = (error, result) => {
                if (error) {
                    reject(new Error('Error uploading file to Cloudinary.'));
                }
                else {
                    resolve(result.secure_url);
                }
            };
            cloudinary_1.v2.uploader
                .upload_stream(uploadOptions, uploadCallback)
                .end(file.buffer);
        }
        catch (error) {
            reject(new Error('Error creating upload stream.'));
        }
    });
};
exports.cloudinaryUploader = cloudinaryUploader;
//# sourceMappingURL=fileUpload.js.map