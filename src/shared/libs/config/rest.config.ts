import { config } from 'dotenv';
import { inject, injectable } from 'inversify';

import { IConfigEntity } from './config.interface.js';
import { ILoggerEntity } from '../logger/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '../../types/index.js';

@injectable()
export class RestConfig implements IConfigEntity<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.ILoggerEntity) private readonly logger: ILoggerEntity
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
