import { Player } from './player';

/**
 * Clase abstracta que representa un juego de tenis.
 */
export abstract class Game {
  protected finished: boolean = false;
  protected winner: Player | null = null;
  protected playerWithService: Player;
  protected players: Player[];

  /**
   * Constructor de la clase Game.
   * @param playerWithService Jugador que tiene el servicio
   * @param players Lista de jugadores que participan en el juego
   */
  constructor(playerWithService: Player, players: Player[]) {
    this.playerWithService = playerWithService;
    this.players = players;
  }

  /**
   * Añade un punto para el jugador especificado.
   * @param player Jugador que ha ganado el punto
   */
  public abstract addPoint(player: Player): void;

  /**
   * Verifica si el juego ha finalizado.
   * @returns true si el juego ha finalizado, false en caso contrario
   */
  public isFinished(): boolean {
    return this.finished;
  }

  /**
   * Obtiene el jugador ganador del juego.
   * @returns El jugador ganador o null si el juego no ha terminado
   */
  public getWinner(): Player | null {
    return this.winner;
  }

  /**
   * Obtiene la puntuación del jugador especificado.
   * @param player Jugador cuya puntuación se desea obtener
   * @returns La representación de la puntuación como cadena
   */
  public abstract getScore(player: Player): string;

  /**
   * Verifica si el punto actual es un punto de juego.
   * @returns true si es un punto de juego, false en caso contrario
   */
  public abstract isGamePoint(): boolean;
}
