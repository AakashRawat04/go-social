import { Router } from 'express';
import { getMessages, sendMessage } from './messages.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getMessages);
  app.post('/', sendMessage);

  return app;
};
