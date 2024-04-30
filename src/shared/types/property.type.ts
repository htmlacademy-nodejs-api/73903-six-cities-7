import {EAmenitiesEnum, EPropertyTypeEnum} from './property-type.enum.js';
import { TUserType } from './user.type.js';
import { ECityEnum } from './city-type.enum.js';
import { TLocationType } from './location.type.js';

export interface IPropertyEntity {
  title: string;
  description: string;
  postDate: Date;
  city: ECityEnum;
  previewUrl: string;
  photos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  type: EPropertyTypeEnum;
  roomsCount: number;
  personsCount: number;
  price: number;
  amenities: EAmenitiesEnum[];
  user: TUserType;
  commentsCount?: number;
  location: TLocationType;
}
