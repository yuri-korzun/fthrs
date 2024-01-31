// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { Admin, AdminData, AdminPatch, AdminQuery } from './users.schema'

export type { Admin, AdminData, AdminPatch, AdminQuery }

export interface AdminServiceOptions {
  app: Application
}

export interface AdminParams extends Params<AdminQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AdminService<ServiceParams extends AdminParams = AdminParams>
  implements ServiceInterface<Admin, AdminData, ServiceParams, AdminPatch>
{
  constructor(public options: AdminServiceOptions) {}

  async find(_params?: ServiceParams): Promise<Admin[]> {
    return []
  }

  async get(id: Id, _params?: ServiceParams): Promise<Admin> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }

  async create(data: AdminData, params?: ServiceParams): Promise<Admin>
  async create(data: AdminData[], params?: ServiceParams): Promise<Admin[]>
  async create(data: AdminData | AdminData[], params?: ServiceParams): Promise<Admin | Admin[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: AdminData, _params?: ServiceParams): Promise<Admin> {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id: NullableId, data: AdminPatch, _params?: ServiceParams): Promise<Admin> {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<Admin> {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
