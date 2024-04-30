import { TUserType } from './user.type.js';

export interface ICommentEntity {
  text: string;
  pubDate: Date;
  rating: number;
  user: TUserType;
}
