export class Player {
  constructor(public readonly name: string) {}

  public equals(other: Player): boolean {
    return this.name === other.name;
  }

  public static many(...names: string[]): Player[] {
    return names.map((name) => new Player(name));
  }
}
