import { Player } from './player';
import { Game } from './game';
import { StandardGame } from './standardGame';
import { TieBreakGame } from './tieBreakGame';
import { Service } from './service';

export class Set {
  private readonly games: Game[] = [];
  private finished = false;
  private winner: Player | null = null;
  private currentGame: Game | null = null;

  constructor(private readonly service: Service) {
    this.createNewGame();
  }

  private createNewGame(): void {
    const gamesWonPlayer1 = this.getGamesWon(this.service.getCurrentPlayer());
    const gamesWonPlayer2 = this.getGamesWon(this.service.getRestPlayer());

    if (gamesWonPlayer1 === 6 && gamesWonPlayer2 === 6) {
      this.currentGame = new TieBreakGame(this.service);
    } else {
      this.currentGame = new StandardGame(this.service);
    }
  }

  public addGame(game: Game): void {
    this.games.push(game);
    this.checkSetFinished();

    if (!this.finished) {
      this.createNewGame();
    }
  }

  private checkSetFinished(): void {
    const p1 = this.service.getPlayers()[0];
    const p2 = this.service.getPlayers()[1];
    const p1Games = this.getGamesWon(p1);
    const p2Games = this.getGamesWon(p2);

    const p1Wins = (p1Games >= 6 && p1Games >= p2Games + 2) || p1Games === 7;
    const p2Wins = (p2Games >= 6 && p2Games >= p1Games + 2) || p2Games === 7;

    if (p1Wins) {
      this.finished = true;
      this.winner = p1;
    } else if (p2Wins) {
      this.finished = true;
      this.winner = p2;
    }
  }

  public getCurrentGame(): Game {
    return this.currentGame!;
  }

  public isFinished(): boolean {
    return this.finished;
  }

  public getWinner(): Player | null {
    return this.winner;
  }

  public getGamesWon(player: Player): number {
    return this.games.filter((game) => game.getWinner()?.equals(player)).length;
  }
}
