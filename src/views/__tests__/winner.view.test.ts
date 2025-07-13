import { Match } from '../../models';
import { WinnerView } from '../winner.view';
import { output } from '../io';

jest.mock('../io', () => ({ output: { block: jest.fn() } }));

describe('WinnerView', () => {
  let match: jest.Mocked<Match>;
  let winnerView: WinnerView;
  const mockPlayer1 = { name: 'Player1' };
  const mockPlayer2 = { name: 'Player2' };

  beforeEach(() => {
    match = {
      getPlayers: jest.fn(),
      getScores: jest.fn(),
      getWinner: jest.fn(),
    } as unknown as jest.Mocked<Match>;

    winnerView = new WinnerView(match);
    jest.clearAllMocks();
  });

  describe('write', () => {
    it('should display the winner and scores for both players', () => {
      match.getPlayers.mockReturnValue([mockPlayer1, mockPlayer2]);
      match.getScores.mockReturnValueOnce([6, 4, 6]).mockReturnValueOnce([4, 6, 3]);
      match.getWinner.mockReturnValue(mockPlayer1);

      winnerView.write();

      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('Player1: - 6 4 6'));
      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('Player2: - 4 6 3'));
      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('Ganador: Player1'));
    });

    it('should handle different score formats', () => {
      match.getPlayers.mockReturnValue([mockPlayer1, mockPlayer2]);
      match.getScores.mockReturnValueOnce([7, 6]).mockReturnValueOnce([6, 4]);
      match.getWinner.mockReturnValue(mockPlayer1);

      winnerView.write();

      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('Player1: - 7 6'));
      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('Player2: - 6 4'));
      expect(output.block).toHaveBeenCalledWith(expect.stringContaining('Ganador: Player1'));
    });
  });
});
