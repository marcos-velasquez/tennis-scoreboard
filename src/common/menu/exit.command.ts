import { Command } from './command';

export class ExitCommand<T> extends Command<T> {
  public constructor() {
    super('Exit');
  }

  public execute(): void {
    process.exit();
  }
}
