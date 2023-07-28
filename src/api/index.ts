import { Router } from 'express';
import postsRouter from './posts/posts.router';
import userRouter from './users/user.router';

export default (): Router => {
  const app = Router();

  app.use('/posts', postsRouter());
  app.use('/users', userRouter());
  // app.use('/reels', reelsRouter());
  // app.use('/messages', messagesRouter());

  return app;
};
