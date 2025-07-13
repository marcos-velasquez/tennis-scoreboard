import { Player } from './player';
import { Service } from './service';

export abstract class Game {
  protected finished: boolean = false;
  protected winner: Player | null = null;

  constructor(
    protected readonly players: Player[],
    protected readonly service: Service,
  ) {}

  public isFinished(): boolean {
    return this.finished;
  }

  public getWinner(): Player | null {
    return this.winner;
  }

  public getService(): Service {
    return this.service;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public abstract addPoint(player: Player): void;

  public abstract getScore(player: Player): string;

  public abstract isGamePoint(): boolean;
}
