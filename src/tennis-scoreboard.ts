import { StartView, MenuView, MatchView, WinnerView, CleanView } from './views';

export class TennisScoreboard {
  public async start(): Promise<void> {
    const match = await new StartView().getMatch();

    do {
      new CleanView().write();
      new MatchView(match).write();
      await new MenuView(match).execute();
    } while (!match.isFinished());

    new WinnerView(match).write();
  }
}
