import { Router } from 'express';
import { followUser, getUsers, getUserById, unfollowUser } from './user.controller';
import { db } from '@/loaders/database';

export default (): Router => {
  const app = Router();

  app.get('/', getUsers);

  app.post('/get-token', async (req, res, next) => {
    try {
      const { data, error } = await (
        await db()
      ).auth.signInWithPassword({
        email: 'mkc@test.com',
        password: 'mkc',
      });

      if (error) {
        throw {
          statusCode: 400,
          message: error.message,
        };
      }

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  app.post('/follow/:id', followUser);
  app.post('/unfollow/:id', unfollowUser);

  app.get('/:id', getUserById);

  return app;
};
