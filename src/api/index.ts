import { Router } from 'express';
import postsRouter from './posts/posts.router';
import userRouter from './users/user.router';
import reelsRouter from './reels/reels.router';
import messagesRouter from './messages/messages.router';
import authenticateToken from '../shared/middlewares/authentication';
import { db } from '@/loaders/database';

export default (): Router => {
  const app = Router();

  app.use('/posts', authenticateToken(), postsRouter());
  app.use('/users', authenticateToken(), userRouter());
  app.use('/reels', authenticateToken(), reelsRouter());
  app.use('/messages', authenticateToken(), messagesRouter());

  app.use('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const { data, error } = await (await db()).auth.signInWithPassword({ email, password });

      if (error) {
        throw {
          statusCode: 400,
          message: error.message,
        };
      }
      const token = data.session.access_token;

      res.json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  });
  return app;
};
