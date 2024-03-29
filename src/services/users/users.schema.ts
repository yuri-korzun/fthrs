import { resolve } from '@feathersjs/schema';
import { Type, querySyntax } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import type { UserService } from './users.class';

export const userSchema = Type.Object(
  {
    id: Type.Number(),
    role: Type.Optional(Type.String()),
    email: Type.String(),
    password: Type.Optional(Type.String())
  },
  { $id: 'User', additionalProperties: false }
);
export type User = Static<typeof userSchema>;
export const userResolver = resolve<User, HookContext<UserService>>({});

export const userExternalResolver = resolve<User, HookContext<UserService>>({
  // The password should never be visible externally
  password: async () => undefined
});

// Schema for creating new entries
export const userDataSchema = Type.Pick(userSchema, ['email', 'password'], {
  $id: 'UserData'
});
export type UserData = Static<typeof userDataSchema>;

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
});
export type UserPatch = Static<typeof userPatchSchema>;

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['id', 'email']);
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export type UserQuery = Static<typeof userQuerySchema>;
