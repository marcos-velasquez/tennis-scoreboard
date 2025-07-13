import { Match } from '../match';

describe('Match', () => {
  it('should create match and finish best of 3 sets for first player', () => {
    const match = new Match(['A', 'B'], 3);
    const p1 = match.getPlayers()[0];

    while (!match.isFinished()) {
      if (match.getPlayerWithService() === p1) {
        match.pointService();
      } else {
        match.pointRest();
      }
    }

    expect(match.isFinished()).toBe(true);
    expect(match.getWinner()).toBe(p1);
  });
});
