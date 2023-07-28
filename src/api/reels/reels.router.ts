import { Router } from 'express';
import { getReels } from './reels.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getReels);

  return app;
};
