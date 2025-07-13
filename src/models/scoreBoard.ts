import { Player } from './player';
import { Set } from './set';

interface IMatch {
  getPlayers(): Player[];
  getPlayerWithService(): Player;
  hasServiceFaulted(): boolean;
  getCurrentGameScore(player: Player): string;
  getSets(): Set[];
  isFinished(): boolean;
  getWinner(): Player | null;
}

export class ScoreBoard {
  public displayScore(match: IMatch): string {
    const players = match.getPlayers();
    const playerWithService = match.getPlayerWithService();
    const hasFaulted = match.hasServiceFaulted();

    let scoreText = '';

    if (!match.isFinished()) {
      for (let player of players) {
        const serviceIndicator = playerWithService === player ? '*' : ' ';

        const faultIndicator = playerWithService === player && hasFaulted ? '+' : ' ';

        const prefix = hasFaulted ? faultIndicator : serviceIndicator;

        const playerName = player.name.padEnd(8, ' ');

        const currentGameScore = match.getCurrentGameScore(player);

        const setsScores = match
          .getSets()
          .map((set) => set.getGamesWon(player))
          .join(' ');

        scoreText += `${prefix} ${playerName}: ${currentGameScore} ${setsScores}\n`;
      }
    } else {
      const winner = match.getWinner();
      if (winner) {
        for (let player of players) {
          const playerName = player.name.padEnd(8, ' ');
          const setsScores = match
            .getSets()
            .map((set) => set.getGamesWon(player))
            .join(' ');
          scoreText += `  ${playerName}: - ${setsScores}\n`;
        }

        scoreText += `\nGanador: ${winner.name}`;
      }
    }

    return scoreText;
  }
}
