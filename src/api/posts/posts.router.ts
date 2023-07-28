import { Router } from 'express';
import { createPost, getPosts } from './posts.controller';

import { MIME_TYPE, upload } from '@/shared/middlewares/multer';

export default (): Router => {
  const app = Router();

  app.get('/', getPosts);
  app.post('/create', upload(MIME_TYPE.IMAGE).single('image'), createPost);

  return app;
};
