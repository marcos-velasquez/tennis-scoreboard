import { Match } from '../models/match';

export function rallyWin(match: Match, playerIndex: 0 | 1): void {
  const winner = match.getPlayers()[playerIndex];
  if (match.getPlayerWithService() === winner) {
    match.pointService();
  } else {
    match.pointRest();
  }
}

export function winGames(match: Match, playerIndex: 0 | 1, games: number): void {
  for (let i = 0; i < games; i++) {
    const currentGame = match.getCurrentGame();
    while (!currentGame.isFinished()) {
      rallyWin(match, playerIndex);
    }
  }
}

export function forceTieBreak(match: Match): void {
  for (let i = 0; i < 6; i++) {
    winGames(match, 0, 1);
    winGames(match, 1, 1);
  }
  expect(match.getCurrentGame().constructor.name).toBe('TieBreakGame');
}

export function alternateWinGames(match: Match, gamesPerPlayer: number): void {
  for (let i = 0; i < gamesPerPlayer; i++) {
    winGames(match, 0, 1);
    winGames(match, 1, 1);
  }
}

export function winSet(match: Match, playerIndex: 0 | 1): void {
  const currentSet = match.getCurrentSet();
  while (!currentSet.isFinished()) {
    winGames(match, playerIndex, 1);
  }
}

export function alternateWinSets(match: Match, setsPerPlayer: number): void {
  for (let i = 0; i < setsPerPlayer; i++) {
    winSet(match, 0);
    if (!match.isFinished()) {
      winSet(match, 1);
    }
  }
}

export function winTieBreak(match: Match, playerIndex: 0 | 1): void {
  const currentGame = match.getCurrentGame();

  while (!currentGame.isFinished()) {
    rallyWin(match, playerIndex);
  }
}

export function winAnyMatch(match: Match, playerIndex: 0 | 1): void {
  while (!match.isFinished()) {
    rallyWin(match, playerIndex);
  }
}
