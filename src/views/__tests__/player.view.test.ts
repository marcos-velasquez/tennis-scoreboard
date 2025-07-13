import { PlayerView } from '../player.view';
import { input } from '../io';

jest.mock('../io', () => ({ input: { string: jest.fn() } }));

describe('PlayerView', () => {
  let playerView: PlayerView;

  beforeEach(() => {
    playerView = new PlayerView();
    jest.clearAllMocks();
  });

  describe('getName', () => {
    it('should request the player name and return it', async () => {
      (input.string as jest.Mock).mockResolvedValueOnce('Juan');

      const result = await playerView.getName({ identifier: 2 });

      expect(result).toBe('Juan');
      expect(input.string).toHaveBeenCalledWith('Ingrese el nombre del jugador 2: ');
    });
  });
});
