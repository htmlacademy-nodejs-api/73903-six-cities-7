import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Property, User, UserType, City, Amenities, PropertyType, Location } from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedProperty = this.parseLineToProperty(completeRow);
        this.emit('tsc-reader:read-line', parsedProperty);
      }
    }

    this.emit('tsc-reader:eof', importedRowCount);

  }
}
