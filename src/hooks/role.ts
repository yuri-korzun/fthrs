import { HookContext, NextFunction } from '@feathersjs/feathers';
import { Forbidden, GeneralError } from '@feathersjs/errors';

export const checkRole = async (context: HookContext, next?: NextFunction) => {
  const user = context.arguments[context.arguments.length - 1].user;

  if (!user) {
    throw new GeneralError('User not found');
  }

  if (user.role !== 'admin') {
    throw new Forbidden('Not allowed action');
  }

  if (next) {
    await next();
  }
};
