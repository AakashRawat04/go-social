import { Router } from 'express';
import { createPost, dislikePost, getPosts, likePost, undislikePost, unlikePost } from './posts.controller';

import { MIME_TYPE, upload } from '@/shared/middlewares/multer';

export default (): Router => {
  const app = Router();

  app.get('/', getPosts);
  app.post('/create', upload(MIME_TYPE.IMAGE).single('image'), createPost);
  app.get('/like/:id', likePost);
  app.get('/unlike/:id', unlikePost);
  app.get('/dislike/:id', dislikePost);
  app.get('/undislike/:id', undislikePost);

  return app;
};
