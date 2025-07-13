import { Match } from '../models/match';

function rallyWin(match: Match, playerIndex: 0 | 1): void {
  const winner = match.getPlayers()[playerIndex];
  if (match.getPlayerWithService() === winner) {
    match.pointService();
  } else {
    match.pointRest();
  }
}

describe('Tennis Integration scenarios', () => {
  it('completes a best-of-3 match 6-0 6-0 (straight sets)', () => {
    const match = new Match(['A', 'B'], 3);

    while (!match.isFinished()) {
      rallyWin(match, 0);
    }

    expect(match.getWinner()).toBe(match.getPlayers()[0]);
    expect(match.getSets()).toHaveLength(2);
  });

  it('completes a best-of-5 match 6-0 6-0 6-0 (straight sets)', () => {
    const match = new Match(['A', 'B'], 5);

    while (!match.isFinished()) {
      rallyWin(match, 1);
    }

    expect(match.getWinner()).toBe(match.getPlayers()[1]);
    expect(match.getSets()).toHaveLength(3);
  });

  it('completes a best-of-5 with 3/2 score', () => {
    const match = new Match(['A', 'B'], 5);

    while (!match.isFinished()) {
      while (!match.getCurrentSet().isFinished()) {
        rallyWin(match, match.getPlayers().indexOf(match.getPlayerWithService()) as 0 | 1);
      }
    }

    expect(match.getWinner()).toBe(match.getPlayers()[0]);
    expect(match.getSets()).toHaveLength(5);
  });

  it('reaches tie-break at 6-6 then ends 7-6', () => {
    const match = new Match(['A', 'B'], 3);
    const [p1, p2] = match.getPlayers();

    while (match.getSets()[0].getGamesWon(p1) < 6 || match.getSets()[0].getGamesWon(p2) < 6) {
      const currentP = match.getSets()[0].getGamesWon(p1) === match.getSets()[0].getGamesWon(p2) ? 0 : 1;

      rallyWin(match, currentP);
    }

    expect(match.getCurrentGame().constructor.name).toBe('TieBreakGame');

    let p1TieBreakPts = 0;
    let p2TieBreakPts = 0;
    const currentGame = match.getCurrentGame();
    while (!currentGame.isFinished()) {
      rallyWin(match, 0);
      p1TieBreakPts++;
      if (!currentGame.isFinished() && p1TieBreakPts < 7) {
        rallyWin(match, 1);
        p2TieBreakPts++;
      }
    }
    expect(p1TieBreakPts).toEqual(8);
    expect(p2TieBreakPts).toEqual(6);
    expect(p1TieBreakPts).toBeGreaterThan(p2TieBreakPts);
    expect(match.getSets()[0].isFinished()).toBe(true);
    expect(match.getSets()[0].getWinner()).toBe(p1);
  });

  it('service alternates correctly between games and tie-break points', () => {
    const match = new Match(['A', 'B'], 3);
    const firstServer = match.getPlayerWithService();
    const currentSet = match.getCurrentSet();

    while (!currentSet.isFinished()) {
      rallyWin(match, match.getPlayers().indexOf(firstServer) as 0 | 1);
    }

    expect(match.getPlayerWithService()).not.toBe(firstServer);

    const [p1, p2] = match.getPlayers();

    while (match.getSets()[1].getGamesWon(p1) < 6 || match.getSets()[1].getGamesWon(p2) < 6) {
      const currentP = match.getSets()[1].getGamesWon(p1) !== match.getSets()[1].getGamesWon(p2) ? 0 : 1;
      rallyWin(match, currentP);
    }

    const firstTbServer = match.getPlayerWithService();
    rallyWin(match, match.getPlayers().indexOf(firstTbServer) as 0 | 1);

    expect(match.getPlayerWithService()).not.toBe(firstTbServer);

    rallyWin(match, match.getPlayers().indexOf(match.getPlayerWithService()) as 0 | 1);

    const serverAfterTwo = match.getPlayerWithService();
    rallyWin(match, match.getPlayers().indexOf(serverAfterTwo) as 0 | 1);
    expect(match.getPlayerWithService()).not.toBe(serverAfterTwo);
  });
});
