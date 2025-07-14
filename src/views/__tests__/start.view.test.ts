import { Match } from '../../models';
import { StartView } from '..';

jest.mock('../set.view');
jest.mock('../player.view');
jest.mock('../io', () => ({ input: { string: jest.fn() } }));

const mockGetAmount = jest.fn();

jest.mock('../set.view', () => {
  return {
    SetView: jest.fn().mockImplementation(() => {
      return { getAmount: mockGetAmount };
    }),
  };
});

const mockGetName = jest.fn();
jest.mock('../player.view', () => {
  return {
    PlayerView: jest.fn().mockImplementation(() => {
      return { getName: mockGetName };
    }),
  };
});

describe('StartView', () => {
  it('should return a match with the correct players and number of sets', async () => {
    const mockSets = 3 as const;
    const mockPlayer1 = 'Player 1';
    const mockPlayer2 = 'Player 2';

    mockGetAmount.mockResolvedValue(mockSets);
    mockGetName.mockResolvedValueOnce(mockPlayer1).mockResolvedValueOnce(mockPlayer2);

    const startView = new StartView();
    const match = await startView.getMatch();

    expect(match).toBeInstanceOf(Match);
    expect(match.getPlayers()[0].name).toBe(mockPlayer1);
    expect(match.getPlayers()[1].name).toBe(mockPlayer2);
    expect(match.numberOfSets).toBe(mockSets);
    expect(mockGetAmount).toHaveBeenCalledTimes(1);
    expect(mockGetName).toHaveBeenCalledTimes(2);
  });
});
