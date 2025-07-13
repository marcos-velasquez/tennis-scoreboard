import assert from 'assert';
import { Player } from './player';

export class Service {
  private players: Player[];
  private take: number;
  private faultedCount: number = 0;

  constructor(players: Player[]) {
    this.take = Math.floor(Math.random() * players.length);
    this.players = players;
  }

  public switchPlayer(): void {
    this.take = (this.take + 1) % this.players.length;
    this.resetFault();
  }

  public registerFault(): void {
    assert(this.faultedCount < 2, 'The second fault has already been registered');
    this.faultedCount++;
  }

  public isSecondFault(): boolean {
    return this.faultedCount === 2;
  }

  public getCurrentPlayer(): Player {
    return this.players[this.take];
  }

  public getRestPlayer(): Player {
    return this.players.find((p) => p !== this.getCurrentPlayer())!;
  }

  public hasFaulted(): boolean {
    return this.faultedCount > 0;
  }

  public resetFault(): void {
    this.faultedCount = 0;
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}
