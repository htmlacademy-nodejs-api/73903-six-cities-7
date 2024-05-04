import { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { IFileWriterEntity } from './file-writer.interface.js';

export class TSVFileWriter implements IFileWriterEntity {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(row: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${row}\n`);
    if (! writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
