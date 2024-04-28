import { User } from './user.type.js';

export type Comment = {
  text: string;
  pubDate: Date;
  rating: number;
  user: User;
};
