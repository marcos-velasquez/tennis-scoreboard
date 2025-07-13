import { Player } from './player';
import { Game } from './game';
import { Service } from './service';

export class TieBreakGame extends Game {
  private points: Map<Player, number> = new Map();
  private totalPointsPlayed: number = 0;

  constructor(service: Service) {
    super(service);
    this.service.getPlayers().forEach((player) => this.points.set(player, 0));
  }

  public addPoint(player: Player): void {
    const currentPoints = this.points.get(player) || 0;
    this.points.set(player, currentPoints + 1);
    this.totalPointsPlayed++;

    if (this.totalPointsPlayed > 0 && (this.totalPointsPlayed - 1) % 2 === 0) {
      this.changeService();
    }

    this.checkGameFinished();
  }

  public changeService(): void {
    this.service.switchPlayer();
  }
  private checkGameFinished(): void {
    const [player1, player2] = this.service.getPlayers();

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    if (player1Points >= 6 && player1Points >= player2Points + 2) {
      this.finished = true;
      this.winner = player1;
    } else if (player2Points >= 6 && player2Points >= player1Points + 2) {
      this.finished = true;
      this.winner = player2;
    }
  }

  public getScore(player: Player): string {
    const points = this.points.get(player) || 0;
    return points.toString();
  }

  public getPoints(player: Player): number {
    return this.points.get(player) || 0;
  }

  public isGamePoint(): boolean {
    const player1 = this.service.getCurrentPlayer();
    const player2 = this.service.getRestPlayer();

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    return (
      (player1Points >= 5 && player1Points === player2Points + 1) ||
      (player2Points >= 5 && player2Points === player1Points + 1)
    );
  }

  public isMatchPoint(): boolean {
    return this.isGamePoint();
  }
}
