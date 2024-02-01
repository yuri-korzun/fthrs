import { User } from '../services/users/users.schema';

export const usersData: Partial<User>[] = [
  {
    id: 1,
    email: 'admin@example.com',
    role: 'admin',
    password: '$2a$10$W45gVSSbQLiBrNz5VNhA/eQrG1rJY4oJK8LDbeM3TnClaL/PGYsPq'
  },
  {
    id: 2,
    email: 'user@example.com',
    role: 'user',
    password: '$2a$10$W45gVSSbQLiBrNz5VNhA/eQrG1rJY4oJK8LDbeM3TnClaL/PGYsPq'
  }
];
