type TParsedCommandType = Record<string, string[]>

export class CommandParser {
  static parse(cliArguments: string[]): TParsedCommandType {
    const parsedCommand: TParsedCommandType = {};
    let currentCommand = '';

    for (const argument of cliArguments) {
      if (argument.startsWith('--')) {
        parsedCommand[argument] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        parsedCommand[currentCommand].push(argument);
      }
    }

    return parsedCommand;
  }
}
