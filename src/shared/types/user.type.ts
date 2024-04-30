import { EUserTypeEnum } from './user-type.enum.js';

export type TUserType = {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  type: EUserTypeEnum;
}
