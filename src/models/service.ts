import { Player } from './player';

/**
 * Clase que gestiona el servicio en un juego de tenis.
 */
export class Service {
  private player: Player;
  private hasFaultedFlag: boolean = false;

  /**
   * Constructor de la clase Service.
   * @param player Jugador que tiene actualmente el servicio
   */
  constructor(player: Player) {
    this.player = player;
  }

  /**
   * Cambia el jugador que tiene el servicio.
   * @param newPlayer Nuevo jugador que tendrá el servicio
   */
  public switchPlayer(newPlayer: Player): void {
    this.player = newPlayer;
    this.hasFaultedFlag = false; // Resetear la falta cuando cambia el servicio
  }

  /**
   * Registra una falta de servicio.
   * @returns true si es la segunda falta (punto perdido), false si es la primera falta
   */
  public registerFault(): boolean {
    if (this.hasFaultedFlag) {
      // Segunda falta, punto perdido
      this.hasFaultedFlag = false; // Resetear para el próximo punto
      return true;
    } else {
      // Primera falta, aún tiene otra oportunidad
      this.hasFaultedFlag = true;
      return false;
    }
  }

  /**
   * Obtiene el jugador que tiene actualmente el servicio.
   * @returns El jugador con servicio
   */
  public getCurrentPlayer(): Player {
    return this.player;
  }

  /**
   * Verifica si el jugador con servicio ha cometido una falta.
   * @returns true si ha cometido una falta, false en caso contrario
   */
  public hasFaulted(): boolean {
    return this.hasFaultedFlag;
  }

  /**
   * Resetea el estado de falta.
   */
  public resetFault(): void {
    this.hasFaultedFlag = false;
  }
}
