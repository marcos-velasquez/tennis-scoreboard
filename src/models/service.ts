import { Player } from './player';

export class Service {
  private players: Player[];
  private take: number;
  private hasFaultedFlag: boolean = false;

  constructor(players: Player[]) {
    this.take = Math.floor(Math.random() * players.length);
    this.players = players;
  }

  public switchPlayer(): void {
    this.take = (this.take + 1) % this.players.length;
    this.resetFault();
  }

  public registerFault(): boolean {
    if (this.hasFaultedFlag) {
      this.resetFault();
      return true;
    } else {
      this.hasFaultedFlag = true;
      return false;
    }
  }

  public getCurrentPlayer(): Player {
    return this.players[this.take];
  }

  public getRestPlayer(): Player {
    return this.players.find((p) => p !== this.getCurrentPlayer())!;
  }

  public hasFaulted(): boolean {
    return this.hasFaultedFlag;
  }

  public resetFault(): void {
    this.hasFaultedFlag = false;
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}
