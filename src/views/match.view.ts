import { Match } from '../models';
import { WinnerView } from './winner.view';
import { ScoreView } from './score.view';

export class MatchView {
  constructor(private readonly match: Match) {}

  public write(): void {
    if (this.match.isFinished()) {
      new WinnerView(this.match).write();
    } else {
      new ScoreView(this.match).write();
    }
  }
}
