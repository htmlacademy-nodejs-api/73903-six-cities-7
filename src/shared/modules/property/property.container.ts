import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { PropertyService } from './property-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultPropertyService } from './default-property.service.js';
import { PropertyEntity, PropertyModel } from './property.entity.js';

export function createPropertyContainer() {
  const propertyContainer = new Container();

  propertyContainer.bind<PropertyService>(Component.PropertyService).to(DefaultPropertyService);
  propertyContainer.bind<types.ModelType<PropertyEntity>>(Component.PropertyModel).toConstantValue(PropertyModel);

  return propertyContainer;
}
