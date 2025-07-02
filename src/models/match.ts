import { Player } from './player';
import { Set } from './set';
import { Game } from './game';
import { Service } from './service';
import { ScoreBoard } from './scoreBoard';

/**
 * Clase que representa un partido de tenis.
 */
export class Match {
  private id: number;
  private date: Date;
  private numberOfSets: number;
  private players: Player[];
  private sets: Set[] = [];
  private finished: boolean = false;
  private winner: Player | null = null;
  private service: Service;
  private scoreBoard: ScoreBoard;

  /**
   * Constructor de la clase Match.
   * @param id Identificador único del partido
   * @param numberOfSets Número de sets (3 o 5)
   * @param players Los dos jugadores que participan
   */
  constructor(id: number, numberOfSets: number, players: Player[]) {
    if (numberOfSets !== 3 && numberOfSets !== 5) {
      throw new Error('Un partido debe tener 3 o 5 sets');
    }

    if (players.length !== 2) {
      throw new Error('Un partido debe tener exactamente 2 jugadores');
    }

    this.id = id;
    this.date = new Date();
    this.numberOfSets = numberOfSets;
    this.players = players;
    this.scoreBoard = new ScoreBoard();

    // Determinar aleatoriamente el primer jugador con servicio
    const randomIndex = Math.floor(Math.random() * 2);
    const initialServerPlayer = players[randomIndex];
    this.service = new Service(initialServerPlayer);

    // Crear el primer set
    this.createNewSet(initialServerPlayer);
  }

  /**
   * Crea un nuevo partido de tenis.
   * @param numberOfSets Número de sets (3 o 5)
   * @param players Los dos jugadores que participan
   * @returns El partido creado
   */
  public static createMatch(numberOfSets: number, players: Player[]): Match {
    // En una implementación real, aquí se generaría un ID único
    const id = new Date().getTime();
    return new Match(id, numberOfSets, players);
  }

  /**
   * Crea un nuevo set para el partido.
   * @param initialServerPlayer Jugador que inicia con el servicio
   */
  private createNewSet(initialServerPlayer: Player): void {
    const newSet = new Set(this.players, initialServerPlayer);
    this.sets.push(newSet);
  }

  /**
   * Obtiene el set actual en progreso.
   * @returns El set actual
   */
  public getCurrentSet(): Set | null {
    if (this.finished) return null;
    return this.sets[this.sets.length - 1];
  }

  /**
   * Obtiene el juego actual en progreso.
   * @returns El juego actual
   */
  public getCurrentGame(): Game | null {
    const currentSet = this.getCurrentSet();
    return currentSet ? currentSet.getCurrentGame() : null;
  }

  /**
   * Añade un punto para el jugador con servicio.
   */
  public pointService(): void {
    if (this.finished) return;

    const currentGame = this.getCurrentGame();
    if (!currentGame) return;

    const playerWithService = this.service.getCurrentPlayer();
    this.addPointToPlayer(playerWithService);
  }

  /**
   * Añade un punto para el jugador que resta (no tiene servicio).
   */
  public pointRest(): void {
    if (this.finished) return;

    const currentGame = this.getCurrentGame();
    if (!currentGame) return;

    const playerWithService = this.service.getCurrentPlayer();
    const playerRest = this.players.find((p) => p !== playerWithService)!;
    this.addPointToPlayer(playerRest);
  }

  /**
   * Registra una falta de servicio.
   */
  public lackService(): void {
    if (this.finished) return;

    // Registrar la falta y verificar si es segunda falta
    const isSecondFault = this.service.registerFault();

    if (isSecondFault) {
      // Si es segunda falta, el punto es para el jugador que resta
      this.pointRest();
      // Resetear el estado de falta para el próximo punto
      this.service.resetFault();
    }
  }

