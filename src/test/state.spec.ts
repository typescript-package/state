import { Data, DataCore, WeakData } from "@typescript-package/data";
import { State } from "../lib";
import { DataConstructors } from "../type";

export class CustomState<
  Value,
  Size extends number,
  DataType extends DataCore<Value> = Data<Value>,
  HistoryData extends DataCore<readonly Value[]> = Data<readonly Value[]>,
> extends State<Value, Size, DataType, HistoryData> {
  constructor(value: Value, track: Size, data?: DataConstructors<Value, [DataType, HistoryData]>) {
    super(value, track, data);
  }
}

export class CustomWeakData<Value> extends WeakData<readonly Value[]> {
  constructor(value: readonly Value[]){
    super(value);
  }
}

console.group("State");
let state = new CustomState( "Hello World", 3, [WeakData, CustomWeakData]);

state.set("Hello World");

console.debug(`history?.get()`, state.history?.get());
console.debug(`WeakData.get()`, WeakData.get(state.data));

state.set("Hello World");
console.debug(state.state);  // Output: Hello World

state.set("Goodbye World");
console.log(state.state);  // Output: Goodbye World

state.set("New State");
console.debug(state.state);  // Output: New State

state.set("Another State");
console.debug(state.state);  // Output: Another State

state.history?.undo().undo();
console.debug(`after undo: `, state.state);  // Output: New State

console.groupEnd();

describe(`State`, () => {
  describe(`Track(0)`, () => {
    let state = new CustomState("Hello World", 0);
    beforeEach(() => {
      let state = new CustomState("Hello World", 0);

    });
    it(`empty history`, () => {
      expect(state.history).toBeUndefined();
    });
  });

  describe(`Track(3)`, () => {
    let state = new CustomState("Hello World", 3, [WeakData, WeakData]);
    const initialValue = "Hello World";
    beforeEach(() => state = new CustomState(initialValue, 3, [WeakData, WeakData]));
  
    it(`initial`, () => {
      expect(state.value).toEqual(initialValue);
    });
    it(`set()`, () => {
      expect(state.set('New State').value).toEqual('New State');
      expect(state.state).toEqual('New State');
      expect(state.history?.firstUndo()).toEqual(initialValue);
    });
  
    it(`undo() redo()`, () => {
      state
        .set("Goodbye World")
        .set("New State")
        .set("Another State");
      expect(state.history?.getUndo()).toEqual(['Hello World', 'Goodbye World', 'New State']);
      state.set("The State above max")
      expect(state.history?.getUndo()).toEqual(['Goodbye World', 'New State', 'Another State']);
      state.history?.undo();
      expect(state.history?.getUndo()).toEqual(['Goodbye World', 'New State']);
      state.history?.undo().undo();
      expect(state.history?.getUndo()).toEqual([]);
      expect(state.state).toEqual('Goodbye World');
    });
  });  
});

