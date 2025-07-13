import assert from 'assert';
import { Player } from './player';
import { Set } from './set';
import { Game } from './game';
import { Service } from './service';

export class Match {
  public static readonly NUMBER_OF_SETS = [3, 5] as const;

  private readonly players: Player[];
  private readonly service: Service;
  private readonly sets: Set[] = [];
  private currentSetIndex: number = 0;
  private finished: boolean = false;
  private winner: Player | null = null;

  constructor(
    playerNames: string[],
    public readonly numberOfSets: (typeof Match.NUMBER_OF_SETS)[number],
  ) {
    assert(Match.NUMBER_OF_SETS.includes(numberOfSets), 'Un partido debe tener 3 o 5 sets');
    assert(playerNames.length === 2, 'Un partido debe tener exactamente 2 jugadores');

    this.players = Player.many(...playerNames);
    this.service = new Service(this.players);
    Array.from({ length: numberOfSets }, () => new Set(this.players, this.service)).forEach((set) =>
      this.sets.push(set),
    );
  }

  public getCurrentSet(): Set {
    return this.sets[this.currentSetIndex];
  }

  public getCurrentGame(): Game {
    return this.getCurrentSet().getCurrentGame();
  }

  public pointService(): void {
    this.addPointToPlayer(this.getPlayerWithService());
  }

  public pointRest(): void {
    this.addPointToPlayer(this.getRestPlayer());
  }

  public lackService(): void {
    this.service.registerFault();

    if (this.service.isSecondFault()) {
      this.pointRest();
      this.service.resetFault();
    }
  }

  private addPointToPlayer(player: Player): void {
    this.service.resetFault();
    this.getCurrentGame().addPoint(player);
    if (!this.getCurrentGame().isFinished()) return;

    this.getCurrentSet().addGame(this.getCurrentGame());

    if (this.getCurrentSet().isFinished()) {
      this.checkMatchFinished();

      if (!this.isFinished()) {
        this.currentSetIndex++;
      }
    }

    if (!this.isFinished()) {
      this.service.switchPlayer();
    }
  }

  private checkMatchFinished(): void {
    const setsWonPlayer1 = this.sets.filter((set) => set.getWinner() === this.players[0]).length;
    const setsWonPlayer2 = this.sets.filter((set) => set.getWinner() === this.players[1]).length;

    const setsToWin = this.numberOfSets === 3 ? 2 : 3;

    if (setsWonPlayer1 >= setsToWin) {
      this.finished = true;
      this.winner = this.players[0];
    } else if (setsWonPlayer2 >= setsToWin) {
      this.finished = true;
      this.winner = this.players[1];
    }
  }

  public getCurrentGameScore(player: Player): string {
    return this.getCurrentGame().getScore(player);
  }

  public isFinished(): boolean {
    return this.finished;
  }

  public getWinner(): Player | null {
    return this.winner;
  }

  public getPlayerWithService(): Player {
    return this.service.getCurrentPlayer();
  }

  public getRestPlayer(): Player {
    return this.service.getRestPlayer();
  }

  public hasServiceFaulted(): boolean {
    return this.service.hasFaulted();
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getSets(): Set[] {
    return this.sets;
  }

  public getScores(player: Player): number[] {
    return this.getSets().map((set) => set.getGamesWon(player));
  }
}
