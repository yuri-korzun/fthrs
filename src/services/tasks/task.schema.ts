import { Static, Type } from '@feathersjs/typebox';
import { Priority } from "../../types";

export const taskSchema = Type.Object(
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

export type Task = Static<typeof taskSchema>;
