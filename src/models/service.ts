import assert from 'assert';
import { Player } from './player';

export class Service {
  public static readonly MAX_FAULTS = 2;
  private faultedCount: number = 0;
  private serverIndex: number;

  constructor(private readonly players: Player[]) {
    this.serverIndex = Math.floor(Math.random() * players.length);
  }

  public switchPlayer(): void {
    this.serverIndex = (this.serverIndex + 1) % this.players.length;
    this.resetFault();
  }

  public registerFault(): void {
    assert(this.faultedCount < Service.MAX_FAULTS, 'The second fault has already been registered');
    this.faultedCount++;
  }

  public isSecondFault(): boolean {
    return this.faultedCount === Service.MAX_FAULTS;
  }

  public getCurrentPlayer(): Player {
    return this.players[this.serverIndex];
  }

  public getRestPlayer(): Player {
    const otherIndex = (this.serverIndex + 1) % this.players.length;
    return this.players[otherIndex];
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
