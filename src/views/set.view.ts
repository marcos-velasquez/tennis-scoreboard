import { input } from './io/io';

export class SetView {
  public getAmount(): number {
    return input('Ingrese el número de sets:');
  }
}
