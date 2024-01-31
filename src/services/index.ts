import type { Application } from '../declarations';
import { task } from './tasks/task.service';

export const services = (app: Application) => {
  app.configure(task);
};
