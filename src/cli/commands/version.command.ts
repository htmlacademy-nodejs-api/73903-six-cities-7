import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { ICommandEntity, TCommandHelpInfoType } from './command.interface.js';

type TPackageJSONConfigType = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is TPackageJSONConfigType {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements ICommandEntity {
  constructor(
    private readonly filePath: string = 'package.json'
  ) {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (! isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  get name(): string {
    return '--version';
  }

  get helpInfo(): TCommandHelpInfoType {
    return {description: 'выводит номер версии из package.json приложения'};
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
