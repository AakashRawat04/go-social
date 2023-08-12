import { Router } from 'express';
import { createReel, dislikeReel, getReels, likeReel, undislikeReel, unlikeReel } from './reels.controller';
import { MIME_TYPE, upload } from '@/shared/middlewares/multer';

export default (): Router => {
  const app = Router();

  app.get('/', getReels);
  app.post('/create', upload(MIME_TYPE.VIDEO).single('video'), createReel);
  app.get('/like/:id', likeReel);
  app.get('/unlike/:id', unlikeReel);
  app.get('/dislike/:id', dislikeReel);
  app.get('/undislike/:id', undislikeReel);

  return app;
};
