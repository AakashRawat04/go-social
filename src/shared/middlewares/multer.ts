import multer, { FileFilterCallback } from 'multer';
import path from 'path';

export const MIME_TYPE = {
  IMAGE: /jpeg|jpg|png|gif/,
  VIDEO: /mp4|webm|ogg/,
  AUDIO: /mp3|wav/,
};

export const upload = (mimeType: RegExp) => {
  return multer({
    limits: { fileSize: 50000000 },
    fileFilter: function (_req, file, cb) {
      checkFileType(file, mimeType, cb);
    },
    storage: multer.memoryStorage(),
  });
};

function checkFileType(file: Express.Multer.File, mimeType: RegExp, cb: FileFilterCallback) {
  const extname = mimeType.test(path.extname(file.originalname).toLowerCase());

  const mimetype = mimeType.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Unsupported file format'));
  }
}
