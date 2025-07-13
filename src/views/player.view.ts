import { input } from './io';

export class PlayerView {
  public getName(props: { identifier: number }): Promise<string> {
    return input.string(`Ingrese el nombre del jugador ${props.identifier}: `);
  }
}
