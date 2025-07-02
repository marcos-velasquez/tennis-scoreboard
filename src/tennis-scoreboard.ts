import { SetView } from './views/set.view';

export class TennisScoreboard {
  public async start(): Promise<void> {
    const numberOfSets = await new SetView().getAmount();
    console.log(`Número de sets: ${numberOfSets}`);
    /* const firstPlayerName = new PlayerView().getName();
    const secondPlayerName = new PlayerView().getName();
    const players = [new Player(firstPlayerName), new Player(secondPlayerName)];
    const match = new Match(players, numberOfSets); */
  }
}
