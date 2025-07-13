import { SetView, PlayerView, MenuView, MatchView, WinnerView } from './views';
import { Match } from './models';

export class TennisScoreboard {
  public async start(): Promise<void> {
    const numberOfSets = await new SetView().getAmount();
    const firstPlayerName = await new PlayerView().getName();
    const secondPlayerName = await new PlayerView().getName();
    const match = new Match([firstPlayerName, secondPlayerName], numberOfSets);

    do {
      new MatchView(match).write();
      await new MenuView(match).execute();
    } while (!match.isFinished());

    new WinnerView(match).write();
  }
}
