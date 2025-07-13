import { Player } from '../player';

describe('Player', () => {
  it('should create multiple players with Player.many', () => {
    const players = Player.many('A', 'B', 'C');
    expect(players).toHaveLength(3);
    expect(players[0]).toBeInstanceOf(Player);
    expect(players.map((p) => p.name)).toEqual(['A', 'B', 'C']);
  });
});
