import { Match } from '../models';
import { output } from './io';

export class WinnerView {
  constructor(private readonly match: Match) {}

  public write(): void {
    let scoreText = '';

    for (let player of this.match.getPlayers()) {
      const setsScores = this.match.getScores(player).join(' ');
      scoreText += `  ${player.name}: - ${setsScores}\n`;
    }

    scoreText += `\nGanador: ${this.match.getWinner()!.name}`;

    output.block(scoreText);
  }
}
