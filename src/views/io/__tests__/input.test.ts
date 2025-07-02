import { Input } from '../input';

describe('Input', () => {
  let mockQuestion: jest.Mock;
  let input: Input;
  let resolveFunctions: Array<(answer: string) => void> = [];
  let questionCalls = 0;

  beforeEach(() => {
    questionCalls = 0;
    resolveFunctions = [];

    mockQuestion = jest.fn().mockImplementation((_, callback) => {
      questionCalls++;
      resolveFunctions.push(callback);
    });

    const mockReadline = { question: mockQuestion } as unknown as any;
    input = new Input(mockReadline);
  });

  afterEach(() => {
    resolveFunctions = [];
    questionCalls = 0;
  });

  describe('string', () => {
    it('should resolve with the user input', async () => {
      const testValue = 'test value 123 **()';
      const promise = input.string('Enter something: ');
      resolveFunctions[0](testValue);
      const result = await promise;
      expect(mockQuestion).toHaveBeenCalledWith('Enter something: ', expect.any(Function));
      expect(result).toBe(testValue);
    });
  });

  describe('int', () => {
    it.each(['100', '0', '1234567890', '-5'])('should resolve with a number for valid input', async (testValue) => {
      const promise = input.int('Enter a number: ');
      resolveFunctions[0](testValue);
      const result = await promise;
      expect(result).toBe(Number(testValue));
    });

    it('should retry for non-numeric input', async () => {
      const promise = input.int('Enter a number: ');
      resolveFunctions[0]('not a number');
      await new Promise((resolve) => setTimeout(resolve, 0));
      resolveFunctions[1]('42');
      const result = await promise;
      expect(mockQuestion).toHaveBeenCalledTimes(2);
      expect(result).toBe(42);
    });
  });

  describe('range', () => {
    it('should accept a number within range', async () => {
      const promise = input.range('Enter a number between 1-10: ', { min: 1, max: 10 });
      resolveFunctions[0]('5');

      const result = await promise;
      expect(result).toBe(5);
    });

    it('should reject a number below min and retry', async () => {
      const promise = input.range('Enter a number between 1-10: ', { min: 1, max: 10 });

      resolveFunctions[0]('0');
      await new Promise((resolve) => setTimeout(resolve, 0));
      resolveFunctions[1]('5');

      const result = await promise;
      expect(mockQuestion).toHaveBeenCalledTimes(2);
      expect(result).toBe(5);
    });

    it('should reject a number above max and retry', async () => {
      const promise = input.range('Enter a number between 1-10: ', { min: 1, max: 10 });

      resolveFunctions[0]('11');
      await new Promise((resolve) => setTimeout(resolve, 0));
      resolveFunctions[1]('8');

      const result = await promise;
      expect(mockQuestion).toHaveBeenCalledTimes(2);
      expect(result).toBe(8);
    });

    it('should accept any value when min is not provided', async () => {
      const promise = input.range('Enter a number: ', { max: 10 });
      resolveFunctions[0]('-1');
      const result = await promise;
      expect(result).toBe(-1);
      expect(mockQuestion).toHaveBeenCalledTimes(1);
    });

    it('should use default max (Infinity) when not provided', async () => {
      const promise = input.range('Enter a number >= 5: ', { min: 5 });
      resolveFunctions[0]('999999');
      const result = await promise;
      expect(result).toBe(999999);
    });
  });
});
