import { Command, CommandHelpInfo } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { Property } from '../../shared/types/property.type.js';

export class ImportCommand implements Command {
  private onImportedProperty(property: Property): void {
    console.info(property);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public getHelpInfo(): CommandHelpInfo {
    return {description: 'импортирует данные из TSV', args: '<path>'};
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('tsc-reader:read-line', this.onImportedProperty);
    fileReader.on('tsc-reader:eof', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
