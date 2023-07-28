import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import routes from '@/api';
import { rateLimit } from 'express-rate-limit';
import config from '@/config';
import { errorHandler } from '@/shared/middlewares/errorHandler';

export default ({ app }: { app: express.Application }): void => {
  /**
   * Health Check endpoints
   */

  app.get('/healthcheck', (req, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    try {
      return res.json(healthcheck);
    } catch (e) {
      return res.status(503).send();
    }
  });

  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Middleware that helps secure app by setting headers
  app.use(helmet());

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(limiter);

  app.use(config.api.prefix, routes());

  app.use(errorHandler);
};
