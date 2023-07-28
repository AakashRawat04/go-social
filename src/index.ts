import express from 'express';

import config from './config';
import Loaders from './loaders';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  app
    .listen(config.PORT, () => {
      Logger.info(`
      ####################################################
      🛡️  Server listening on http://localhost:${config.PORT} 🛡️
      ####################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
