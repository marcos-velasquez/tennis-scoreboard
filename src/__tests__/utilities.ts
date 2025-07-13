import { Match } from '../models/match';
import { Player } from '../models/player';

export function rallyWin(match: Match, props: { player: Player }): void {
  const { player } = props;
  if (match.getPlayerWithService() === player) {
    match.pointService();
  } else {
    match.pointRest();
  }
}

export function winGames(match: Match, props: { player: Player; games: number }): void {
  const { player, games } = props;
  for (let i = 0; i < games; i++) {
    const currentGame = match.getCurrentGame();
    while (!currentGame.isFinished()) {
      rallyWin(match, { player });
    }
  }
}

export function alternateWinGames(
  match: Match,
  props: { gamesPerPlayer: number; player1: Player; player2: Player },
): void {
  const { gamesPerPlayer, player1, player2 } = props;
  for (let i = 0; i < gamesPerPlayer; i++) {
    winGames(match, { player: player1, games: 1 });
    winGames(match, { player: player2, games: 1 });
  }
}

export function winSet(match: Match, props: { player: Player }): void {
  const { player } = props;
  const currentSet = match.getCurrentSet();
  while (!currentSet.isFinished()) {
    winGames(match, { player, games: 1 });
  }
}

export function alternateWinSets(match: Match, props: { setsPerPlayer: number }): void {
  const { setsPerPlayer } = props;
  for (let i = 0; i < setsPerPlayer; i++) {
    winSet(match, { player: match.getPlayerWithService() });
    if (!match.isFinished()) {
      winSet(match, { player: match.getRestPlayer() });
    }
  }
}

export function forceTieBreak(match: Match): void {
  const currentSet = match.getCurrentSet();
  const [player1, player2] = match.getPlayers();

  let scorePlayer1 = currentSet.getGamesWon(player1);
  let scorePlayer2 = currentSet.getGamesWon(player2);

  if (scorePlayer1 > scorePlayer2) {
    const gamesToWin = scorePlayer1 - scorePlayer2;
    winGames(match, { player: player2, games: gamesToWin });
  } else if (scorePlayer2 > scorePlayer1) {
    const gamesToWin = scorePlayer2 - scorePlayer1;
    winGames(match, { player: player1, games: gamesToWin });
  }

  scorePlayer1 = currentSet.getGamesWon(player1);
  const gamesToAlternate = 6 - scorePlayer1;

  if (gamesToAlternate > 0) {
    alternateWinGames(match, { gamesPerPlayer: gamesToAlternate, player1, player2 });
  }
}

export function winTieBreak(match: Match, props: { player: Player }): void {
  const { player } = props;
  const currentGame = match.getCurrentGame();

  while (!currentGame.isFinished()) {
    rallyWin(match, { player });
  }
}

export function winAnyMatch(match: Match, props: { player: Player }): void {
  const { player } = props;
  while (!match.isFinished()) {
    rallyWin(match, { player });
  }
}

export const player = {
  index: (match: Match, player: Player): 0 | 1 => match.getPlayers().indexOf(player) as 0 | 1,
  firstPlayer: (match: Match): Player => match.getPlayers()[0],
  secondPlayer: (match: Match): Player => match.getPlayers()[1],
};
