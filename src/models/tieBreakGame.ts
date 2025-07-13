import { Player } from './player';
import { Game } from './game';
import { Service } from './service';

export class TieBreakGame extends Game {
  private static readonly POINTS_FOR_WIN = 6;
  private static readonly MIN_LEAD_FOR_WIN = 2;
  private static readonly MATCH_POINT_THRESHOLD = 5;
  private static readonly POINTS_PER_SERVICE_SWITCH = 2;

  private points: Map<Player, number> = new Map();
  private totalPointsPlayed: number = 0;

  constructor(players: Player[], service: Service) {
    super(players, service);
    this.getPlayers().forEach((player) => this.points.set(player, 0));
  }

  public addPoint(player: Player): void {
    const currentPoints = this.points.get(player) || 0;
    this.points.set(player, currentPoints + 1);
    this.totalPointsPlayed++;

    if (
      this.totalPointsPlayed > 0 &&
      (this.totalPointsPlayed - 1) % TieBreakGame.POINTS_PER_SERVICE_SWITCH === 0
    ) {
      this.changeService();
    }

    this.checkGameFinished();
  }

  public changeService(): void {
    this.service.switchPlayer();
  }
  private checkGameFinished(): void {
    const [player1, player2] = this.getPlayers();

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    if (
      player1Points >= TieBreakGame.POINTS_FOR_WIN &&
      player1Points >= player2Points + TieBreakGame.MIN_LEAD_FOR_WIN
    ) {
      this.finished = true;
      this.winner = player1;
    } else if (
      player2Points >= TieBreakGame.POINTS_FOR_WIN &&
      player2Points >= player1Points + TieBreakGame.MIN_LEAD_FOR_WIN
    ) {
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
      (player1Points >= TieBreakGame.MATCH_POINT_THRESHOLD &&
        player1Points === player2Points + 1) ||
      (player2Points >= TieBreakGame.MATCH_POINT_THRESHOLD &&
        player2Points === player1Points + 1)
    );
  }

  public isMatchPoint(): boolean {
    return this.isGamePoint();
  }
}
