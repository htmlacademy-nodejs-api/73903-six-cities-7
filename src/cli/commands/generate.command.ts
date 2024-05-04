import got from 'got';

import { ICommandEntity } from './command.interface.js';
import { TCommandHelpInfoType } from './command.interface.js';
import { TMockServerDataType } from '../../shared/types/index.js';
import { TSVProperyGenerator } from '../../shared/libs/property-generator/tsv-property-generator.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements ICommandEntity {
  private initialData: TMockServerDataType;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, propertyCount: number) {
    const tsvPropertyGenerator = new TSVProperyGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < propertyCount; i++) {
      await tsvFileWriter.write(tsvPropertyGenerator.generate());
    }
  }

  get name(): string {
    return '--generate';
  }

  get helpInfo(): TCommandHelpInfoType {
    return {description: 'генерирует <n> строк тестовых данных из набора по <url> и записывает их в файл <path>', args: '<n> <path> <url>'};
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const propertyCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, propertyCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
