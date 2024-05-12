import mongoose from 'mongoose';
import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity
} from '@typegoose/typegoose';

import { EAmenitiesEnum, ECityEnum, EPropertyTypeEnum, TLocationType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface PropertyEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'properties',
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class PropertyEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: ECityEnum
  })
  public city!: ECityEnum;

  @prop()
  public previewUrl!: string;

  @prop({ type: String, required: true, default: [] })
  public photos!: mongoose.Types.Array<string>;

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorites!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: EPropertyTypeEnum
  })
  public type!: EPropertyTypeEnum;

  @prop()
  public roomsCount!: number;

  @prop()
  public personsCount!: number;

  @prop()
  public price!: number;

  @prop({
    type: () => mongoose.Types.Array<string>,
  })
  public amenities!: EAmenitiesEnum[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop()
  public commentsCount!: number;

  @prop()
  public location!: TLocationType;
}

export const PropertyModel = getModelForClass(PropertyEntity);
