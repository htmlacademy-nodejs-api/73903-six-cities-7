import { EUserTypeEnum } from './user-type.enum.js';

export type IUserEntity = {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  type: EUserTypeEnum;
}
