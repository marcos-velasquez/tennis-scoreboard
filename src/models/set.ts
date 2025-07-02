import { Player } from './player';
import { Game } from './game';
import { StandardGame } from './standardGame';
import { TieBreakGame } from './tieBreakGame';

/**
 * Clase que representa un set de tenis.
 */
export class Set {
  private games: Game[] = [];
  private finished: boolean = false;
  private winner: Player | null = null;
  private players: Player[];
  private currentGame: Game | null = null;

  /**
   * Constructor de la clase Set.
   * @param players Los dos jugadores que participan en el set
   * @param initialServerPlayer Jugador que inicia con el servicio
   */
  constructor(players: Player[], initialServerPlayer: Player) {
    this.players = players;
    // Crear el primer juego estándar
    this.createNewGame(initialServerPlayer);
  }

  /**
   * Crea un nuevo juego en el set.
   * @param serverPlayer Jugador que tendrá el servicio
   */
  private createNewGame(serverPlayer: Player): void {
    const gamesWonPlayer1 = this.getGamesWon(this.players[0]);
    const gamesWonPlayer2 = this.getGamesWon(this.players[1]);

    // Si ambos jugadores tienen 6 juegos, creamos un tie break
    if (gamesWonPlayer1 === 6 && gamesWonPlayer2 === 6) {
      this.currentGame = new TieBreakGame(serverPlayer, this.players);
    } else {
      this.currentGame = new StandardGame(serverPlayer, this.players);
    }
  }

  /**
   * Añade un juego completado al set y verifica si el set ha terminado.
   * @param game Juego completado a añadir
   */
  public addGame(game: Game): void {
    if (!game.isFinished()) {
      throw new Error('No se puede añadir un juego que no ha finalizado');
    }

    this.games.push(game);
    this.checkSetFinished();

    // Si el set no ha terminado, crear un nuevo juego
    if (!this.finished) {
      // El servicio pasa al otro jugador
      const lastServerPlayer = (game as any).playerWithService;
      const nextServerPlayer = this.players.find((p) => p !== lastServerPlayer)!;

      // Manejo especial para el servicio después de un tie break
      if (game instanceof TieBreakGame) {
        // El servicio del primer juego del siguiente set será para el jugador
        // que recibió el primer punto del tie break
        // (Esta lógica debe ser manejada a nivel de Match)
      }

      this.createNewGame(nextServerPlayer);
    }
  }

  /**
   * Verifica si el set ha terminado según las reglas del tenis.
   */
  private checkSetFinished(): void {
    const gamesWonPlayer1 = this.getGamesWon(this.players[0]);
    const gamesWonPlayer2 = this.getGamesWon(this.players[1]);

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
      this.winner = this.players[0];
    } else if (
      (gamesWonPlayer2 >= 6 && gamesWonPlayer2 >= gamesWonPlayer1 + 2) ||
      (gamesWonPlayer2 === 7 && gamesWonPlayer1 === 5) ||
      (gamesWonPlayer2 === 7 && gamesWonPlayer1 === 6)
    ) {
      this.finished = true;
      this.winner = this.players[1];
    }
  }

  /**
   * Obtiene el juego actual en progreso.
   * @returns El juego actual
   */
  public getCurrentGame(): Game | null {
    return this.currentGame;
  }

  /**
   * Verifica si el set ha finalizado.
   * @returns true si el set ha finalizado, false en caso contrario
   */
  public isFinished(): boolean {
    return this.finished;
  }

  /**
   * Obtiene el jugador ganador del set.
   * @returns El jugador ganador o null si el set no ha terminado
   */
  public getWinner(): Player | null {
    return this.winner;
  }

  /**
   * Obtiene el número de juegos ganados por un jugador en el set.
   * @param player Jugador para el cual contar los juegos ganados
   * @returns Número de juegos ganados por el jugador
   */
  public getGamesWon(player: Player): number {
    return this.games.filter((game) => game.getWinner() === player).length;
  }
}
