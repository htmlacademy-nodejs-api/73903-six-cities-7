export type CommandHelpInfo = {description: string; args?: string};

export interface Command {
    getName(): string;
    getHelpInfo(): CommandHelpInfo;
    execute(...parameters: string[]): void;
}
