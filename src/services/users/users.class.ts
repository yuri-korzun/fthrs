import type { Id, Params, ServiceInterface } from '@feathersjs/feathers';

import type { Application } from '../../declarations';
import type { User, UserData, UserPatch, UserQuery } from './users.schema';
import { BadRequest } from '@feathersjs/errors';
import { usersData } from '../../data/users-data';

export type { User, UserData, UserPatch, UserQuery };

export interface UserParams extends Params<UserQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class UserService<ServiceParams extends UserParams = UserParams>
  implements ServiceInterface<User, UserData, ServiceParams, UserPatch>
{
  id = 'id';

  async find(params: ServiceParams): Promise<User[]> {
    const { email } = params.query || {};

    if (!email) {
      throw new BadRequest('email is required');
    }

    const user = usersData.find((user) => user.email === email) as User;

    return [user];
  }

  async get(id: Id, _params?: ServiceParams): Promise<User> {
    return usersData.find((user) => user.id === Number(id)) as User;
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
