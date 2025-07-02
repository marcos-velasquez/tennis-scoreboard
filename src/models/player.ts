/**
 * Clase que representa a un jugador de tenis.
 */
export class Player {
  private id: number;
  private name: string;

  /**
   * Constructor de la clase Player.
   * @param id Identificador único del jugador
   * @param name Nombre del jugador
   */
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  /**
   * Obtiene el ID del jugador.
   * @returns El ID del jugador
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Obtiene el nombre del jugador.
   * @returns El nombre del jugador
   */
  public getName(): string {
    return this.name;
  }
}
