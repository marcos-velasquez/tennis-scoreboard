import { Match } from '../models';
import { output } from './io';

export class MatchView {
  constructor(private readonly match: Match) {}

  public write(): void {
    const hasFaulted = this.match.hasServiceFaulted();

    let scoreText = '';

    for (let player of this.match.getPlayers()) {
      const serviceIndicator = this.match.getPlayerWithService() === player ? '*' : ' ';

      const faultIndicator = serviceIndicator === '*' && hasFaulted ? '+' : ' ';

      const prefix = hasFaulted ? faultIndicator : serviceIndicator;

      const currentGameScore = this.match.getCurrentGameScore(player);

      const setsScores = this.match.getScores(player).join(' ');

      scoreText += `${prefix} ${player.name}: ${currentGameScore} ${setsScores}\n`;
    }

    output.break();
    output.break();
    output.block(scoreText);
  }
}
