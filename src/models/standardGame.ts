import { Player } from './player';
import { Game } from './game';

/**
 * Clase que representa un juego estándar de tenis.
 */
export class StandardGame extends Game {
  private points: Map<Player, number> = new Map();

  /**
   * Constructor de la clase StandardGame.
   * @param playerWithService Jugador que tiene el servicio
   * @param players Lista de jugadores que participan en el juego
   */
  constructor(playerWithService: Player, players: Player[]) {
    super(playerWithService, players);
    // Inicializar puntos a cero para ambos jugadores
    players.forEach((player) => this.points.set(player, 0));
  }

  /**
   * Añade un punto para el jugador especificado.
   * @param player Jugador que ha ganado el punto
   */
  public addPoint(player: Player): void {
    const currentPoints = this.points.get(player) || 0;
    this.points.set(player, currentPoints + 1);

    // Determinar si el juego ha terminado
    this.checkGameFinished();
  }

  /**
   * Verifica si el juego ha terminado según las reglas del tenis.
   */
  private checkGameFinished(): void {
    const player1 = this.players[0];
    const player2 = this.players[1];

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    // Un jugador gana si tiene al menos 4 puntos y ventaja de 2 o más
    if (player1Points >= 4 && player1Points >= player2Points + 2) {
      this.finished = true;
      this.winner = player1;
    } else if (player2Points >= 4 && player2Points >= player1Points + 2) {
      this.finished = true;
      this.winner = player2;
    }
  }

  /**
   * Obtiene la representación textual de la puntuación del jugador.
   * @param player Jugador cuya puntuación se desea obtener
   * @returns Representación textual de la puntuación
   */
  public getScore(player: Player): string {
    const playerPoints = this.points.get(player) || 0;
    const otherPlayer = this.players.find((p) => p !== player)!;
    const otherPoints = this.points.get(otherPlayer) || 0;

    // Reglas de puntuación del tenis
    if (playerPoints <= 2) {
      return ['0', '15', '30'][playerPoints];
    } else if (playerPoints === 3) {
      return '40';
    } else {
      // Puntos superiores a 3
      if (playerPoints === otherPoints) {
        return '40'; // Deuce
      } else if (playerPoints > otherPoints) {
        return 'AD'; // Ventaja
      } else {
        return '40'; // Desventaja
      }
    }
  }

  /**
   * Verifica si el punto actual es un punto de juego.
   * @returns true si es un punto de juego, false en caso contrario
   */
  public isGamePoint(): boolean {
    const player1 = this.players[0];
    const player2 = this.players[1];

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    // Es punto de juego si algún jugador tiene al menos 3 puntos y ventaja de 1
    return (
      (player1Points >= 3 && player1Points === player2Points + 1) ||
      (player2Points >= 3 && player2Points === player1Points + 1) ||
      // O si tiene al menos 3 puntos y ventaja de 2 o más
      (player1Points >= 3 && player1Points >= player2Points + 2) ||
      (player2Points >= 3 && player2Points >= player1Points + 2)
    );
  }
}
