import { StateHistory as AbstractStateHistory } from '../lib/state-history.abstract';

export class StateHistory<Type extends string = string> extends AbstractStateHistory<Type> {
  public override set(state: Type) {
    super.set(state);
    return this;
  }
}

describe('HistoryState', () => {
  let historyState = new StateHistory<string>('initialState');

  beforeEach(() => {
    historyState = new StateHistory<string>('initialState');
  });

  afterEach(() => {
    historyState.destroy();
  });

  describe('constructor', () => {
    it('should initialize with the correct initial state', () => {
      expect(historyState.state).toBe('initialState');
    });
  });

  describe('set/undo/redo', () => {
    it('should set the new state and push the old state to undo stack', () => {
      expect(historyState.set('newState').state).toBe('newState');
      expect(historyState.undo().state).toBe(`initialState`);
      expect(historyState.redo().state).toBe(`newState`);
    });
  });
});
