import { NamedArrayState } from '../lib/named-array-state.abstract';

export class SomeoneState<Names extends string> extends NamedArrayState<Names, number> {}

let someoneState = new SomeoneState('Someone1', 'Someone2', 'Someone3').set([27, 34, 37, 47]);

describe(`NamedArrayState<Names, number>`, () => {
  beforeEach(() => {
    someoneState = new SomeoneState('Someone1', 'Someone2', 'Someone3').set([27, 34, 37, 47]);
  });

  it(`someoneState.state`, () => {
    expect(someoneState.state).toEqual([27, 34, 37, 47]);
  });

  it(`someoneState.stateAsTuple`, () => {
    expect(someoneState.stateAsTuple).toEqual([['Someone1', 'Someone2', 'Someone3'], [27, 34, 37, 47]]);
  });

  it(`someoneState.stateWithNames`, () => {
    expect(someoneState.stateWithNames).toEqual([['Someone1', 27], ['Someone2', 34], ['Someone3', 37]]);
  });

  it(`someoneState.state`, () => {
    expect(someoneState.state).toEqual([27, 34, 37, 47]);
  });

  it(`someoneState.get()`, () => {
    expect(someoneState.get('Someone2')).toEqual(34);
  });

  it(`someoneState.indexOf()`, () => {
    expect(someoneState.indexOf('Someone2')).toEqual(1);
  });

  it(`someoneState.select()`, () => {
    expect(someoneState.select('Someone2', 'Someone3')).toEqual([34, 37]);
  });

  it(`someoneState.toObject()`, () => {
    expect(someoneState.toObject()).toEqual({
      'Someone1': 27,
      'Someone2': 34,
      'Someone3': 37
    });
  });

});
console.log(`someoneState`, someoneState);
