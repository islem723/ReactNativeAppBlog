import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core'; // Add this import for ParamsDictionary
import { RequestHandler } from 'express';

import { dirname, join } from 'path';
import multer, { diskStorage } from 'multer';

const MIME_TYPES: Record<string, string> = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/apng': 'apng',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/jfif': 'jfif',
};

const storage = diskStorage({
  destination: (req, file, callback) => {
    const _dirname = dirname(__filename);
    callback(null, join(_dirname, '../../uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.${MIME_TYPES[file.mimetype]}`);
  },
});

const upload: RequestHandler<ParamsDictionary, any, any, any> = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('image');

export default function imageUpload(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  upload(req, res, (err) => {
    if (err) {
      // Handle the error appropriately
      return res.status(500).json({ error: err.message });
    }
    next();
  });
}
