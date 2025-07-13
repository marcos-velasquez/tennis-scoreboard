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
    do {
      this.write();
      const option = await this.getOption();
      this.commands.get(option)!.execute();
    } while (!this.isClosed());
  }

  protected abstract write(): void;

  protected abstract getOption(): Promise<number>;

  public isClosed(): boolean {
    return (this.commands.get(this.commands.size - 1) as ExitCommand<T>).isClosed();
  }
}

/* 
public class SaleLineCommand extends Command {

	public SaleLineCommand() {
		super("Linea de venta");
	}

	@Override
	public void execute() {
		int id = LimitedIntDialog.instance().read("Código", 1000);
		int units = LimitedIntDialog.instance().read("Unidades", 1000);
		ticket.add(new SaleLine(id, units));
	}
}
 */
