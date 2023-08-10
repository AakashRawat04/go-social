import { Router } from 'express';
import postsRouter from './posts/posts.router';
import userRouter from './users/user.router';
import reelsRouter from './reels/reels.router';
import messagesRouter from './messages/messages.router';
import authenticateToken from '../shared/middlewares/authentication';

export default (): Router => {
  const app = Router();

  app.use('/posts', authenticateToken(), postsRouter());
  app.use('/users', authenticateToken(), userRouter());
  app.use('/reels', authenticateToken(), reelsRouter());
  app.use('/messages', authenticateToken(), messagesRouter());

  return app;
};
