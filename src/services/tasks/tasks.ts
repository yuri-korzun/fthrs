import { Application } from '../../declarations';
import { createSwaggerServiceOptions } from 'feathers-swagger';
import { taskQueryResolver, taskQuerySchema, tasksSchema } from './tasks.schema';
import { TasksClass } from './tasks.class';
import { authenticate } from '@feathersjs/authentication';
import { hooks as schemaHooks } from '@feathersjs/schema';
import { HookContext, NextFunction } from '@feathersjs/feathers';
import { Forbidden, NotFound } from "@feathersjs/errors";

export const tasksPath = 'tasks';

export const task = (app: Application) => {
  const taskService = new TasksClass();
  taskService.docs = createSwaggerServiceOptions({
    schemas: { taskSchema: tasksSchema, taskQuerySchema },
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
      all: [
        async (context: HookContext, next?: NextFunction) => {
          const user = context.arguments[context.arguments.length - 1].user;

          if (!user) {
            throw new NotFound('User not found');
          }

          if (user.role !== 'admin') {
            throw new Forbidden('Not allowed action');
          }

          if (next) {
            await next();
          }
        },
        schemaHooks.resolveQuery(taskQueryResolver)
      ]
    },
    after: {
      all: []
    },
    error: {}
  });
};
