import { inject, injectable } from 'inversify';
import { ILoggerEntity } from '../shared/libs/logger/index.js';
import { IConfigEntity, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { IDatabaseClientEntity } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.ILoggerEntity) private readonly logger: ILoggerEntity,
    @inject(Component.IConfigEntity) private readonly config: IConfigEntity<RestSchema>,
    @inject(Component.IDatabaseClientEntity) private readonly databaseClient: IDatabaseClientEntity,
  ) {}

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');
  }
}
