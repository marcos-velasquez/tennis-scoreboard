import { Match } from '../models/match';
import { player, alternateWinSets, forceTieBreak, rallyWin, winAnyMatch, winGames, winTieBreak } from './utilities';

describe('Tennis Integration scenarios', () => {
  it('completes a best-of-3 match 6-0 6-0 (straight sets)', () => {
    const match = new Match(['A', 'B'], 3);

    winAnyMatch(match, { player: player.firstPlayer(match) });

    expect(match.getWinner()).toBe(match.getPlayers()[0]);
    expect(match.getSets()).toHaveLength(3);
    expect(match.getSets()[1].isFinished()).toBe(true);
  });

  it('completes a best-of-5 match 6-0 6-0 6-0 (straight sets)', () => {
    const match = new Match(['A', 'B'], 5);

    winAnyMatch(match, { player: player.secondPlayer(match) });

    expect(match.getWinner()).toBe(match.getPlayers()[1]);
    expect(match.getSets()).toHaveLength(5);
    expect(match.getSets()[2].isFinished()).toBe(true);
  });

  it('completes a best-of-5 with 3/2 score', () => {
    const match = new Match(['A', 'B'], 5);

    alternateWinSets(match, { setsPerPlayer: 3 });

    expect(match.getSets()[match.getSets().length - 1].isFinished()).toBe(true);
  });

  it('reaches tie-break at 6-6 then ends 7-6', () => {
    const match = new Match(['A', 'B'], 3);
    const [player1] = match.getPlayers();

    forceTieBreak(match);

    winTieBreak(match, { player: player1 });

    expect(match.getSets()[0].isFinished()).toBe(true);
    expect(match.getSets()[0].getWinner()).toBe(player1);
  });

  it('should alternate service every game in standard play', () => {
    const match = new Match(['A', 'B'], 3);

    const firstRest = match.getRestPlayer();

    winGames(match, { player: firstRest, games: 1 });

    expect(match.getPlayerWithService()).toBe(firstRest);
  });

  it('should alternate service correctly in tie-break (after 1st point, then every 2)', () => {
    const match = new Match(['A', 'B'], 3);
    forceTieBreak(match);

    const initialServer = match.getPlayerWithService();
    const initialReceiver = match.getRestPlayer();

    rallyWin(match, { player: initialServer });
    expect(match.getPlayerWithService()).toBe(initialReceiver);

    rallyWin(match, { player: initialServer });
    expect(match.getPlayerWithService()).toBe(initialReceiver);

    rallyWin(match, { player: initialServer });
    expect(match.getPlayerWithService()).toBe(initialServer);
  });
});
