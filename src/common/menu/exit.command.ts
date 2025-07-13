import { Command } from './command';

export class ExitCommand<T> extends Command<T> {
  private closed = false;

  public constructor() {
    super('Salir');
  }

  public isClosed(): boolean {
    return this.closed;
  }

  public execute(): void {
    this.closed = true;
  }
}