  /**
   * Añade un punto a un jugador específico y gestiona las consecuencias.
   * @param player Jugador que recibe el punto
   */
  private addPointToPlayer(player: Player): void {
    const currentGame = this.getCurrentGame();
    if (!currentGame) return;

    // Añadir el punto al juego actual
    currentGame.addPoint(player);

    // Resetear estado de falta después de cada punto
    this.service.resetFault();

    // Verificar si el juego ha terminado
    if (currentGame.isFinished()) {
      const currentSet = this.getCurrentSet()!;
      currentSet.addGame(currentGame);

      // Verificar si el set ha terminado
      if (currentSet.isFinished()) {
        this.checkMatchFinished();

        // Si el partido no ha terminado, crear un nuevo set
        if (!this.finished) {
          // Determinar el jugador que inicia con servicio en el nuevo set
          // Esta lógica debe considerar las reglas especiales después de un tie break
          let nextServerPlayer = this.determineNextSetServerPlayer(currentSet);
          this.createNewSet(nextServerPlayer);
        }
      }
    }
  }

  /**
   * Determina el jugador que debe tener el servicio en el próximo set.
   * @param currentSet Set que acaba de terminar
   * @returns Jugador que debe tener el servicio en el próximo set
   */
  private determineNextSetServerPlayer(currentSet: Set): Player {
    // Implementación simplificada
    // En un caso real, necesitaríamos lógica adicional para manejar el caso después de un tie break
    const currentServicePlayer = this.service.getCurrentPlayer();
    const otherPlayer = this.players.find((p) => p !== currentServicePlayer)!;

    // El servicio alterna entre sets
    this.service.switchPlayer(otherPlayer);
    return otherPlayer;
  }

  /**
   * Verifica si el partido ha terminado según las reglas del tenis.
   */
  private checkMatchFinished(): void {
    // Contar sets ganados por cada jugador
    const setsWonPlayer1 = this.sets.filter((set) => set.getWinner() === this.players[0]).length;
    const setsWonPlayer2 = this.sets.filter((set) => set.getWinner() === this.players[1]).length;

    // En partido a 3 sets, gana quien llegue primero a 2 sets
    // En partido a 5 sets, gana quien llegue primero a 3 sets
    const setsToWin = this.numberOfSets === 3 ? 2 : 3;

    if (setsWonPlayer1 >= setsToWin) {
      this.finished = true;
      this.winner = this.players[0];
    } else if (setsWonPlayer2 >= setsToWin) {
      this.finished = true;
      this.winner = this.players[1];
    }
  }

  /**
   * Obtiene la puntuación del juego actual para un jugador.
   * @param player Jugador para el cual obtener la puntuación
   * @returns La representación de la puntuación como cadena
   */
  public getCurrentGameScore(player: Player): string {
    const currentGame = this.getCurrentGame();
    if (!currentGame) return '-';
    return currentGame.getScore(player);
  }

  /**
   * Verifica si el partido ha finalizado.
   * @returns true si el partido ha finalizado, false en caso contrario
   */
  public isFinished(): boolean {
    return this.finished;
  }

  /**
   * Obtiene el jugador ganador del partido.
   * @returns El jugador ganador o null si el partido no ha terminado
   */
  public getWinner(): Player | null {
    return this.winner;
  }

  /**
   * Obtiene el jugador que tiene actualmente el servicio.
   * @returns El jugador con servicio
   */
  public getPlayerWithService(): Player {
    return this.service.getCurrentPlayer();
  }

  /**
   * Verifica si ha habido una falta de servicio.
   * @returns true si ha habido una falta de servicio, false en caso contrario
   */
  public hasServiceFaulted(): boolean {
    return this.service.hasFaulted();
  }

  /**
   * Obtiene el identificador del partido.
   * @returns El ID del partido
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Obtiene la fecha del partido.
   * @returns La fecha del partido
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Obtiene los jugadores que participan en el partido.
   * @returns Los jugadores
   */
  public getPlayers(): Player[] {
    return this.players;
  }

  /**
   * Obtiene los sets del partido.
   * @returns Los sets
   */
  public getSets(): Set[] {
    return this.sets;
  }

  /**
   * Obtiene el marcador del partido.
   * @returns El tablero de puntuación
   */
  public getScore(): string {
    return this.scoreBoard.displayScore(this);
  }
}
