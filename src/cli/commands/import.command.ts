import { ICommandEntity, TCommandHelpInfoType } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { IPropertyEntity } from '../../shared/types/property.type.js';

export class ImportCommand implements ICommandEntity {
  private onImportedProperty(property: IPropertyEntity): void {
    console.info(property);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  get name(): string {
    return '--import';
  }

  get helpInfo(): TCommandHelpInfoType {
    return {description: 'импортирует данные из TSV файла заданного по пути <path>', args: '<path>'};
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
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
