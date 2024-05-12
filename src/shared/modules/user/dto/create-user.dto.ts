import { EUserTypeEnum } from '../../../types/user-type.enum.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarUrl?: string;
  public password: string;
  public type: EUserTypeEnum;
}
