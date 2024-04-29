import chalk from 'chalk';
import { Command, CommandHelpInfo } from './command.interface.js';
import { CLIApplication } from '../cli-application.js';

export class HelpCommand implements Command {
  constructor(private readonly app: CLIApplication) {}

  public getName(): string {
    return '--help';
  }

  public getHelpInfo(): CommandHelpInfo {
    return {description: 'печатает этот текст'};
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.blue('Программа для подготовки данных для REST API сервера.')}

        Пример:
            cli.js --<command> [--arguments]

        ${chalk.blue('Команды:')}`);
    Object.keys(this.app.getCommands()).map((cmdName) => {
      const command = this.app.getCommand(cmdName);
      const {description, args} = command.getHelpInfo();
      console.info(`\t\t${chalk.greenBright(command.getName())}${args ? ` ${chalk.blueBright(args)}` : ''}:\t\t\t# ${description}`);
    });
  }
}
