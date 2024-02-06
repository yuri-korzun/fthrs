import { Application } from '../../declarations';
import { createSwaggerServiceOptions } from 'feathers-swagger';
import { taskQueryProperties, tasksSchema } from './tasks.schema';
import { TasksClass } from './tasks.class';
import { authenticate } from '@feathersjs/authentication';
import { checkRole } from '../../hooks/role';

export const tasksPath = 'tasks';

export const task = (app: Application) => {
  const taskService = new TasksClass();
  taskService.docs = createSwaggerServiceOptions({
    schemas: { taskSchema: tasksSchema, taskQuerySchema: taskQueryProperties },
    docs: {
      securities: ['find', 'get', 'create', 'update', 'remove']
    }
  });

  app.use(tasksPath, taskService);

  app.service(tasksPath).hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      remove: [checkRole]
    },
    after: {
      all: []
    },
    error: {}
  });
};
