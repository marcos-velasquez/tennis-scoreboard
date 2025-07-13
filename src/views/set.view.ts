import { recursive } from '../common';
import { Match } from '../models/match';
import { input } from './io';

export class SetView {
  public getAmount(): Promise<number> {
    return recursive(() => input.range('Ingrese el número de sets (3 o 5): ', { min: 3, max: 5 })).for((number) => {
      return Match.NUMBER_OF_SETS.includes(number);
    });
  }
}
