import { Set } from '../set';
import { Service } from '../service';
import { Player } from '../player';
import { winGame, winGamesInSet } from '../../__tests__/utilities';

describe('Set', () => {
  let p1: Player;
  let p2: Player;
  let service: Service;

  beforeEach(() => {
    [p1, p2] = Player.many('A', 'B');
    jest.spyOn(Math, 'random').mockReturnValue(0);
    service = new Service([p1, p2]);
    (Math.random as jest.Mock).mockRestore?.();
  });

  it('should end 6-0 in favour of p1', () => {
    const set = new Set(service);
    winGamesInSet(set, { player: p1, games: 6 });
    expect(set.isFinished()).toBe(true);
    expect(set.getWinner()).toBe(p1);
    expect(set.getGamesWon(p1)).toBe(6);
  });

  it('should start tie-break at 6-6', () => {
    const set = new Set(service);
    for (let i = 0; i < 6; i++) {
      winGame(set, { player: p1 });
      winGame(set, { player: p2 });
    }
    expect(set.isFinished()).toBe(false);
    expect(set.getCurrentGame().constructor.name).toBe('TieBreakGame');
  });

  it('should NOT finish before 6 games are played', () => {
    const set = new Set(service);
    winGamesInSet(set, { player: p1, games: 5 });
    expect(set.isFinished()).toBe(false);
  });

  it('should finish after a maximum of 13 games (7-6)', () => {
    const set = new Set(service);

    for (let i = 0; i < 6; i++) {
      winGame(set, { player: p1 });
      winGame(set, { player: p2 });
    }

    winGame(set, { player: p1 });

    expect(set.isFinished()).toBe(true);
    expect(set.getWinner()).toBe(p1);
  });
});
