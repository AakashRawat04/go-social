import multer, { FileFilterCallback } from 'multer';
import path from 'path';

export const upload = multer({
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, './tmp/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
      cb(null, `${req.params.slug}-${uniqueSuffix}${path.extname(file.originalname).toLowerCase()}`);
    },
  }),
});

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Unsupported file format'));
  }
}
