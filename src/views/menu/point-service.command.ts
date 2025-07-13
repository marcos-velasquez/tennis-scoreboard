import { Command } from '../../common';
import { Match } from '../../models';

export class PointServiceCommand extends Command<Match> {
  constructor() {
    super('Point Service');
  }

  public execute(): void {
    this.item.pointService();
  }
}
