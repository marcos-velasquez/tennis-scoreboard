import { Match } from '../../models';
import { MatchView } from '../match.view';
import { output } from '../io';

jest.mock('../io', () => ({
  output: { block: jest.fn() },
}));

describe('MatchView', () => {
  let match: jest.Mocked<Match>;
  let matchView: MatchView;
  const mockPlayer1 = { name: 'Player1' };
  const mockPlayer2 = { name: 'Player2' };

  beforeEach(() => {
    match = {
      getPlayerWithService: jest.fn(),
      hasServiceFaulted: jest.fn(),
      getPlayers: jest.fn(),
      getCurrentGameScore: jest.fn(),
      getScores: jest.fn(),
    } as unknown as jest.Mocked<Match>;

    matchView = new MatchView(match);
    jest.clearAllMocks();
  });

  describe('write', () => {
    it('should display scores with service indicator', () => {
      match.getPlayerWithService.mockReturnValue(mockPlayer1);
      match.hasServiceFaulted.mockReturnValue(false);
      match.getPlayers.mockReturnValue([mockPlayer1, mockPlayer2]);
      match.getCurrentGameScore.mockReturnValueOnce('30').mockReturnValueOnce('15');
      match.getScores.mockReturnValueOnce([6, 4]).mockReturnValueOnce([4, 6]);

      matchView.write();

      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('* Player1: 30 6 4'));
      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('  Player2: 15 4 6'));
    });

    it('should display fault indicator when service has faulted', () => {
      match.getPlayerWithService.mockReturnValue(mockPlayer1);
      match.hasServiceFaulted.mockReturnValue(true);
      match.getPlayers.mockReturnValue([mockPlayer1, mockPlayer2]);
      match.getCurrentGameScore.mockReturnValueOnce('0').mockReturnValueOnce('15');
      match.getScores.mockReturnValueOnce([0]).mockReturnValueOnce([0]);

      matchView.write();

      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('+ Player1: 0 0'));
    });

    it('should handle multiple sets correctly', () => {
      match.getPlayerWithService.mockReturnValue(mockPlayer1);
      match.hasServiceFaulted.mockReturnValue(false);
      match.getPlayers.mockReturnValue([mockPlayer1, mockPlayer2]);
      match.getCurrentGameScore.mockReturnValueOnce('40').mockReturnValueOnce('30');
      match.getScores.mockReturnValueOnce([6, 4, 2]).mockReturnValueOnce([4, 6, 3]);

      matchView.write();

      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('6 4 2'));
      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('4 6 3'));
    });
  });
});
