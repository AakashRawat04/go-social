import { Router } from 'express';
import { getUsers } from './user.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getUsers);

  return app;
};
