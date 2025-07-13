import { Command, Menu } from '../../common';
import { Match } from '../../models';
import { input, output } from '../io';
import { PointServiceCommand } from './point-service.command';
import { PointRestCommand } from './point-rest.command';
import { LackServiceCommand } from './lack-service';

export class MenuView extends Menu<Match> {
  constructor(match: Match) {
    super(match);
  }

  protected getCommands(): Command<Match>[] {
    return [new PointServiceCommand(), new PointRestCommand(), new LackServiceCommand()];
  }

  protected write(): void {
    this.commands.forEach((command, index) => {
      output.block(`${index + 1}. ${command.title}`);
    });
  }

  protected async getOption(): Promise<number> {
    return (await input.range('Elige una opción: ', { min: 1, max: this.commands.length })) - 1;
  }
}
