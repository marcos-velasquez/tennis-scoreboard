import { Command } from '../../common';
import { Match } from '../../models';

export class PointRestCommand extends Command<Match> {
  constructor() {
    super('Point Rest');
  }

  public execute(): void {
    this.item.pointRest();
  }
}
