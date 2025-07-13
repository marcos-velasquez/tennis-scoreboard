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

  it('should award a point to rest player after two consecutive service faults', () => {
    const match = new Match(['A', 'B'], 3);
    const server = match.getPlayerWithService();
    const rest = match.getRestPlayer();

    expect(match.getCurrentGameScore(server)).toBe('0');
    expect(match.getCurrentGameScore(rest)).toBe('0');

    match.lackService();
    expect(match.hasServiceFaulted()).toBe(true);
    expect(match.getCurrentGameScore(server)).toBe('0');
    expect(match.getCurrentGameScore(rest)).toBe('0');

    match.lackService();
    expect(match.hasServiceFaulted()).toBe(false);
    expect(match.getCurrentGameScore(rest)).toBe('15');
  });
});
