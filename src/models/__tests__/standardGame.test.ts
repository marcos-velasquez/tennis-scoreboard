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
});
