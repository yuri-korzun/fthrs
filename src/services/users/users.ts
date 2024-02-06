import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  userResolver,
  userExternalResolver,
  userSchema,
  userDataSchema,
  userPatchSchema,
  userQuerySchema
} from './users.schema';

import type { Application } from '../../declarations';
import { UserService, getOptions } from './users.class';
import { createSwaggerServiceOptions } from 'feathers-swagger';

export const userPath = 'users';
export const userMethods = ['find', 'get'] as const;

export * from './users.class';
export * from './users.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {
  const userService = new UserService();

  app.use(userPath, userService, {
    id: 'users',
    methods: userMethods,
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { userSchema, userDataSchema, userPatchSchema, userQuerySchema },
      docs: {
        securities: ['find', 'get']
      }
    })
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')]
    },
    before: {
      // all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [],
      get: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService;
  }
}
