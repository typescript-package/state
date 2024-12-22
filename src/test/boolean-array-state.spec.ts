import { BooleanArrayState } from "../lib/array";

export class Options extends BooleanArrayState {}

let options = new Options(true, true, true, false);

describe(`BooleanArrayState`, () => {
  beforeEach(() => {
    options = new Options(true, true, true, false);  
  });
  it(`false()`, () => {
    expect(options.false(0, 1).state).toEqual([false, false, true, false]);
  });
  it(`true()`, () => {
    expect(options.true(options.length - 1).state).toEqual([true, true, true, true]);
  });
  it(`true()`, () => {
    expect(options.true(0, 1));
  });
});
console.log(`BooleanArrayState: `, options);
