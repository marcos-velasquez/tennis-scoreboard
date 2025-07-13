import { ExitCommand } from '../exit.command';

describe('ExitCommand', () => {
  let exitCommand: ExitCommand<unknown>;

  beforeEach(() => {
    exitCommand = new ExitCommand<unknown>();
  });

  it('should have the correct title', () => {
    expect(exitCommand.title).toBe('Salir');
  });

  it('should not be closed initially', () => {
    expect(exitCommand.isClosed()).toBe(false);
  });

  it('should set closed to true after execute is called', () => {
    exitCommand.execute();
    expect(exitCommand.isClosed()).toBe(true);
  });
});
