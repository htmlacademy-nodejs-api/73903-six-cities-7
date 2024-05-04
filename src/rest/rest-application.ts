import { inject, injectable } from 'inversify';
import { ILoggerEntity } from '../shared/libs/logger/index.js';
import { IConfigEntity, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.ILoggerEntity) private readonly logger: ILoggerEntity,
    @inject(Component.IConfigEntity) private readonly config: IConfigEntity<RestSchema>
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
