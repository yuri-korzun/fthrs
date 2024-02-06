import { Id, Params } from '@feathersjs/feathers';
import { Task, taskQueryBuilder } from './tasks.schema';
import { appConfig } from '../../config';
import Nano, { DocumentScope } from 'nano';

const DEFAULT_PAGE_SIZE = 10;
export class TasksClass {
  docs: Record<string, any> = {};
  db: DocumentScope<Task>;

  constructor() {
    const { username, password, dbUrl, dbName } = appConfig.db;
    //const connectionString = `http://admin:12345@127.0.0.1:5984`;
    const connectionString = `https://${username}:${password}@${dbUrl}`;
    const dbConnector = Nano(connectionString);
    this.db = dbConnector.use(dbName as string);
  }

  async get(id: Id) {
    return this.db.get(id.toString());
  }

  async find(params: Params) {
    const limit = params!.query!.$limit || DEFAULT_PAGE_SIZE;
    const skip = params!.query!.$skip || 0;

    const selector = params.query ? taskQueryBuilder(params.query) : {};

    const res = await this.db.find({ skip, limit, selector });

    return {
      data: res.docs,
      success: true
    };
  }

  async create(data: any) {
    const res = await this.db.insert(data);

    return {
      success: res.ok,
      id: res.id
    };
  }

  async update(id: Id, data: any) {
    const item = await this.db.head(id.toString());
    const res = await this.db.insert({ ...data, _rev: JSON.parse(item.etag) }, id.toString());

    return {
      success: res.ok
    };
  }

  async remove(id: Id, params: Params) {
    const item = await this.db.head(id.toString());
    const res = await this.db.destroy(id.toString(), JSON.parse(item.etag));

    return {
      success: res.ok
    };
  }
}
