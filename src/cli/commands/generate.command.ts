import got from 'got';
import { appendFile } from 'node:fs/promises';

import { Command } from './command.interface.js';
import { CommandHelpInfo } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import { TSVProperyGenerator } from '../../shared/libs/property-generator/tsv-property-generator.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, propertyCount: number) {
    const tsvPropertyGenerator = new TSVProperyGenerator(this.initialData);
    for (let i = 0; i < propertyCount; i++) {
      await appendFile(
        filepath,
        `${tsvPropertyGenerator.generate()}\n`,
        { encoding: 'utf8' }
      );
    }
  }

  public getName(): string {
    return '--generate';
  }

  public getHelpInfo(): CommandHelpInfo {
    return {description: 'генерирует произвольное количество тестовых данных', args: '<n> <path> <url>'};
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

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
