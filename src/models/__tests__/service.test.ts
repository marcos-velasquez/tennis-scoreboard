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

  describe('faults', () => {
    it('should not have a fault initially', () => {
      expect(service.hasFaulted()).toBe(false);
    });

    it('should have a fault after one is registered', () => {
      service.registerFault();
      expect(service.hasFaulted()).toBe(true);
    });

    it('should report second fault correctly after two faults', () => {
      service.registerFault();
      expect(service.isSecondFault()).toBe(false);
      service.registerFault();
      expect(service.isSecondFault()).toBe(true);
    });

    it('should not have a fault after being reset', () => {
      service.registerFault();
      service.resetFault();
      expect(service.hasFaulted()).toBe(false);
    });
  });
});
