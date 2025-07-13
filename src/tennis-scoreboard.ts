import { SetView, PlayerView, MenuView, MatchView } from './views';
import { Match } from './models';

export class TennisScoreboard {
  public async start(): Promise<void> {
    const numberOfSets = await new SetView().getAmount();
    const firstPlayerName = await new PlayerView().getName({ identifier: 1 });
    const secondPlayerName = await new PlayerView().getName({ identifier: 2 });
    const match = new Match([firstPlayerName, secondPlayerName], numberOfSets);

    do {
      await new MenuView(match).execute();
      new MatchView(match).write();
    } while (!match.isFinished());
  }
}
