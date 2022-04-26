import { Types } from 'mongoose';

export interface IEvent {
  id?: string;
  title: string;
  start: string;
  end: string;
  description: string;
  url: string;
  isPrivate: boolean;
  createdBy: Types.ObjectId;
}

export interface IUser {
  username: string;
  password: string;
  createdEvents: Types.ObjectId[];
}
