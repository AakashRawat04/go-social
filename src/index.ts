import express from 'express';

import config from './config';
import Loaders from './loaders';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  app;
  const server = app
    .listen(config.PORT, () => {
      const url = process.env.NODE_ENV === 'production' ? config.PRODUCTION_URL : `http://localhost:${config.PORT}`;

      Logger.info(`
        ####################################################
        🛡️  Server listening on ${url} 🛡️
        ####################################################
        `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
