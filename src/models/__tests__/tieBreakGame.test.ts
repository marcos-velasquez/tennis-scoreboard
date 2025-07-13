import { TieBreakGame } from '../tieBreakGame';
import { Service } from '../service';
import { Player } from '../player';
import { addPoints, setScore } from '../../__tests__/utilities';

describe('TieBreakGame', () => {
  let p1: Player;
  let p2: Player;
  let game: TieBreakGame;

  beforeEach(() => {
    [p1, p2] = Player.many('A', 'B');
    const players = [p1, p2];
    const service = new Service(players);
    game = new TieBreakGame(players, service);
  });

  it('should reach 6-6', () => {
    setScore(game, { p1: 6, p2: 6 });
    expect(game.isFinished()).toBe(false);
    expect(game.getWinner()).toBeNull();
  });

  const winScenarios: Array<[number, number]> = [
    [7, 0],
    [7, 5],
    [8, 6],
    [13, 11],
  ];

  it.each(winScenarios)('should finish at %i-%i when p1 wins', (p1Pts, p2Pts) => {
    addPoints(game, { player: p1, points: p1Pts });
    addPoints(game, { player: p2, points: p2Pts });
    expect(game.isFinished()).toBe(true);
    expect(game.getWinner()).toBe(p1);
  });

  const notFinishedScenarios: Array<[number, number]> = [
    [6, 5],
    [7, 6],
    [12, 11],
  ];

  it.each(notFinishedScenarios)('should NOT finish at %i-%i (lead of 1)', (p1Pts, p2Pts) => {
    setScore(game, { p1: p1Pts, p2: p2Pts });
    expect(game.isFinished()).toBe(false);
  });

  it('should change service correctly during the tie-break', () => {
    const initialServer = game.getService().getCurrentPlayer();
    const receiver = game.getService().getRestPlayer();

    game.addPoint(initialServer);
    expect(game.getService().getCurrentPlayer()).toBe(receiver);

    game.addPoint(receiver);
    expect(game.getService().getCurrentPlayer()).toBe(receiver);

    game.addPoint(receiver);
    expect(game.getService().getCurrentPlayer()).toBe(initialServer);
  });
});
