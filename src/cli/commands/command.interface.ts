export type TCommandHelpInfoType = {description: string; args?: string};

export interface ICommandEntity {
    get name(): string;
    get helpInfo(): TCommandHelpInfoType;
    execute(...parameters: string[]): void;
}
