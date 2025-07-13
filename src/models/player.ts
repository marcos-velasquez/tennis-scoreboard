export class Player {
  constructor(public readonly name: string) {}

  public static many(...names: string[]): Player[] {
    return names.map((name) => new Player(name));
  }
}
