import { Player } from './player';
import { Game } from './game';
import { StandardGame } from './standardGame';
import { TieBreakGame } from './tieBreakGame';
import { Service } from './service';

export class Set {
  private games: Game[] = [];
  private finished: boolean = false;
  private winner: Player | null = null;
  private service: Service;
  private currentGame: Game | null = null;

  constructor(service: Service) {
    this.service = service;
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
    const gamesWonPlayer1 = this.getGamesWon(this.service.getCurrentPlayer());
    const gamesWonPlayer2 = this.getGamesWon(this.service.getRestPlayer());

    // Un set termina si:
    // 1. Un jugador gana 6 juegos con una diferencia de al menos 2
    // 2. Un jugador gana 7-5
    // 3. Un jugador gana 7-6 (con tie break)

    if (
      (gamesWonPlayer1 >= 6 && gamesWonPlayer1 >= gamesWonPlayer2 + 2) ||
      (gamesWonPlayer1 === 7 && gamesWonPlayer2 === 5) ||
      (gamesWonPlayer1 === 7 && gamesWonPlayer2 === 6)
    ) {
      this.finished = true;
      this.winner = this.service.getCurrentPlayer();
    } else if (
      (gamesWonPlayer2 >= 6 && gamesWonPlayer2 >= gamesWonPlayer1 + 2) ||
      (gamesWonPlayer2 === 7 && gamesWonPlayer1 === 5) ||
      (gamesWonPlayer2 === 7 && gamesWonPlayer1 === 6)
    ) {
      this.finished = true;
      this.winner = this.service.getRestPlayer();
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
    return this.games.filter((game) => game.getWinner() === player).length;
  }
}
