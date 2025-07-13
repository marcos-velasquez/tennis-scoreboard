import { StandardGame } from '../standardGame';
import { Player } from '../player';
import { Service } from '../service';

describe('StandardGame', () => {
  let p1: Player;
  let p2: Player;
  let game: StandardGame;

  beforeEach(() => {
    [p1, p2] = Player.many('A', 'B');
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const service = new Service([p1, p2]);
    (Math.random as jest.Mock).mockRestore?.();
    game = new StandardGame(service);
  });

  it('should score basic points and finish at 40-0, winner p1', () => {
    game.addPoint(p1);
    game.addPoint(p1);
    game.addPoint(p1);
    game.addPoint(p1);
    expect(game.isFinished()).toBe(true);
    expect(game.getWinner()).toBe(p1);
  });

  it('should reach deuce and advantage scenarios', () => {
    for (let i = 0; i < 3; i++) {
      game.addPoint(p1);
      game.addPoint(p2);
    }

    expect(game.getScore(p1)).toBe('40');
    game.addPoint(p1);
    expect(game.getScore(p1)).toBe('AD');
    expect(game.isGamePoint()).toBe(true);
  });

  const winScenarios: Array<[number, number]> = [
    [4, 0],
    [4, 1],
    [4, 2],
    [5, 3],
    [6, 4],
    [7, 5],
  ];

  it.each(winScenarios)('should finish at %i-%i (p1-p2) when p1 leads by 2 and has ≥4 pts', (p1Pts, p2Pts) => {
    [p1, p2] = Player.many('A', 'B');
    const service = new Service([p1, p2]);
    game = new StandardGame(service);
    for (let i = 0; i < Math.max(p1Pts, p2Pts); i++) {
      if (i < p1Pts) game.addPoint(p1);
      if (i < p2Pts) game.addPoint(p2);
    }
    expect(game.isFinished()).toBe(true);
    expect(game.getWinner()).toBe(p1);
  });

  it('should NOT finish at 4-3 (only 1-point lead)', () => {
    game.addPoint(p1);
    game.addPoint(p2);
    game.addPoint(p1);
    game.addPoint(p2);
    game.addPoint(p1);
    game.addPoint(p2);
    game.addPoint(p1);
    expect(game.isFinished()).toBe(false);
  });
});
