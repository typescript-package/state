import { NamedBooleanArrayState } from '../lib/array';


export class Options<Names extends string> extends NamedBooleanArrayState<Names> {
  public get name() {
    return this.toObject();
  }
}

let options = new Options(['option1', 'option2', 'option3'], [false]);


describe(`ArrayState<number>`, () => {
  beforeEach(() => {
    options = new Options(['option1', 'option2', 'option3'], [false]);
  });

  it(`false()`, () => {
    expect(options.false('option2', 'option3').state).toEqual([false, false, false]);
  });

  it(`toggle()`, () => {
    expect(options.toggle('option2', 'option3').state).toEqual([false, false, false]);
    expect(options.toggle('option1', 'option2', 'option3').state).toEqual([true, true, true]);
  });

  it(`true()`, () => {
    expect(options.true('option1').state).toEqual([true, true, true]);
  });
});

console.group(`NamedBooleanArrayState`);
console.log(`NamedBooleanArrayState`, options);
console.groupEnd();
