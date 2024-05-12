import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { PropertyService } from './property-service.interface.js';
import { Component } from '../../types/index.js';
import { ILoggerEntity } from '../../libs/logger/index.js';
import { PropertyEntity } from './property.entity.js';
import { CreatePropertyDto } from './dto/create-property.dto.js';

@injectable()
export class DefaultPropertyService implements PropertyService {
  constructor(
    @inject(Component.ILoggerEntity) private readonly logger: ILoggerEntity,
    @inject(Component.PropertyModel) private readonly propertyModel: types.ModelType<PropertyEntity>
  ) {}

  public async create(dto: CreatePropertyDto): Promise<DocumentType<PropertyEntity>> {
    const result = await this.propertyModel.create(dto);
    this.logger.info(`New property created: ${dto.title}`);

    return result;
  }

  public async findById(propertyId: string): Promise<DocumentType<PropertyEntity> | null> {
    return this.propertyModel.findById(propertyId).exec();
  }
}
