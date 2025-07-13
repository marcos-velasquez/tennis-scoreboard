import { Player } from './player';
import { Service } from './service';

export abstract class Game {
  protected finished: boolean = false;
  protected winner: Player | null = null;
  protected service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  public abstract addPoint(player: Player): void;

  public isFinished(): boolean {
    return this.finished;
  }

  public getWinner(): Player | null {
    return this.winner;
  }

  public abstract getScore(player: Player): string;

  public abstract isGamePoint(): boolean;
}
