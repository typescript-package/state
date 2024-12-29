// Abstract.
import { State } from "../state.abstract";
/**
 * @description The `abstract class` handles the state of `Array`.
 * @export
 * @abstract
 * @class ArrayState
 * @template Type
 * @extends {State<ReadonlyArray<Type>>}
 */
export abstract class ArrayState<Type> extends State<ReadonlyArray<Type>> {
  /**
   * @description Returns the `array` state length.
   * @public
   * @returns {number}
   */
  public get length() {
    return super.state.length;
  }

  /**
   * @inheritdoc Return the frozen readonly state.
   * @public
   * @readonly
   * @type {Readonly<Type[]>}
   */
  public override get state(): ReadonlyArray<Type> {
    return Object.freeze(super.state);
  }

  /**
   * @description The initial state that used in resetting the state.
   * @type {Type[]}
   */
  #initialState: Type[];

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} state The initial state of `Type`.
   */
  constructor(state: Type[]) {
    super(state);
    this.#initialState = state;
  }

  /**
   * @description Appends the `value` at the end of an `array` state.
   * @public
   * @param {Type} value The `value` of `Type` to append.
   * @returns {this}
   */
  public append(value: Type): this {
    super.set([...super.state, value]);
    return this;
  }

  /**
   * @description Returns the value of `Type` from the given `index`.
   * @public
   * @param {number} index 
   * @returns {Type}
   */
  public at(index: number): Type | undefined {
    return this.state.at(index);
  }

  /**
   * @description Clears the `array` state to empty.
   * @public
   * @returns {this}
   */
  public clear(): this {
    super.set([]);
    return this;
  }

  /**
   * @description Finds the values in `array` state.
   * @public
   * @param {(value: Type) => boolean} predicate
   * @returns {(Type | undefined)}
   */
  public find(predicate: (value: Type) => boolean): Type | undefined {
    return this.state.find(predicate);
  }

  /**
   * @description Filters the `array` state.
   * @public
   * @param {(value: Type) => boolean} predicate
   * @returns {Type[]}
   */
  public filter(predicate: (value: Type) => boolean): Type[] {
    return this.state.filter(predicate);
  }

  /**
   * @description Returns the first element of `array` state.
   * @public
   * @returns {Type}
   */
  public first(): Type {
    return this.state[0];
  }

  /**
   * @description Inserts the `value` at the specified `index` into the `array` state.
   * @public
   * @param {number} index The index of `number` type to insert the `value`.
   * @param {Type} value The `value` to insert at the specified `index`.
   * @returns {this}
   */
  public insert(index: number, value: Type): this {
    super.set([...[...super.state].slice(0, index), value, ...[...super.state].slice(index)]);
    return this;
  }

  /**
   * @description Returns the last element of `array` state.
   * @public
   * @returns {Type}
   */
  public last(): Type {
    return this.state[this.length - 1];
  }

  /**
   * @description Merges `values` into the `array` state starting at position.
   * @public
   * @param {Type[]} values Array of `Type` to merge with `array` state.
   * @param {number} [startAt=this.length] The position to start merging `values` with an `array` state.
   * @returns {this}
   */
  public merge(values: Type[], startAt: number = this.length): this {
    if (startAt < 0 || startAt > this.length) {
      throw new Error("startAt index is out of bounds");
    }
    super.set([
      ...super.state.slice(0, startAt),
      ...values,
      ...super.state.slice(startAt),
    ]);
    return this;
  }

  /**
   * @description Adds the `values` at the beginning of `array` state.
   * @public
   * @param {...Type[]} values The `values` to add at the beginning.
   * @returns {this}
   */
  public prepend(...values: Type[]): this {
    super.set([...values, ...this.state]);
    return this;
  }

  /**
   * @description Picks the specified indexes.
   * @public
   * @param {...number[]} indexes Indexes to pick from the `array` state.
   * @returns {Type[]}
   */
  public pick(...indexes: number[]): Type[] {
    return [...super.state].filter((element, index) => indexes.includes(index));
  }

  /**
   * @description Removes the values from the `array` state of the specified `indexes`.
   * @public
   * @param {...number[]} indexes Indexes to remove from the `array` state.
   * @returns {this}
   */
  public remove(...indexes: number[]): this {
    super.set([...super.state].filter((value, index) => !indexes.includes(index)));
    return this;
  }

  /**
   * @description Removes the values of specified `start` and `end` indexes from `array` state.
   * @public
   * @param {number} startAt The start `index` to begin removing.
   * @param {number} endAt The end `index` to end removing.
   * @returns {this}
   */
  public removeRange(startAt: number, endAt: number): this {
    super.set([...super.state].filter((value, index) => !(Array.from({ length: endAt + 1 - startAt }, (value, i) => startAt + i)).includes(index)));
    return this;
  }

  /**
   * @description Resets the state to the initial set in the `constructor`.
   * @public
   * @returns {this}
   */
  public reset(): this {
    super.set(this.#initialState);
    return this;
  }

  /**
   * @inheritdoc
   * @public
   * @param {ReadonlyArray<Type>} state
   * @returns {this}
   */
  public override set(state: ReadonlyArray<Type>): this {
    super.set(state);
    return this;
  }

  /**
   * @description
   * @public
   * @param {number} index
   * @param {number} withIndex
   * @returns {this}
   */
  public swap(index: number, withIndex: number): this {
    const state = [...this.state];
    [state[index], state[withIndex]] = [state[withIndex], state[index]];
    super.set(state);
    return this;
  }
  
  /**
   * @description Updates the `value` at the `index` in the `array` state.
   * @public
   * @param {number} index The index of `array` state to be updated with the `value`.
   * @param {Type} value The `value` of `Type` to update at the specified `index`.
   * @returns {this}
   */
  public update(index: number, value: Type): this {
    super.set(this.state.map((v, i) => (i === index ? value : v)));
    return this;
  }

  /**
   * @description Protected method to update the state of the specified `indexes` by using callback function.
   * @protected
   * @param {number[]} indexes Indexes to update the state.
   * @param {(value: Type, index: number) => Type} callbackFn The callback function to update the state at index.
   * @returns {Type[]}
   */
  protected updateIndexes(indexes: number[], callbackFn: (value: Type, index: number) => Type): Type[] {
    indexes = (indexes.length > 0 ? indexes : Array.from({ length: super.state.length }, (_, i) => 0 + i));
    return super.state.map((value, index) => indexes.includes(index) ? callbackFn(super.state[index], index) : value);
  }
}
