import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {
      uploadsFolder: string;
    };
    s3: {
      bucket: string;
      region: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },
    }),
  },
  config: {
    disk: { uploadsFolder: path.resolve(tmpFolder, 'uploads') },
    s3: {
      bucket: process.env.STORAGE_BUCKET,
      region: 'us-east-1',
    },
  },
} as IUploadConfig;
