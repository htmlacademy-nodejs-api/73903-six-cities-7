import chalk from 'chalk';
import { ICommandEntity, TCommandHelpInfoType } from './command.interface.js';
import { CLIApplication } from '../cli-application.js';

const MAX_HELP_TEXT = 50;

export class HelpCommand implements ICommandEntity {
  constructor(private readonly app: CLIApplication) {}

  get name(): string {
    return '--help';
  }

  get helpInfo(): TCommandHelpInfoType {
    return {description: 'информация о доступных командах CLI приложения'};
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.blue('Программа для подготовки данных для REST API сервера.')}

        Пример:
            cli.js --<command> [--arguments]

        ${chalk.blue('Команды:')}`);
    Object.keys(this.app.commands).map((cmdName) => {
      const command = this.app.getCommandByName(cmdName);
      const {description, args} = command.helpInfo;
      const helpTextLength = command.name.length + (args ? args.length : 1);
      console.info(`\t\t${chalk.greenBright(command.name)}${args ? ` ${chalk.blueBright(args)}` : ''}:${'\t#'.padStart(MAX_HELP_TEXT - helpTextLength)} ${description}`);
    });
  }
}
