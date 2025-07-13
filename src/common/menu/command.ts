export abstract class Command<T> {
  protected item!: T;

  constructor(public readonly title: string) {}

  public set(item: T): void {
    this.item = item;
  }

  public abstract execute(): void;
}
