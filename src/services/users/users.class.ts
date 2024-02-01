import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';

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

  async create(data: UserData, params?: ServiceParams): Promise<User>;
  async create(data: UserData[], params?: ServiceParams): Promise<User[]>;
  async create(data: UserData | UserData[], params?: ServiceParams): Promise<User | User[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return {
      id: 0,
      ...data
    };
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: UserData, _params?: ServiceParams): Promise<User> {
    return {
      id: 0,
      ...data
    };
  }

  async patch(id: NullableId, data: UserPatch, _params?: ServiceParams): Promise<User> {
    return {
      id: 0,
      email: '',
      ...data
    };
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<User> {
    return {
      id: 0,
      email: ''
    };
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
