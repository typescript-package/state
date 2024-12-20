import { ArrayState } from '../lib/array-state.abstract';

export class NumberArrayState extends ArrayState<number> {}

let numberArrayState = new NumberArrayState([27, 37, 47]);

describe(`ArrayState<number>`, () => {
  beforeEach(() => {
    numberArrayState = new NumberArrayState([27, 37, 47]);
  });
  it(`add()`, () => {
    numberArrayState.append(34);
    expect(numberArrayState.state[3]).toEqual(34);
  });

  it(`clear()`, () => {
    expect(numberArrayState.clear().state).toEqual([]);
  });

  it(`get()`, () => {
    expect(numberArrayState.get(0)).toEqual(27);
  });

  it(`insert()`, () => {
    expect(numberArrayState.insert(1, 34).state[1]).toEqual(34);
  });

  it(`remove()`, () => {
    expect(numberArrayState.remove(1).get(1)).toEqual(47);
  });

  it(`remove()`, () => {
    expect(numberArrayState.remove(1, 2).get(0)).toEqual(27);
  });

  it(`reset()`, () => {
    expect(numberArrayState.reset().state).toEqual([27, 37, 47]);
  });

  it(`update()`, () => {
    expect(numberArrayState.update(1, 344).state[1]).toEqual(344);
  });
});
console.log(`numberArrayState`, numberArrayState.state);
