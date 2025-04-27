import { StringState } from "../../lib";

// Extend the `StringState` to create a custom class
class MyStringState<Type extends string = string> extends StringState<Type> {
  constructor(initialState: Type) {
    super(initialState);
  }

  public override set(state: Type) {
    super.set(state);
    return this;
  }
}


console.group(`StringState`);

// Instantiate your custom StringState class
const myState = new MyStringState<string>("Hello World");

// Log the current state
console.log(myState.state);  // Output: Hello World

// Change the state and store the history
myState.set("Goodbye World");
console.log(``, myState.state);  // Output: Goodbye World

// Undo the change to revert to the previous state
myState.history?.undo();
console.log(`after undo`, myState.state);  // Output: Hello World

// Redo the change to restore the state
myState.history?.redo();
console.log(``, myState.state);  // Output: Goodbye World

// Set a new state and see the history update
myState.set("New State");
console.log(``, myState.state);  // Output: New State

console.groupEnd();
