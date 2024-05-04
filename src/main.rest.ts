import 'reflect-metadata';
import { Container } from 'inversify';

import { ILoggerEntity, PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { IConfigEntity, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Component } from './shared/types/index.js';


async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILoggerEntity>(Component.ILoggerEntity).to(PinoLogger).inSingletonScope();
  container.bind<IConfigEntity<RestSchema>>(Component.IConfigEntity).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
