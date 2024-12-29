import { BooleanActionObjectState } from "../lib/object";

export class Connection<Names extends PropertyKey, Actions extends string> extends BooleanActionObjectState<Names, Actions> {
  /**
   * Checks whether connection is connected.
   * @returns {boolean}
   */
  public isConnected() {
    return this.is("connected" as any, true);
  }
}

let connection1 = new Connection(['connected'], ['connect', 'disconnect']);

describe(`BooleanActionObjectState<Names, Actions>`, () => {
  beforeEach(() => {
    connection1 = new Connection(['connected'], ['connect', 'disconnect']);
  });

  it(`dispatch('connect')`, () => {
    connection1.dispatch('connect');
    expect(connection1.state.connected).toBeTrue();
    expect(connection1.isConnected()).toBeTrue();
  });

  it(`dispatch('disconnect')`, () => {
    connection1.dispatch('connect').dispatch('disconnect');
    expect(connection1.state.connected).toBeFalse();
    expect(connection1.isConnected()).toBeFalse();
  });
});

console.group(`BooleanActionObjectState`);

connection1.dispatch('connect');

console.log(`connection1`, connection1);


const connection2 = new Connection(
  ['connected', 'disconnected'], ['connect', 'disconnect']);

connection2.dispatch('connect');

console.log(`connection2 connected`, connection2.get('connected'));

connection2.dispatch('disconnect');

console.log(`connection disconnected`, connection2.get('connected'));


console.groupEnd();
