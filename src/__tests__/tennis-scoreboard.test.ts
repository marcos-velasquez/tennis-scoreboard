import { TieBreakGame } from '../models/tieBreakGame';
import { Match } from '../models/match';
import {
  alternateWinGames,
  alternateWinSets,
  forceTieBreak,
  rallyWin,
  winAnyMatch,
  winGames,
  winTieBreak,
} from './utilities';

describe('Tennis Integration scenarios', () => {
  it('completes a best-of-3 match 6-0 6-0 (straight sets)', () => {
    const match = new Match(['A', 'B'], 3);

    winAnyMatch(match, 0);

    expect(match.getWinner()).toBe(match.getPlayers()[0]);
    expect(match.getSets()).toHaveLength(3);
  });

  it('completes a best-of-5 match 6-0 6-0 6-0 (straight sets)', () => {
    const match = new Match(['A', 'B'], 5);

    winAnyMatch(match, 1);

    expect(match.getWinner()).toBe(match.getPlayers()[1]);
    expect(match.getSets()).toHaveLength(5);
  });

  it('completes a best-of-5 with 3/2 score', () => {
    const match = new Match(['A', 'B'], 5);

    alternateWinSets(match, 3);

    expect(match.getSets()[match.getSets().length - 1].isFinished()).toBe(true);
  });

  it('reaches tie-break at 6-6 then ends 7-6', () => {
    const match = new Match(['A', 'B'], 3);
    const [player1] = match.getPlayers();

    forceTieBreak(match);

    alternateWinGames(match, 6);

    winGames(match, 0, 2);

    expect(match.getSets()[0].isFinished()).toBe(true);
    expect(match.getSets()[0].getWinner()).toBe(player1);
  });

  it('service alternates correctly between games and tie-break points', () => {
    const match = new Match(['A', 'B'], 3);
    const firstServer = match.getPlayerWithService();
    winGames(match, match.getPlayers().indexOf(firstServer) as 0 | 1, 1);

    expect(match.getPlayerWithService()).not.toBe(firstServer);

    forceTieBreak(match);

    const firstTbServer = match.getPlayerWithService();

    rallyWin(match, match.getPlayers().indexOf(firstTbServer) as 0 | 1);

    expect(match.getPlayerWithService()).toBe(firstTbServer);

    rallyWin(match, match.getPlayers().indexOf(match.getPlayerWithService()) as 0 | 1);

    expect(match.getPlayerWithService()).not.toBe(firstTbServer);
  });

  it('should alternate service every game in standard play', () => {
    const match = new Match(['A', 'B'], 3);

    const firstRest = match.getRestPlayer();

    winGames(match, 0, 1);

    expect(match.getPlayerWithService()).toBe(firstRest);
  });

  it('should alternate service every point in tie-break', () => {
    const match = new Match(['A', 'B'], 3);

    forceTieBreak(match);

    const tieBreakServer = match.getPlayerWithService();
    rallyWin(match, match.getPlayers().indexOf(tieBreakServer) as 0 | 1);
    expect(match.getPlayerWithService()).toBe(tieBreakServer);

    rallyWin(match, match.getPlayers().indexOf(match.getPlayerWithService()) as 0 | 1);
    expect(match.getPlayerWithService()).not.toBe(tieBreakServer);
  });
});
