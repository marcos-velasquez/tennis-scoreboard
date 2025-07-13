import { Match } from '../models';
import { output } from './io';

export class MatchView {
  constructor(private readonly match: Match) {}

  public write(): void {
    this.match.getScore();
  }
}
