import {Amenities, PropertyType} from './property-type.enum.js';
import { User } from './user.type.js';
import { City } from './city-type.enum.js';
import { Location } from './location.type.js';

export type Property = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewUrl: string;
  photos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  type: PropertyType;
  roomsCount: number;
  personsCount: number;
  price: number;
  amenities: Amenities[];
  user: User;
  commentsCount?: number;
  location: Location;
};
