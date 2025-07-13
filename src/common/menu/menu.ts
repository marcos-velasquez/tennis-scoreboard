import { Command } from './command';
import { ExitCommand } from './exit.command';

export abstract class Menu<T> {
  protected readonly commands: Map<number, Command<T>>;

  constructor(item: T) {
    this.commands = new Map<number, Command<T>>();
    this.fill();
    this.commands.set(this.commands.size, new ExitCommand<T>());
    this.commands.forEach((command) => command.set(item));
  }

  protected abstract fill(): void;

  public async execute(): Promise<void> {
    this.write();
    const option = await this.getOption();
    this.commands.get(option)!.execute();
  }

  protected abstract write(): void;

  protected abstract getOption(): Promise<number>;
}
