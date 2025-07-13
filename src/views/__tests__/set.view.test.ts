import { SetView } from '../set.view';
import { input } from '../io';

jest.mock('../io', () => ({ input: { range: jest.fn() } }));

describe('SetView', () => {
  let setView: SetView;

  beforeEach(() => {
    setView = new SetView();
    jest.clearAllMocks();
  });

  describe('getAmount', () => {
    it('should return a valid number of sets (3 or 5)', async () => {
      (input.range as jest.Mock).mockResolvedValueOnce(3);

      const result = await setView.getAmount();

      expect(result).toBe(3);
      expect(input.range).toHaveBeenCalledWith('createMatch sets (3 o 5): ', { min: 3, max: 5 });
    });

    it('should retry when an invalid number is entered first', async () => {
      (input.range as jest.Mock).mockResolvedValueOnce(4).mockResolvedValueOnce(5);

      const result = await setView.getAmount();

      expect(result).toBe(5);
      expect(input.range).toHaveBeenCalledTimes(2);
    });
  });
});
