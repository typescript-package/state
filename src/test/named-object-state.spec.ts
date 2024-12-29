import { NamedObjectState as ANamedObjectState } from "../lib/object";

export class NamedObjectState<
  Type = any,
  Names extends PropertyKey = PropertyKey,
> extends ANamedObjectState<Type, Names> {}

const namedObjectState = new NamedObjectState(['a', 'b', 'c']);

console.group(`NamedObjectState`);
console.log(`namedObjectState.pick('a')`, namedObjectState.pick('a'));
console.groupEnd();
