import { BooleanArrayState as AbstractBooleanArrayState } from '../../lib/array';

export class BooleanArrayState extends AbstractBooleanArrayState {}

let booleanArrayState = new BooleanArrayState(false, false, true, true);

describe(`BooleanArrayState`, () => {
  beforeEach(() => {
    booleanArrayState = new BooleanArrayState(false, false, true, true);
  });

  it(`false()`, () => {
    booleanArrayState.false(3);
    expect(booleanArrayState.state[3]).toBeFalse();
    expect(booleanArrayState.state[2]).toBeTrue();
    booleanArrayState.false();
    expect(booleanArrayState.state).toEqual([false, false, false, false]);
  });

  it(`true()`, () => {
    booleanArrayState.true(0);
    expect(booleanArrayState.state[0]).toBeTrue();
    expect(booleanArrayState.state[1]).toBeFalse();
    booleanArrayState.true();
    expect(booleanArrayState.state).toEqual([true, true, true, true]);
  });

  it(`toggle()`, () => {
    booleanArrayState.toggle();
    console.log(booleanArrayState.state);
    expect(booleanArrayState.state).toEqual([true, true, false, false]);
  });

  // Defaults.
  it(`append()`, () => {
    booleanArrayState.append(true);
    expect(booleanArrayState.state[4]).toBeTrue();

    booleanArrayState.append(false);
    expect(booleanArrayState.state[5]).toBeFalse();
  });

  it(`at()`, () => {
    expect(booleanArrayState.at(0)).toBeFalse();
  });

  it(`clear()`, () => {
    expect(booleanArrayState.clear().state).toEqual([]);
  });

  it(`find()`, () => {
    expect(booleanArrayState.find(value => value === false)).toEqual(false);
  });

  it(`filter()`, () => {
    expect(booleanArrayState.filter(value => value === true)).toEqual([true, true]);
  });

  it(`first()`, () => {
    expect(booleanArrayState.first()).toEqual(false);
  });

  it(`insert()`, () => {
    expect(booleanArrayState.insert(1, true).state[1]).toEqual(true);
    expect(booleanArrayState.insert(0, false).state[0]).toEqual(false);
  });

  it(`last()`, () => {
    expect(booleanArrayState.last()).toEqual(true);
  });

  it(`merge()`, () => {
    expect(booleanArrayState.merge([true, false], 1).state).toEqual([false, true, false, false, true, true]);
  });

  it(`prepend()`, () => {
    expect(booleanArrayState.prepend(false, true).state).toEqual([false, true, false, false, true, true]);
  });

  it(`pick()`, () => {
    expect(booleanArrayState.pick(1, 2)).toEqual([false, true]);
  });

  it(`remove()`, () => {
    expect(booleanArrayState.remove(1, 2).state).toEqual([false, true]);
  });

  it(`removeRange()`, () => {
    expect(booleanArrayState.merge([false, true, true, true, false, false, false, false]).removeRange(3, 10).state).toEqual([false, false, true, false]);
  });

  it(`reset()`, () => {
    expect(booleanArrayState.merge([false, true, true, true, false, false, false, false]).reset().state).toEqual([false, false, true, true]);
  });

  it(`swap()`, () => {
    expect(booleanArrayState.swap(0, 3).state).toEqual([true, false, true, false]);
  });

  it(`update()`, () => {
    expect(booleanArrayState.update(1, true).state[1]).toEqual(true);
  });
});
console.group(`BooleanArrayState`);
console.info(`booleanArrayState.state: `, booleanArrayState.state);

booleanArrayState = new BooleanArrayState(false, false, true, true);

// Sets all values to `false`.
booleanArrayState.false();
console.log(booleanArrayState.state); // Output: [false, false, false, false]

// Toggles all values to `true`.
booleanArrayState.toggle();
console.log(booleanArrayState.state); // Output: [true, true, true, true]

// Toggles all values to `false`.
booleanArrayState.toggle();
console.log(booleanArrayState.state); // Output: [false, false, false, false]

// Sets all values to `true`.
booleanArrayState.true();
console.log(booleanArrayState.state); // Output: [true, true, true, true]

console.groupEnd();
