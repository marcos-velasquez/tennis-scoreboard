import { recursive } from '../common';
import { Match } from '../models';
import { input } from './io';

export class SetView {
  public getAmount(): Promise<(typeof Match.NUMBER_OF_SETS)[number]> {
    return recursive(() => input.range('createMatch sets (3 o 5): ', { min: 3, max: 5 })).for((number) => {
      return Match.NUMBER_OF_SETS.includes(number as (typeof Match.NUMBER_OF_SETS)[number]);
    }) as Promise<(typeof Match.NUMBER_OF_SETS)[number]>;
  }
}
