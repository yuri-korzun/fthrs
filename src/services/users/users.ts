import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  userDataValidator,
  userPatchValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userSchema,
  userDataSchema,
  userPatchSchema,
  userQuerySchema
} from './users.schema';

import type { Application } from '../../declarations';
import { UserService, getOptions } from './users.class';
import { createSwaggerServiceOptions } from 'feathers-swagger';

export const userPath = 'users';
export const userMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export * from './users.class';
export * from './users.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {
  // Register our service on the Feathers application
  const userService = new UserService();

  app.use(userPath, userService, {
    id: 'users',
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { userSchema, userDataSchema, userPatchSchema, userQuerySchema },
      docs: {
        // any options for service.docs can be added here
        securities: ['find', 'get', 'patch', 'remove']
      }
    })
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      // all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(userDataValidator), schemaHooks.resolveData(userDataResolver)],
      patch: [schemaHooks.validateData(userPatchValidator), schemaHooks.resolveData(userPatchResolver)],
      remove: []
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
