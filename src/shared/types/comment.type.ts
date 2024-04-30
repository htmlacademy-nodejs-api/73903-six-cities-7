import { IUserEntity } from './user.type.js';

export interface ICommentEntity {
  text: string;
  pubDate: Date;
  rating: number;
  user: IUserEntity;
}
