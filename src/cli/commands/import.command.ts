import { ICommandEntity, TCommandHelpInfoType } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { IPropertyEntity } from '../../shared/types/property.type.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { DefaultPropertyService, PropertyModel, PropertyService } from '../../shared/modules/property/index.js';
import { IDatabaseClientEntity, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { ILoggerEntity } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

export class ImportCommand implements ICommandEntity {
  private userService: UserService;
  private propertyService: PropertyService;
  private databaseClient: IDatabaseClientEntity;
  private logger: ILoggerEntity;
  private salt: string;

  constructor() {
    this.onImportedProperty = this.onImportedProperty.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.propertyService = new DefaultPropertyService(this.logger, PropertyModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedProperty(property: IPropertyEntity, resolve: () => void) {
    await this.saveProperty(property);
    resolve();
  }

  private async saveProperty(property: IPropertyEntity) {
    const user = await this.userService.findOrCreate({
      ...property.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.propertyService.create({
      userId: user.id,
      title: property.title,
      description: property.description,
      postDate: property.postDate,
      city: property.city as string,
      previewUrl: property.previewUrl,
      photos: property.photos,
      isPremium: property.isPremium,
      isFavorites: property.isFavorites,
      rating: property.rating,
      type: property.type as string,
      roomsCount: property.roomsCount,
      personsCount: property.personsCount,
      price: property.price,
      amenities: property.amenities,
      commentsCount: property.commentsCount,
      location: property.location
    });

  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  get name(): string {
    return '--import';
  }

  get helpInfo(): TCommandHelpInfoType {
    return {description: 'импортирует данные из TSV файла заданного по пути <path> в БД', args: '<path> <login> <pass> <dbname> <salt>'};
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('tsv-reader:read-line', this.onImportedProperty);
    fileReader.on('tsv-reader:eof', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
