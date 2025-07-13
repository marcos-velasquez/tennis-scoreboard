import { Player } from './player';
import { Game } from './game';
import { Service } from './service';

export class StandardGame extends Game {
  private static readonly POINTS_FOR_WIN = 4;
  private static readonly MIN_LEAD_FOR_WIN = 2;
  private static readonly DEUCE_THRESHOLD = 3;

  private points: Map<Player, number> = new Map();

  constructor(players: Player[], service: Service) {
    super(players, service);
    this.getPlayers().forEach((player) => this.points.set(player, 0));
  }

  public addPoint(player: Player): void {
    const currentPoints = this.points.get(player) || 0;
    this.points.set(player, currentPoints + 1);
    this.checkGameFinished();
  }

  private checkGameFinished(): void {
    const player1 = this.service.getCurrentPlayer();
    const player2 = this.service.getRestPlayer();

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    if (
      player1Points >= StandardGame.POINTS_FOR_WIN &&
      player1Points >= player2Points + StandardGame.MIN_LEAD_FOR_WIN
    ) {
      this.finished = true;
      this.winner = player1;
    } else if (
      player2Points >= StandardGame.POINTS_FOR_WIN &&
      player2Points >= player1Points + StandardGame.MIN_LEAD_FOR_WIN
    ) {
      this.finished = true;
      this.winner = player2;
    }
  }

  public getScore(player: Player): string {
    const playerPoints = this.points.get(player) || 0;
    const otherPlayer = this.getPlayers().find((p) => !p.equals(player))!;
    const otherPoints = this.points.get(otherPlayer) || 0;

    if (playerPoints >= StandardGame.DEUCE_THRESHOLD && otherPoints >= StandardGame.DEUCE_THRESHOLD) {
      if (playerPoints === otherPoints) {
        return '40';
      }
      if (playerPoints > otherPoints) {
        return 'AD';
      }
      return '40';
    }

    return ['0', '15', '30', '40'][playerPoints];
  }

  public isGamePoint(): boolean {
    const player1 = this.service.getCurrentPlayer();
    const player2 = this.service.getRestPlayer();

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    const isAdvantage =
      (player1Points > StandardGame.DEUCE_THRESHOLD && player1Points === player2Points + 1) ||
      (player2Points > StandardGame.DEUCE_THRESHOLD && player2Points === player1Points + 1);

    const hasWinningScore =
      (player1Points >= StandardGame.POINTS_FOR_WIN &&
        player1Points >= player2Points + StandardGame.MIN_LEAD_FOR_WIN) ||
      (player2Points >= StandardGame.POINTS_FOR_WIN && player2Points >= player1Points + StandardGame.MIN_LEAD_FOR_WIN);

    return isAdvantage || hasWinningScore;
  }
}
