import assert from 'assert';
import { Player } from './player';
import { Set } from './set';
import { Game } from './game';
import { Service } from './service';
import { ScoreBoard } from './scoreBoard';

export class Match {
  public static readonly NUMBER_OF_SETS = [3, 5];

  private date: Date;
  private numberOfSets: number;
  private players: Player[];
  private sets: Set[] = [];
  private finished: boolean = false;
  private winner: Player | null = null;
  private service: Service;
  private scoreBoard: ScoreBoard;

  constructor(playerNames: string[], numberOfSets: number) {
    assert(numberOfSets === 3 || numberOfSets === 5, 'Un partido debe tener 3 o 5 sets');
    assert(playerNames.length === 2, 'Un partido debe tener exactamente 2 jugadores');

    this.date = new Date();
    this.numberOfSets = numberOfSets;
    this.players = Player.many(...playerNames);
    this.scoreBoard = new ScoreBoard();
    this.service = new Service(this.players);

    this.createNewSet(this.service.getCurrentPlayer());
  }

  private createNewSet(initialServerPlayer: Player): void {
    this.sets.push(new Set(this.players, initialServerPlayer));
  }

  public getCurrentSet(): Set {
    return this.sets[this.sets.length - 1];
  }

  public getCurrentGame(): Game {
    return this.getCurrentSet().getCurrentGame();
  }

  public pointService(): void {
    this.addPointToPlayer(this.service.getCurrentPlayer());
  }

  public pointRest(): void {
    this.addPointToPlayer(this.getRestPlayer());
  }

  public lackService(): void {
    const isSecondFault = this.service.registerFault();

    if (isSecondFault) {
      this.pointRest();
      this.service.resetFault();
    }
  }

  private addPointToPlayer(player: Player): void {
    const currentGame = this.getCurrentGame();

    currentGame.addPoint(player);
    this.service.resetFault();

    if (currentGame.isFinished()) {
      const currentSet = this.getCurrentSet()!;
      currentSet.addGame(currentGame);

      if (currentSet.isFinished()) {
        this.checkMatchFinished();

        if (!this.finished) {
          this.service.switchPlayer();
          this.createNewSet(this.service.getCurrentPlayer());
        }
      }
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

  public getDate(): Date {
    return this.date;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getSets(): Set[] {
    return this.sets;
  }

  public getScore(): string {
    return this.scoreBoard.displayScore(this);
  }
}
