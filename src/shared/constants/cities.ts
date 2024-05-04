import { ECityEnum } from '../types/city-type.enum.js';
import { TLocationType } from '../types/location.type.js';

export const CITIES: Record<ECityEnum, TLocationType> = {
  [ECityEnum.Paris]: { latitude: 48.85661, longitude: 2.351499 },
  [ECityEnum.Cologne]: {latitude: 50.938361, longitude: 6.959974},
  [ECityEnum.Brussels]: {latitude: 50.846557, longitude: 4.35169},
  [ECityEnum.Amsterdam]: {latitude: 52.370216, longitude: 4.895168},
  [ECityEnum.Hamburg]: {latitude: 53.550341, longitude: 10.000654},
  [ECityEnum.Dusseldorf]:  {latitude: 51.225402, longitude: 6.776314}
};
