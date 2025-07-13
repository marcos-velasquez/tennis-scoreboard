import { Service } from '../service';
import { Player } from '../player';

describe('Service', () => {
  let players: Player[];
  let service: Service;

  beforeEach(() => {
    players = Player.many('A', 'B');

    jest.spyOn(Math, 'random').mockReturnValue(0);
    service = new Service(players);
    (Math.random as jest.Mock).mockRestore?.();
  });

  it('should return current and rest player correctly', () => {
    expect(service.getCurrentPlayer()).toBe(players[0]);
    expect(service.getRestPlayer()).toBe(players[1]);
  });

  it('should switch player', () => {
    const first = service.getCurrentPlayer();
    service.switchPlayer();
    expect(service.getCurrentPlayer()).not.toBe(first);
  });

  it('should handle service faults', () => {
    expect(service.hasFaulted()).toBe(false);
    expect(service.registerFault()).toBe(false);
    expect(service.hasFaulted()).toBe(true);
    expect(service.registerFault()).toBe(true);
    expect(service.hasFaulted()).toBe(false);
  });
});
