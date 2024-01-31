import { Id, Params } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import {Task, taskSchema} from "./task.schema";
import {appConfig} from "../../config";
import Nano, {DocumentScope} from "nano";

const DEFAULT_PAGE_SIZE = 10;
export class TaskService {
  docs: Record<string, any> = {};
  db: DocumentScope<Task>;

  constructor() {
    // const {username, password} = appConfig.db;
    const dbUrl = `http://admin:12345@127.0.0.1:5984`;
    const dbConnector = Nano(dbUrl);
    this.db = dbConnector.use('tasks');
  }

  async get(id: Id) {
    const res = await this.db.get(id.toString());

    return res;
  }

  async find(params: Params & { fromMiddleware: string }) {
    const limit = params!.query!.$limit || DEFAULT_PAGE_SIZE;
    const skip = params!.query!.$skip || 0;

    const res = await this.db.list({ include_docs: true, skip, limit });

    return {
      data: res.rows.map((row) => row.doc),
      total: res.total_rows,
      success: true
    };
  }

  async create(data: any, params: Params & { fromMiddleware: string }) {
    const res = await this.db.insert(data);

    return {
      success: res.ok,
      id: res.id
    };
  }

  async update(id: Id, data: any, params: Params & { fromMiddleware: string }) {
    const item = await this.db.head(id.toString());
    const res = await this.db.insert({ ...data, _rev: JSON.parse(item.etag) }, id.toString());

    return {
      success: res.ok
    };
  }

  async remove(id: Id, params: Params & { query: { rev: string } }) {
    const item = await this.db.head(id.toString());
    const res = await this.db.destroy(id.toString(), JSON.parse(item.etag));

    return {
      success: res.ok
    };
  }
}

const taskService = new TaskService();

taskService.docs = {
  description: "A service to manage tasks",
  schema: taskSchema,
}

export const task = (app: Application) => {
  app.use('tasks', taskService);
};
