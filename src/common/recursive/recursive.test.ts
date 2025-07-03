import { recursive } from './recursive';

describe('recursive', () => {
  it('should return value immediately when condition is met on first call', async () => {
    const mockCallback = jest.fn().mockReturnValue(42);
    const condition = (n: number) => n === 42;

    const result = await recursive<number>(mockCallback).for(condition);

    expect(result).toBe(42);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should retry until condition is met', async () => {
    const mockCallback = jest
      .fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValue(4);

    const condition = (n: number) => n >= 4;

    const result = await recursive<number>(mockCallback).for(condition);

    expect(result).toBe(4);
    expect(mockCallback).toHaveBeenCalledTimes(4);
  });

  it('should work with string conditions', async () => {
    const mockCallback = jest.fn().mockReturnValueOnce('a').mockReturnValueOnce('b').mockReturnValue('c');

    const condition = (s: string) => s === 'c';

    const result = await recursive<string>(mockCallback).for(condition);

    expect(result).toBe('c');
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  it('should work with objects', async () => {
    const mockCallback = jest
      .fn()
      .mockReturnValueOnce({ status: 'loading' })
      .mockReturnValueOnce({ status: 'processing' })
      .mockReturnValue({ status: 'success' });

    const condition = (obj: { status: string }) => obj.status === 'success';

    const result = await recursive<{ status: string }>(mockCallback).for(condition);

    expect(result).toEqual({ status: 'success' });
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  it('should handle async callbacks when used with async/await', async () => {
    const mockAsyncCallback = jest
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValue(true);

    const condition = (value: boolean) => value;

    const result = await (async () => recursive<boolean>(mockAsyncCallback).for(condition))();

    expect(result).toBe(true);
    expect(mockAsyncCallback).toHaveBeenCalledTimes(3);
  });
});
