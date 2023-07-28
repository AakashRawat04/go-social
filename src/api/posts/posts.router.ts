import { Router } from 'express';
import { createPost, getPosts } from './posts.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getPosts);
  app.post('/', createPost);

  return app;
};
