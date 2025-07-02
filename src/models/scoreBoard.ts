import { Player } from './player';
import { Set } from './set';

// Usaremos una interfaz para evitar la importación circular con Match
interface IMatch {
  getPlayers(): Player[];
  getPlayerWithService(): Player;
  hasServiceFaulted(): boolean;
  getCurrentGameScore(player: Player): string;
  getSets(): Set[];
  isFinished(): boolean;
  getWinner(): Player | null;
}

/**
 * Clase que representa el tablero de puntuación de un partido de tenis.
 */
export class ScoreBoard {
  /**
   * Muestra el marcador del partido en formato de consola.
   * @param match Partido del que se mostrará el marcador
   * @returns Cadena de texto con el marcador formateado
   */
  public displayScore(match: IMatch): string {
    const players = match.getPlayers();
    const playerWithService = match.getPlayerWithService();
    const hasFaulted = match.hasServiceFaulted();

    let scoreText = '';

    // Si el partido ha terminado, no se muestra ni asterisco ni signo más
    if (!match.isFinished()) {
      // Construir la información para cada jugador
      for (let player of players) {
        // Asterisco indica el jugador con servicio
        const serviceIndicator = playerWithService === player ? '*' : ' ';
        // Signo más indica que ha habido una falta de servicio
        const faultIndicator = playerWithService === player && hasFaulted ? '+' : ' ';

        // Prefijo: asterisco o signo más, dependiendo del estado
        const prefix = hasFaulted ? faultIndicator : serviceIndicator;

        // Nombre del jugador
        const playerName = player.getName().padEnd(8, ' ');

        // Puntos en el juego actual
        const currentGameScore = match.getCurrentGameScore(player);

        // Juegos ganados en cada set
        const setsScores = match
          .getSets()
          .map((set) => set.getGamesWon(player))
          .join(' ');

        scoreText += `${prefix} ${playerName}: ${currentGameScore} ${setsScores}\n`;
      }
    } else {
      // Si el partido ha terminado, mostrar el ganador
      const winner = match.getWinner();
      if (winner) {
        // Mostrar el marcador final sin indicadores de servicio o faltas
        for (let player of players) {
          const playerName = player.getName().padEnd(8, ' ');
          const setsScores = match
            .getSets()
            .map((set) => set.getGamesWon(player))
            .join(' ');
          scoreText += `  ${playerName}: - ${setsScores}\n`;
        }

        scoreText += `\nGanador: ${winner.getName()}`;
      }
    }

    return scoreText;
  }
}
