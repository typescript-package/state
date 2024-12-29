import { BooleanObjectState } from "../lib/object/boolean-object-state.abstract";

export class Options<Names extends string> extends BooleanObjectState<Names> {
  constructor(names: Names[]) {
    super(names);
  }
}

const options = new Options(['option1', 'option2', 'option3', 'option4']);

options.update({ 'option1': false });
console.log(`options.state.option1: `, options.state.option1);

console.log(`options.state: `, options.state);
options.toggle();
console.log(`options.state: `, options.state);

// const booleanStates = new Options(['option1', 'option2', 'option3', 'option4']);


