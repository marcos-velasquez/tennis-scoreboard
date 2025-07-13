import { Menu } from '../../common';
import { Match } from '../../models';
import { input, output } from '../io';
import { PointServiceCommand } from './point-service.command';
import { PointRestCommand } from './point-rest.command';
import { LackServiceCommand } from './lack-service';

export class MenuView extends Menu<Match> {
  constructor(match: Match) {
    super(match);
  }

  protected fill(): void {
    this.commands.set(0, new PointServiceCommand());
    this.commands.set(1, new PointRestCommand());
    this.commands.set(2, new LackServiceCommand());
  }
  protected write(): void {
    output.break();
    output.block('---------------------');
    for (let i = 0; i < this.commands.size; i++) {
      output.block(i + 1 + '. ' + this.commands.get(i)!.title);
    }
  }

  protected async getOption(): Promise<number> {
    return (await input.range('Elige una opción: ', { min: 1, max: this.commands.size })) - 1;
  }
}
