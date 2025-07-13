import { Player } from '../player';

describe('Player', () => {
  it('should create multiple players with Player.many', () => {
    const players = Player.many('A', 'B', 'C');
    expect(players).toHaveLength(3);
    expect(players[0]).toBeInstanceOf(Player);
    expect(players.map((p) => p.name)).toEqual(['A', 'B', 'C']);
  });

  describe('equals', () => {
    it('should return true for two player instances with the same name', () => {
      const player1 = new Player('A');
      const player2 = new Player('A');
      expect(player1.equals(player2)).toBe(true);
    });

    it('should return false for two players with different names', () => {
      const player1 = new Player('A');
      const player2 = new Player('B');
      expect(player1.equals(player2)).toBe(false);
    });

    it('should return true when comparing a player to itself', () => {
      const player = new Player('A');
      expect(player.equals(player)).toBe(true);
    });
  });
});
