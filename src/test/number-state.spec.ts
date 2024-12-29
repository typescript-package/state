import { NumberState } from "../lib";

export class NumberedState extends NumberState {
  public override reset() {
    super.reset();
    return this;
  }
}

const numberedState = new NumberedState();

console.group(`NumberState`);
console.log(numberedState.state);
numberedState.decrement();
console.log(numberedState.state);
numberedState.increment();
console.log(numberedState.state);
numberedState.increment(5);
console.log(numberedState.state);
numberedState.reset();
console.log(numberedState.state);
console.groupEnd();
