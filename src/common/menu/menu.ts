import { Command } from './command';
import { ExitCommand } from './exit.command';

export abstract class Menu<T> {
  protected readonly commands: Command<T>[];

  constructor(item: T) {
    this.commands = this.getCommands();
    this.commands.push(new ExitCommand<T>());
    this.commands.forEach((command) => command.set(item));
  }

  protected abstract getCommands(): Command<T>[];

  public async execute(): Promise<void> {
    this.write();
    const option = await this.getOption();
    this.commands[option].execute();
  }

  protected abstract write(): void;

  protected abstract getOption(): Promise<number>;
}
