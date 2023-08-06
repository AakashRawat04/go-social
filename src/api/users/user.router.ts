import { Router } from 'express';
import { followUser, getUsers, getUserById, unfollowUser } from './user.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getUsers);

  app.post('/follow/:id', followUser);
  app.post('/unfollow/:id', unfollowUser);

  app.get('/:id', getUserById);

  return app;
};
