import { Static, Type } from '@feathersjs/typebox';
import { Priority } from '../../types';
import { resolve } from '@feathersjs/schema';
import type { HookContext } from '../../declarations';
import { TasksClass } from './tasks.class';

export const tasksSchema = Type.Object(
  {
    id: Type.String(),
    title: Type.String(),
    description: Type.String(),
    dueDate: Type.Date(),
    priority: Type.Enum(Priority),
    status: Type.String()
  },
  { $id: 'Task', additionalProperties: false }
);

export type Task = Static<typeof tasksSchema>;
export const taskQueryProperties = Type.Pick(tasksSchema, ['status', 'priority', 'dueDate']);

export const taskQuerySchema = Type.Pick(tasksSchema, ['description', 'dueDate', 'priority', 'status'], {
  additionalProperties: false
});

export const taskQueryResolver = resolve<Task, HookContext<TasksClass>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
});
