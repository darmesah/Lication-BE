import { Document } from 'mongoose';

export interface IUser extends Document {
  // role: 'user' | 'admin';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
