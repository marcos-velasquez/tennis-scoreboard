import { Match } from '../models';
import { output } from './io';

export class WinnerView {
  constructor(private readonly match: Match) {}

  public write(): void {
    output.block('*****************');
    output.block('*****************');

    let scoreText = '';

    for (let player of this.match.getPlayers()) {
      const setsScores = this.match.getScores(player).join(' ');
      scoreText += `  ${player.name}: - ${setsScores}\n`;
    }

    scoreText += `\nGanador: ${this.match.getWinner()!.name}`;

    output.block(scoreText);

    output.block('*****************');
    output.block('*****************');
  }
}
