import { Match } from '../models';
import { output } from './io';

export class ScoreView {
  constructor(private readonly match: Match) {}

  public write(): void {
    const playerWithService = this.match.getPlayerWithService();
    const hasFaulted = this.match.hasServiceFaulted();

    let scoreText = '';

    for (let player of this.match.getPlayers()) {
      const serviceIndicator = playerWithService === player ? '*' : ' ';

      const faultIndicator = playerWithService === player && hasFaulted ? '+' : ' ';

      const prefix = hasFaulted ? faultIndicator : serviceIndicator;

      const currentGameScore = this.match.getCurrentGameScore(player);

      const setsScores = this.match.getScores(player).join(' ');

      scoreText += `${prefix} ${player.name}: ${currentGameScore} ${setsScores}\n`;
    }

    output.block(scoreText);
  }
}
