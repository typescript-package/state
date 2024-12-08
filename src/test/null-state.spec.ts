import { NullState } from "../lib/null-state.abstract";

export class Nullified extends NullState {}

const n = new Nullified();

n.set();

console.log(`NullState`);
console.log(n.state);

n.unset();
console.log(n.state);
