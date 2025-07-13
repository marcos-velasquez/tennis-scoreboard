import { Command } from '../../common';
import { Match } from '../../models';

export class LackServiceCommand extends Command<Match> {
  constructor() {
    super('Lack Service');
  }

  public execute(): void {
    this.item.lackService();
  }
}
