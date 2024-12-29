import { ArrayState } from '../../lib/array';

export class NumberArrayState extends ArrayState<number> {}

let numberArrayState = new NumberArrayState([27, 37, 47]);

describe(`ArrayState<number>`, () => {
  beforeEach(() => {
    numberArrayState = new NumberArrayState([27, 37, 47]);
  });
  it(`append()`, () => {
    numberArrayState.append(34);
    expect(numberArrayState.state[3]).toEqual(34);
  });

  it(`at()`, () => {
    expect(numberArrayState.at(2)).toEqual(47);
  });

  it(`clear()`, () => {
    expect(numberArrayState.clear().state).toEqual([]);
  });

  it(`find()`, () => {
    expect(numberArrayState.find(value => value === 37)).toEqual(37);
  });

  it(`filter()`, () => {
    expect(numberArrayState.filter(value => value === 37)).toEqual([37]);
  });

  it(`first()`, () => {
    expect(numberArrayState.first()).toEqual(27);
  });

  it(`insert()`, () => {
    expect(numberArrayState.insert(1, 34).state[1]).toEqual(34);
  });

  it(`last()`, () => {
    expect(numberArrayState.last()).toEqual(47);
  });

  it(`merge()`, () => {
    expect(numberArrayState.merge([34, 0], 1).state).toEqual([27, 34, 0, 37, 47]);
  });

  it(`prepend()`, () => {
    expect(numberArrayState.prepend(34, 0).state).toEqual([34, 0, 27, 37, 47]);
  });

  it(`pick()`, () => {
    expect(numberArrayState.pick(1, 2)).toEqual([37, 47]);
  });

  it(`remove()`, () => {
    expect(numberArrayState.remove(1, 2).at(0)).toEqual(27);
  });

  it(`removeRange()`, () => {
    numberArrayState.merge([34, 35, 36, 37, 38, 39, 40, 41, 42]);
    expect(numberArrayState.removeRange(4, 7).state).toEqual([27, 37, 47, 34, 39, 40, 41, 42]);
  });

  it(`reset()`, () => {
    expect(numberArrayState.reset().state).toEqual([27, 37, 47]);
  });

  it(`swap()`, () => {
    expect(numberArrayState.swap(1, 2).state).toEqual([27, 47, 37]);
    console.log(numberArrayState.state);
  });

  it(`update()`, () => {
    expect(numberArrayState.update(1, 344).state[1]).toEqual(344);
  });
});
console.log(`numberArrayState`, numberArrayState.state);
