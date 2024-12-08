import { NumberState } from "../lib";

export class NumberedState extends NumberState {
  public override reset() {
    super.reset();
    return this;
  }
}

const n = new NumberedState();

console.log(n.state);
n.decrement();
console.log(n.state);
n.increment();
console.log(n.state);
n.increment(5);
console.log(n.state);
n.reset();
console.log(n.state);

