import { input } from './io';

export class SetView {
  public getAmount(): Promise<number> {
    return input.range('Ingrese el número de sets (3 o 5): ', { min: 3, max: 5 });
  }
}
