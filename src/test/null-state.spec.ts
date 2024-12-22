import { NullState } from "../lib/null-state.abstract";

export class Nullified extends NullState {}

const nullified = new Nullified();

nullified.set();

console.group(`NullState`);
console.log(nullified.state);

nullified.unset();
console.log(nullified.state);
console.groupEnd();
