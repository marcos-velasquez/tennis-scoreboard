import { Menu } from '../../common/menu/menu';
import { Match } from '../../models';
import { input, output } from '../io';

export class MenuView extends Menu<Match> {
  constructor(match: Match) {
    super(match);
  }

  protected fill(): void {}

  protected write(): void {
    output.break();
    output.block('---------------------');
    for (let i = 0; i < this.commands.size; i++) {
      output.block(i + 1 + '. ' + this.commands.get(i)!.title);
    }
  }

  protected async getOption(): Promise<number> {
    return (await input.range('Opción', { min: 1, max: this.commands.size })) - 1;
  }
}
