export class TennisScoreboard {
  public start(): void {
    const numberOfSets = new SetView().getAmount();
    const firstPlayerName = new PlayerView().getName();
    const secondPlayerName = new PlayerView().getName();
    const players = [new Player(firstPlayerName), new Player(secondPlayerName)];
    const match = new Match(players, numberOfSets);
  }
}
