#!/usr/bin/env node

import { CLIApplication, HelpCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(cliApplication),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
