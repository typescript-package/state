// data.
import { Data, DataCore, Immutability } from "@typescript-package/data";
// Type.
import { DataConstructor } from "./type";
/**
 * @description StateStorage is a generic `abstract class` for setting the state of the generic type variable `Value` with customizable data storage.
 * It is used to create a state container that can be locked and modified.
 * It is a base class for creating state containers for different types of data.
 * 
 * Using `WeakData`:
 * 1. **Memory Efficiency**: Uses weak references to allow for garbage collection of state when the object is no longer in use.
 * 2. **Enhanced Encapsulation**: State is stored separately from the object, ensuring it is only accessible through the provided methods.
 * 3. **Flexible State Management**: Enables dynamic and isolated state handling, allowing for better extensibility and control over state across instances. *
 * 
 * @export
 * @abstract
 * @class StateStorage
 * @template Value 
 * @template {DataCore<Readonly<Value>>} [DataType=Data<Readonly<Value>>] 
 * @extends {DataCore<Readonly<Value>>}
 */
export abstract class StateStorage<
  Value,
  DataType extends DataCore<Readonly<Value>> = Data<Readonly<Value>>
> extends DataCore<Readonly<Value>> {
  /**
   * @description The `DataCore` related object that is used to store the state.
   * @public
   * @readonly
   * @type {DataType}
   */
  public get data(): DataType {
    return this.#data;
  }

  /**
   * @description Returns the `string` tag representation of the `StateStorage` class when used in `Object.prototype.toString.call(instance)`.
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
   * @type {Readonly<Value>}
   */
  public get state(): Readonly<Value> {
    const state = this.#data.value;
    return (typeof state !== 'object' || state === null || Array.isArray(state)) ? state : Object.freeze<Value>({...state});
  }

  /**
   * @description The object that is used to store the state.
   * @type {DataType}
   */
  #data: DataType;

  /**
   * Creates an instance of `StateStorage` child class.
   * @constructor
   * @param {Value} value The initial state value of `Value`.
   * @param {DataConstructor<Value, DataType>} [data=Data as unknown as DataConstructor<Value, DataType>] Custom data holder for state.
   */
  constructor(
    value: Value,
    data: DataConstructor<Value, DataType> = Data as unknown as DataConstructor<Value, DataType>,
  ) {
    super();
    this.#data = new data(value);
  }

  /**
   * @inheritdoc
   * @public
   * @returns {this} The current instance of `StateStorage` child class.
   */
  public override lock() {
    Immutability.deepFreeze(this.#data.value);
    this.set = () => { throw new Error('Cannot modify the state data in storage after lock.') };
    this.destroy = () => { throw new Error('Cannot delete from the state data in storage after lock.') };
    this.lock();
    return this;
  }

  /**
   * @description Performs the `callback` function on `state`.
   * @public
   * @param {(state: Readonly<Value>) => void} callbackFn The callback function with a `state` to perform.
   * @returns {this} The current instance of `StateStorage` child class.
   */
  public on(callbackFn: (state: Readonly<Value>) => void): this {
    callbackFn(this.#data.value);
    return this;
  }

  /**
   * @description Sets the state if it is not locked and is allowed.
   * @public
   * @param {Value} value The value of `Value` to set a new state.
   * @returns {this} The current instance of `StateStorage` child class.
   * @throws {Error} Throws an error if the state is locked.
   */
  public set(value: Value): this {
    if (this.isLocked()) throw new Error('Cannot set when state is locked.');
    this.#data.set(value);
    return this;
  }
}
