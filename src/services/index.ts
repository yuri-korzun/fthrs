import { user } from './users/users';
import type { Application } from '../declarations';
import { task } from './tasks/tasks';

export const services = (app: Application) => {
  app.configure(user);
  app.configure(task);
};
