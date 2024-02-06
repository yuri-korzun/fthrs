import { Static, Type } from '@feathersjs/typebox';
import { TaskPriority, TaskStatus } from '../../types';
import Nano from 'nano';
import { Query } from '@feathersjs/feathers';

export const tasksSchema = Type.Object(
  {
    id: Type.String(),
    title: Type.String(),
    description: Type.String(),
    dueDate: Type.String({ format: 'date-time' }),
    priority: Type.Enum(TaskPriority),
    status: Type.Enum(TaskStatus)
  },
  { $id: 'Task', additionalProperties: false }
);

export type Task = Static<typeof tasksSchema>;

export const taskQuerySchema2 = Type.Pick(tasksSchema, ['description', 'priority', 'status'], {
  additionalProperties: false
});
export const taskQueryProperties = Type.Intersect(
  [
    taskQuerySchema2,
    Type.Object(
      { dueDateFrom: Type.String({ format: 'date-time' }), dueDateTo: Type.String({ format: 'date-time' }) },
      { additionalProperties: false }
    )
  ],
  { additionalProperties: false }
);

export const taskQueryBuilder = (query: Query): Nano.MangoSelector => {
  const selector: Nano.MangoSelector = {};

  if (query.description) {
    selector.description = { $regex: query.description };
  }

  if (query.priority) {
    selector.priority = Number(query.priority);
  }

  if (query.status) {
    selector.status = query.status;
  }

  if (query.dueDateFrom || query.dueDateTo) {
    const dueDate: Record<string, string> = {};

    if (query.dueDateFrom) {
      dueDate.$gte = query.dueDateFrom;
    }

    if (query.dueDateTo) {
      dueDate.$lte = query.dueDateTo;
    }

    selector.dueDate = dueDate;
  }

  return selector;
};
