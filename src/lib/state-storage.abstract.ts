// data.
import { Data, DataCore, Immutability } from "@typescript-package/data";
// Abstract.
import { StateHistory } from "./state-history.class";
/**
 * @description StateStorage is a generic `abstract class` for setting the state of the generic type variable `Value`.
 * It is used to create a state container that can be locked and modified.
 * It is a base class for creating state containers for different types of data.
 * 
 * 1. **Memory Efficiency**: Uses weak references to allow for garbage collection of state when the object is no longer in use.
 * 2. **Enhanced Encapsulation**: State is stored separately from the object, ensuring it is only accessible through the provided methods.
 * 3. **Flexible State Management**: Enables dynamic and isolated state handling, allowing for better extensibility and control over state across instances. * @export
 * @export
 * @abstract
 * @class StateStorage
 * @template Value 
 * @template {DataCore<Value>} [DataType=Data<Value>] 
 * @extends {DataCore<Value>}
 */
export abstract class StateStorage<
  Value,
  DataType extends DataCore<Value> = Data<Value>
> extends DataCore<Value> {
  /**
   * @description The `Data` object that is used to store the state.
   * @private
   * @type {DataType}
   */
  public get data(): DataType {
    return this.#data;
  }

  /**
   * @description The `StateHistory` object that is used to store the history of the state.
   * @public
   * @type {StateHistory<Value, number>}
   */
  public get history() {
    return this.#history;
  }

  /**
   * @description The `StateStorage` object that is used to store the state.
   * @type {DataType}
   */
  #data: DataType;

  /**
   * @description The `StateHistory` object that is used to store the history of the state.
   * @type {?StateHistory<Value, number>}
   */
  #history?: StateHistory<Value, number>;

  /**
   * @description Returns the `string` tag representation of the `StateContainer` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return StateStorage.name;
  }

  /**
   * @description Returns the current `Readonly` state of `Value`.
   * @public
   * @readonly
   * @type {Value}
   */
  public get state(): Readonly<Value> {
    const state = this.#data.value;
    return (typeof state !== 'object' || state === null || Array.isArray(state)) ? state : Object.freeze<Value>({...state});
  }

  /**
   * Creates an instance of `StateStorage` child class.
   * @constructor
   * @param {Value} state 
   * @param {?(boolean | number)} [track] 
   * @param {new (state: Value) => DataType} [data=Data as unknown as (new (state: Value) => DataType)] 
   */
  constructor(
    state: Value,
    track?: boolean | number,
    data: new (state: Value) => DataType = Data as unknown as (new (state: Value) => DataType)
  ) {
    super();
    track === true && (this.#history = new StateHistory({value: state, size: typeof track === 'number' ? track : 10}));
    this.#data = new data(state);
    this.#history?.onRedo((value: Value) => this.#data.set(value));
    this.#history?.onUndo((value: Value) => this.#data.set(value));
  }

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public override lock() {
    Immutability.deepFreeze(this.#data.value);
    this.set = () => { throw new Error('Cannot modify the state data in container after lock.') };
    this.destroy = () => { throw new Error('Cannot delete from the state data in container after lock.') };
    this.lock();
    return this;
  }

  /**
   * @description Performs the `callback` function on `state`.
   * @public
   * @param {(state: Value) => void} stateCallback The callback function with a `state` to perform.
   * @returns {this}
   */
  public on(stateCallback: (state: Value) => void): this {
    stateCallback(this.#data.value);
    return this;
  }

  /**
   * @description Sets the state if it is not locked and is allowed.
   * @public
   * @param {Value} state The state of `Type` to set.
   * @returns {this}
   */
  public set(state: Value): this {
    if (this.isLocked()) throw new Error('Cannot set when state is locked.');
    this.#history?.set(state);
    this.#data.set(state)
    return this;
  }
}
