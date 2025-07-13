import { Player } from './player';
import { Game } from './game';
import { Service } from './service';

export class StandardGame extends Game {
  private points: Map<Player, number> = new Map();

  constructor(service: Service) {
    super(service);
    this.service.getPlayers().forEach((player) => this.points.set(player, 0));
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

    if (player1Points >= 4 && player1Points >= player2Points + 2) {
      this.finished = true;
      this.winner = player1;
    } else if (player2Points >= 4 && player2Points >= player1Points + 2) {
      this.finished = true;
      this.winner = player2;
    }
  }

  public getScore(player: Player): string {
    const playerPoints = this.points.get(player) || 0;
    const otherPlayer = this.service.getPlayers().find((p) => !p.equals(player))!;
    const otherPoints = this.points.get(otherPlayer) || 0;

    if (playerPoints <= 2) {
      return ['0', '15', '30'][playerPoints];
    } else if (playerPoints === 3) {
      return '40';
    } else {
      if (playerPoints === otherPoints) {
        return '40';
      } else if (playerPoints > otherPoints) {
        return 'AD';
      } else {
        return '40';
      }
    }
  }

  public isGamePoint(): boolean {
    const player1 = this.service.getCurrentPlayer();
    const player2 = this.service.getRestPlayer();

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    return (
      (player1Points >= 3 && player1Points === player2Points + 1) ||
      (player2Points >= 3 && player2Points === player1Points + 1) ||
      (player1Points >= 3 && player1Points >= player2Points + 2) ||
      (player2Points >= 3 && player2Points >= player1Points + 2)
    );
  }
}
