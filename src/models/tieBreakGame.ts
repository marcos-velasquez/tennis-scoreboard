import { Player } from './player';
import { Game } from './game';

/**
 * Clase que representa un juego de desempate (Tie Break) en tenis.
 */
export class TieBreakGame extends Game {
  private points: Map<Player, number> = new Map();
  private nextServiceChange: number = 1; // Cambio de servicio después del primer punto, luego cada 2 puntos
  private totalPointsPlayed: number = 0;

  /**
   * Constructor de la clase TieBreakGame.
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
    this.totalPointsPlayed++;

    // Verificar si hay que cambiar el servicio
    if (this.totalPointsPlayed === this.nextServiceChange) {
      this.changeService();
      this.nextServiceChange += 2; // El siguiente cambio será después de 2 puntos
    }

    // Determinar si el juego ha terminado
    this.checkGameFinished();
  }

  /**
   * Cambia el jugador que tiene el servicio.
   */
  public changeService(): void {
    const otherPlayer = this.players.find((p) => p !== this.playerWithService)!;
    this.playerWithService = otherPlayer;
  }

  /**
   * Verifica si el juego ha terminado según las reglas del tie break.
   */
  private checkGameFinished(): void {
    const player1 = this.players[0];
    const player2 = this.players[1];

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    // En tie break, un jugador gana si tiene al menos 7 puntos y ventaja de 2 o más
    // (en realidad, en los requisitos se indica mínimo 6 puntos)
    if (player1Points >= 6 && player1Points >= player2Points + 2) {
      this.finished = true;
      this.winner = player1;
    } else if (player2Points >= 6 && player2Points >= player1Points + 2) {
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
    const points = this.points.get(player) || 0;
    return points.toString();
  }

  /**
   * Verifica si el punto actual es un punto de juego (set point en tie break).
   * @returns true si es un punto de juego, false en caso contrario
   */
  public isGamePoint(): boolean {
    const player1 = this.players[0];
    const player2 = this.players[1];

    const player1Points = this.points.get(player1) || 0;
    const player2Points = this.points.get(player2) || 0;

    // Es punto de tie break si algún jugador tiene al menos 6 puntos y ventaja de 1
    return (
      (player1Points >= 5 && player1Points === player2Points + 1) ||
      (player2Points >= 5 && player2Points === player1Points + 1)
    );
  }

  /**
   * Verifica si el punto actual puede ser un punto de partido.
   * @returns true si es un potencial punto de partido, false en caso contrario
   */
  public isMatchPoint(): boolean {
    // Nota: Esta función necesitaría información del estado del set y el partido
    // para determinar si realmente es un punto de partido.
    // Esta es una implementación simplificada.
    return this.isGamePoint();
  }
}
