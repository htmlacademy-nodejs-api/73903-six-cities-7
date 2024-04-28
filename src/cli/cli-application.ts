import { Command } from './commands/command.interface.js';
import { CommandParser } from './command-parser.js';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import * as allCommands from './commands/index.js';

type CommandCollection = Record<string, Command>;
type AllCommands = keyof typeof allCommands;

export class CLIApplication {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help',
  ) {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command;
    });
    const files = readdirSync(resolve('src/cli/commands')).filter((file) => file.includes('command.ts'));
    files.map((file) => {
      const name = file.split('.').at(0);
      if (name && name !== 'help') {
        const commandClass: AllCommands = `${name.charAt(0).toUpperCase() + name.slice(1)}Command` as AllCommands;
        const command = new allCommands[commandClass]();
        this.commands[command.getName()] = command;
      }
    });
  }

  public getCommands(): CommandCollection {
    return this.commands;
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
