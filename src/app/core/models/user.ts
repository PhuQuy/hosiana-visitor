export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  token?: string;
}

// export type UserRecord = Pick<User, 'id' | 'fullName'>;

// export class User {
//     id?: string;
//     email?: string;
//     password?: string;
//     token?: string;
// }
