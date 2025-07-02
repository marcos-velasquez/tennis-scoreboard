import { Output } from '../output';

describe('Output', () => {
  let mockWrite: jest.Mock;
  let output: Output;

  beforeEach(() => {
    mockWrite = jest.fn();
    const mockReadline = { write: mockWrite } as unknown as any;
    output = new Output(mockReadline);
  });

  it('should write the message without a newline', () => {
    const message = 'Test message';

    output.inline(message);

    expect(mockWrite).toHaveBeenCalledWith(message);
  });

  it('should write the message with a newline', () => {
    const message = 'Test message';

    output.block(message);

    expect(mockWrite).toHaveBeenCalledWith(`${message}\r\n`);
  });
});
