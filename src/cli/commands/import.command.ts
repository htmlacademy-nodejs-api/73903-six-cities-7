import { Command, CommandHelpInfo } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public getHelpInfo(): CommandHelpInfo {
    return {description: 'импортирует данные из TSV', args: '<path>'};
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}