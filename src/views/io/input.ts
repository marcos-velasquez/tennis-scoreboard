import assert from 'assert';
import * as readline from 'readline';

export class Input {
  constructor(private readonly io: readline.ReadLine) {}

  public async string(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.io.question(prompt, (answer) => resolve(answer));
    });
  }

  public int(prompt: string): Promise<number> {
    return this.string(prompt).then((value) => {
      const number = Number(value);
      if (isNaN(number)) {
        return this.int(prompt);
      } else {
        return number;
      }
    });
  }

  public range(prompt: string, props: { min?: number; max?: number }): Promise<number> {
    assert(props, 'Props min or max are required');

    props = Object.assign({ min: 0, max: Infinity }, props);
    return this.int(prompt).then((value) => {
      if ((props.min && value < props.min) || (props.max && value > props.max)) {
        return this.range(prompt, props);
      } else {
        return value;
      }
    });
  }
}
