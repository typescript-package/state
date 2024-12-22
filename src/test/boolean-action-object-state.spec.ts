import { BooleanActionObjectState } from "../lib/object";

export class Connection<Names extends PropertyKey> extends BooleanActionObjectState<Names> {}

const connection1 = new Connection(
  ['connected'], [
    [['connect', 'disconnect'], ['connected']]
  ]);


console.group(`BooleanActionObjectState`);

connection1.dispatch('connect');

console.log(`connection1`, connection1);


const connection2 = new Connection(
  ['connected', 'disconnected'], [
    [['connect', 'disconnect'], ['connected', 'disconnected']]
  ]);

connection2.dispatch('connect');

console.log(`connection2 connected`, connection2.get('connected'));

connection2.dispatch('disconnect');

console.log(`connection disconnected`, connection2.get('connected'));


console.groupEnd();




// const selectable = new BooleanActionObjectState(
//   ['selected', 'deselected', 'unselected'], [
//     [['select', 'deselect'], ['selected', 'deselected', 'unselected']]
//   ]);

// selectable.dispatch('deselect');

// console.log(`selectable`, selectable);

