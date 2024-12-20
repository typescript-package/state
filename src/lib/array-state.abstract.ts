// Abstract.
import { State } from "./state.abstract";
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
   * @description Returns the first element of `array` state.
   * @public
   * @returns {Type}
   */
  public first(): Type {
    return this.state[0];
  }

  /**
   * @description Adds the `value` at the end of an `array` state.
   * @public
   * @param {Type} value The `value` of `Type` to append.
   * @returns {this}
   */
  public append(value: Type): this {
    super.set([...super.state, value]);
    return this;
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
   * @description Returns the value of `Type` from the given `index`.
   * @public
   * @param {number} index
   * @returns {Type}
   */
  public get(index: number): Type {
    return this.state[index];
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
    return this.state[this.length];
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
   * @param {number} start The start `index` to begin removing.
   * @param {number} end The end `index` to end removing.
   * @returns {this}
   */
  public removeRange(start: number, end: number): this {
    super.set([...super.state].filter((value, index) => !(Array.from({ length: end -1 - start }, (value, i) => start + i)).includes(index)));
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
}
