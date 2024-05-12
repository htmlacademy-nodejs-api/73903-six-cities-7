import { DocumentType } from '@typegoose/typegoose';

import { CreatePropertyDto } from './dto/create-property.dto.js';
import { PropertyEntity } from './property.entity.js';

export interface PropertyService {
  create(dto: CreatePropertyDto): Promise<DocumentType<PropertyEntity>>;
  findById(offerId: string): Promise<DocumentType<PropertyEntity> | null>;
}
