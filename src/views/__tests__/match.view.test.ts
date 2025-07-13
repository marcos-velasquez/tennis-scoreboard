import { Match } from '../../models';
import { MatchView } from '../match.view';
import { ScoreView } from '../score.view';
import { WinnerView } from '../winner.view';

jest.mock('../score.view');
jest.mock('../winner.view');

describe('MatchView', () => {
  let match: jest.Mocked<Match>;
  let matchView: MatchView;

  beforeEach(() => {
    match = { isFinished: jest.fn() } as unknown as jest.Mocked<Match>;

    matchView = new MatchView(match);

    jest.clearAllMocks();
  });

  describe('write', () => {
    it('should call WinnerView.write() when match is finished', () => {
      const mockWinnerViewInstance = { write: jest.fn() };
      (WinnerView as jest.Mock).mockImplementation(() => mockWinnerViewInstance);
      match.isFinished.mockReturnValue(true);

      matchView.write();

      expect(WinnerView).toHaveBeenCalledWith(match);
      expect(mockWinnerViewInstance.write).toHaveBeenCalled();
      expect(ScoreView).not.toHaveBeenCalled();
    });

    it('should call ScoreView.write() when match is not finished', () => {
      const mockScoreViewInstance = { write: jest.fn() };
      (ScoreView as jest.Mock).mockImplementation(() => mockScoreViewInstance);
      match.isFinished.mockReturnValue(false);

      matchView.write();

      expect(ScoreView).toHaveBeenCalledWith(match);
      expect(mockScoreViewInstance.write).toHaveBeenCalled();
      expect(WinnerView).not.toHaveBeenCalled();
    });
  });
});
