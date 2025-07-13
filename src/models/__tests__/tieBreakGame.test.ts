import { TieBreakGame } from '../tieBreakGame';
import { Service } from '../service';
import { Player } from '../player';

describe('TieBreakGame', () => {
  let p1: Player;
  let p2: Player;
  let game: TieBreakGame;

  beforeEach(() => {
    [p1, p2] = Player.many('A', 'B');
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const service = new Service([p1, p2]);
    (Math.random as jest.Mock).mockRestore?.();
    game = new TieBreakGame(service);
  });

  it('should win 7-5 for p1', () => {
    for (let i = 0; i < 7; i++) {
      game.addPoint(p1);
      if (i < 5) {
        game.addPoint(p2);
      }
    }
    expect(game.isFinished()).toBe(true);
    expect(game.getWinner()).toBe(p1);
  });

  const winScenarios: Array<[number, number]> = [
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [7, 5],
    [13, 11],
  ];

  it.each(winScenarios)('should finish at %i-%i (p1-p2) with ≥2 lead', (p1Pts, p2Pts) => {
    [p1, p2] = Player.many('A', 'B');
    const service = new Service([p1, p2]);
    game = new TieBreakGame(service);

    for (let i = 0; i < Math.max(p1Pts, p2Pts); i++) {
      if (i < p1Pts) game.addPoint(p1);
      if (i < p2Pts) game.addPoint(p2);
    }
    expect(game.isFinished()).toBe(true);
    expect(game.getWinner()).toBe(p1);
  });

  it('should NOT finish at 6-5 (lead of 1)', () => {
    for (let i = 0; i < 6; i++) {
      game.addPoint(p1);
      if (i < 5) game.addPoint(p2);
    }
    expect(game.isFinished()).toBe(false);
  });
});
