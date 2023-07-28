import { Router } from 'express';
import { createReel, getReels } from './reels.controller';
import { MIME_TYPE, upload } from '@/shared/middlewares/multer';

export default (): Router => {
  const app = Router();

  app.get('/', getReels);
  app.post('/create', upload(MIME_TYPE.VIDEO).single('video'), createReel);

  return app;
};
