import { Match } from '../models';
import { PlayerView } from './player.view';
import { SetView } from './set.view';

export class StartView {
  public async getMatch(): Promise<Match> {
    const numberOfSets = await new SetView().getAmount();
    const firstPlayerName = await new PlayerView().getName();
    const secondPlayerName = await new PlayerView().getName();
    return new Match([firstPlayerName, secondPlayerName], numberOfSets);
  }
}
