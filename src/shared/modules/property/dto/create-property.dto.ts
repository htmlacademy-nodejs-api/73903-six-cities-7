import { TLocationType } from '../../../types/location.type.js';
import { EAmenitiesEnum } from '../../../types/property-type.enum.js';

export class CreatePropertyDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public previewUrl: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorites: boolean;
  public rating: number;
  public type: string;
  public roomsCount: number;
  public personsCount: number;
  public price: number;
  public amenities: EAmenitiesEnum[];
  public commentsCount?: number;
  public location: TLocationType;
  public userId: string;
}
