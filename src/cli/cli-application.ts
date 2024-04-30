import { ICommandEntity } from './commands/command.interface.js';
import { CommandParser } from './command-parser.js';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import * as allCommands from './commands/index.js';

type TCommandCollectionType = Record<string, ICommandEntity>;
type TAllCommandsType = keyof typeof allCommands;

export class CLIApplication {
  private _commands: TCommandCollectionType = {};

  constructor(
    private readonly _defaultCommand: string = '--help',
  ) {}

  public registerCommands(commandList: ICommandEntity[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this._commands, command.name)) {
        throw new Error(`Command ${command.name} is already registered`);
      }
      this._commands[command.name] = command;
    });
    const files = readdirSync(resolve('src/cli/commands')).filter((file) => file.includes('command.ts'));
    files.map((file) => {
      const name = file.split('.').at(0);
      if (name && name !== 'help') {
        const commandClass: TAllCommandsType = `${name.charAt(0).toUpperCase() + name.slice(1)}Command` as TAllCommandsType;
        const command = new allCommands[commandClass]();
        this._commands[command.name] = command;
      }
    });
  }

  get commands(): TCommandCollectionType {
    return this._commands;
  }

  public getCommandByName(commandName: string): ICommandEntity {
    return this._commands[commandName] ?? this.defaultCommand;
  }

  get defaultCommand(): ICommandEntity | never {
    if (! this._commands[this._defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this._commands[this._defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommandByName(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
