import { app } from './app';
import { logger } from './logger';
import { appConfig } from './config';

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason));

app.listen(appConfig.port).then(() => {
  logger.info(`Feathers app listening on http://${appConfig.host}:${appConfig.port}`);
});
