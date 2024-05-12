import dayjs from 'dayjs';

import { IPropertyGeneratorEntity } from './property-generator.interface.js';
import { TMockServerDataType, EUserTypeEnum } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getExactItems, getRandomBoolean, getRandomUserPassword } from '../../helpers/index.js';

const MIN_RAITING = 1;
const MAX_RAITING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_PERSONS = 1;
const MAX_PERSONS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const PHOTOS_DOMAIN = 'https://example.com';
const USER_AVATARS_DOMAIN = 'https://example.com';

export class TSVProperyGenerator implements IPropertyGeneratorEntity {
  constructor(private readonly mockData: TMockServerDataType) {}

  private getUser(): string {
    const userType = getRandomItem([EUserTypeEnum.Regular, EUserTypeEnum.Pro]);
    const userName = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = getRandomUserPassword();
    return [userName, email, `${USER_AVATARS_DOMAIN}/${avatar}`, password, userType].join(';');
  }

  private getLocation(): string {
    const latitude = generateRandomValue(47, 54, 6);
    const longitude = generateRandomValue(1, 11, 6);
    return [latitude, longitude].join(',');
  }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewUrl = getRandomItem<string>(this.mockData.previewUrls);
    const photos = getExactItems(`${PHOTOS_DOMAIN}/photo`, '.jpg', 6).join(',');
    const isPremium = getRandomBoolean().toString();
    const isFavorites = getRandomBoolean().toString();
    const rating = generateRandomValue(MIN_RAITING, MAX_RAITING, 1).toString();
    const type = getRandomItem(this.mockData.types);
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const personsCount = generateRandomValue(MIN_PERSONS, MAX_PERSONS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(',');
    const user = this.getUser();
    const location = this.getLocation();

    return [
      title, description, postDate, city,
      previewUrl, photos, isPremium, isFavorites,
      rating, type, roomsCount, personsCount,
      price, amenities, user, location
    ].join('\t');
  }
}
