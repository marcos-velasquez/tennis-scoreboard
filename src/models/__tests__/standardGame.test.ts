import { StandardGame } from '../standardGame';
import { Player } from '../player';
import { Service } from '../service';
import { addPoints } from '../../__tests__/utilities';

describe('StandardGame', () => {
  let p1: Player;
  let p2: Player;
  let game: StandardGame;

  beforeEach(() => {
    [p1, p2] = Player.many('A', 'B');
    const service = new Service([p1, p2]);
    game = new StandardGame(service);
  });

  it('should score basic points and finish at 40-0, winner p1', () => {
    addPoints(game, { player: p1, points: 4 });
    expect(game.isFinished()).toBe(true);
    expect(game.getWinner()).toBe(p1);
  });

  it('should reach deuce at 40-40', () => {
    addPoints(game, { player: p1, points: 3 });
    addPoints(game, { player: p2, points: 3 });
    expect(game.getScore(p1)).toBe('40');
    expect(game.getScore(p2)).toBe('40');
    expect(game.isGamePoint()).toBe(false);
  });

  it('should reach advantage for p1 after deuce', () => {
    addPoints(game, { player: p1, points: 3 });
    addPoints(game, { player: p2, points: 3 });
    addPoints(game, { player: p1, points: 1 });
    expect(game.getScore(p1)).toBe('AD');
    expect(game.isGamePoint()).toBe(true);
  });

  it('should get back to deuce from advantage', () => {
    addPoints(game, { player: p1, points: 3 });
    addPoints(game, { player: p2, points: 3 });
    addPoints(game, { player: p1, points: 1 });
    addPoints(game, { player: p2, points: 1 });
    expect(game.getScore(p1)).toBe('40');
    expect(game.getScore(p2)).toBe('40');
  });

  const winScenarios: Array<[number, number]> = [
    [4, 0],
    [4, 1],
    [4, 2],
    [5, 3],
    [6, 4],
  ];

  it.each(winScenarios)('should finish when p1 scores %i and p2 scores %i', (p1Pts, p2Pts) => {
    addPoints(game, { player: p1, points: p1Pts });
    addPoints(game, { player: p2, points: p2Pts });
    expect(game.isFinished()).toBe(true);
    expect(game.getWinner()).toBe(p1);
  });

  it('should NOT finish at 4-3 (only 1-point lead)', () => {
    addPoints(game, { player: p2, points: 3 });
    addPoints(game, { player: p1, points: 4 });
    expect(game.isFinished()).toBe(false);
  });
});
