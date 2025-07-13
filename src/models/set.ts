import { Player } from './player';
import { Game } from './game';
import { StandardGame } from './standardGame';
import { TieBreakGame } from './tieBreakGame';
import { Service } from './service';

export class Set {
  private static readonly GAMES_FOR_WIN = 6;
  private static readonly MIN_GAME_LEAD_FOR_WIN = 2;
  private static readonly GAMES_FOR_WIN_IN_EXTENDED_SET = 7;

  private readonly games: Game[] = [];
  private finished = false;
  private winner: Player | null = null;
  private currentGame: Game | null = null;

  constructor(
    private readonly players: Player[],
    private readonly service: Service,
  ) {
    this.createNewGame();
  }

  private createNewGame(): void {
    const gamesWonPlayer1 = this.getGamesWon(this.service.getCurrentPlayer());
    const gamesWonPlayer2 = this.getGamesWon(this.service.getRestPlayer());

    if (gamesWonPlayer1 === Set.GAMES_FOR_WIN && gamesWonPlayer2 === Set.GAMES_FOR_WIN) {
      this.currentGame = new TieBreakGame(this.players, this.service);
    } else {
      this.currentGame = new StandardGame(this.players, this.service);
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
    const [p1, p2] = this.players;
    const p1Games = this.getGamesWon(p1);
    const p2Games = this.getGamesWon(p2);

    const p1Wins =
      (p1Games >= Set.GAMES_FOR_WIN && p1Games >= p2Games + Set.MIN_GAME_LEAD_FOR_WIN) ||
      p1Games === Set.GAMES_FOR_WIN_IN_EXTENDED_SET;
    const p2Wins =
      (p2Games >= Set.GAMES_FOR_WIN && p2Games >= p1Games + Set.MIN_GAME_LEAD_FOR_WIN) ||
      p2Games === Set.GAMES_FOR_WIN_IN_EXTENDED_SET;

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
