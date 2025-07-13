import * as readline from 'readline';

export class Output {
  constructor(private readonly io: readline.ReadLine) {}

  public inline(message: string): void {
    this.io.write(message);
  }

  public block(message: string): void {
    this.inline(message + '\r\n');
  }

  public break(): void {
    this.block('');
  }
}
