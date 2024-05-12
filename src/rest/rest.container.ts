import { Container } from 'inversify';

import { RestApplication } from './rest-application.js';
import { Component } from '../shared/types/index.js';
import { ILoggerEntity, PinoLogger } from '../shared/libs/logger/index.js';
import { IConfigEntity, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { IDatabaseClientEntity, MongoDatabaseClient } from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<ILoggerEntity>(Component.ILoggerEntity).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<IConfigEntity<RestSchema>>(Component.IConfigEntity).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClientEntity>(Component.IDatabaseClientEntity).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}
