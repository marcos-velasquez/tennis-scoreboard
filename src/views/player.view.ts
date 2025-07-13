import { input } from './io';

export class PlayerView {
  public getName(): Promise<string> {
    return input.string('createPlayer name: ');
  }
}
