/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
export declare const fileFilter: (req: any, file: any, cb: any) => any;
export declare const cloudinaryUploader: (file: Express.Multer.File) => Promise<string>;
