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
});
