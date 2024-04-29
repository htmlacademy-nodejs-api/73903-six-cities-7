import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Property, User, UserType, City, Amenities, PropertyType, Location } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToPropertys(): Property[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToProperty(line));
  }

  private parseLineToProperty(line: string): Property {
    const [
      title,
      description,
      postDate,
      city,
      previewUrl,
      photos,
      isPremium,
      isFavorites,
      rating,
      type,
      roomsCount,
      personsCount,
      price,
      amenities,
      user,
      location
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: city as City,
      previewUrl,
      photos: this.parsePhotos(photos),
      isPremium:  Boolean(isPremium),
      isFavorites:  Boolean(isFavorites),
      rating: this.parseFloat(rating),
      type: type as PropertyType,
      roomsCount: this.parseInt(roomsCount),
      personsCount: this.parseInt(personsCount),
      price: this.parseInt(price),
      amenities: this.parseAmenities(amenities),
      user: this.parseUser(user),
      location: this.parseLocation(location)
    };
  }

  private parseLocation(locationString: string): Location {
    const [latitude, longitude] = locationString.split(',').map(Number.parseFloat);
    return {latitude, longitude};
  }

  private parseAmenities(amenitiesString: string): Amenities[] {
    return amenitiesString.split(',') as Amenities[];
  }

  private parsePhotos(photosString: string): string[] {
    return photosString.split(',');
  }

  private parseFloat(numberString: string): number {
    return Number.parseFloat(numberString);
  }

  private parseInt(numberString: string): number {
    return Number.parseInt(numberString, 10);
  }

  private parseUser(userString: string): User {
    const [name, email, avatarUrl, password, type] = userString.split(';');
    return { name, email, avatarUrl, password, type: type as UserType };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Property[] {
    this.validateRawData();
    return this.parseRawDataToPropertys();
  }
}
