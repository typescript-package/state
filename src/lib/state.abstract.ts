// Abstract.
import { Data, DataCore } from "@typescript-package/data";
import { StateStorage } from "./state-storage.abstract";
// Class.
import { StateHistory } from "./state-history.class";
// Type.
import { DataConstructor, DataConstructors } from "./type";
/**
 * @description Common `abstract class` for setting the state of the generic type variable `Value`.
 * @export
 * @abstract
 * @class State
 * @template Value 
 * @template {DataCore<Value>} [DataType=Data<Value>] 
 * @extends {StateStorage<Value, DataType>}
 */
export abstract class State<
  Value,
  DataType extends DataCore<Value> = Data<Value>,
  HistoryData extends DataCore<Value[]> = Data<Value[]>,
> extends StateStorage<Value, DataType> {
  /**
   * @description Returns the `string` tag representation of the `State` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return State.name;
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
   * @description Returns the current `Readonly` state of `Value`.
   * @public
   * @readonly
   * @type {Readonly<Value>}
   */
  public get value() {
    return this.state;
  }

  /**
   * @description The `StateHistory` object that is used to store the history of the state.
   * @type {?StateHistory<Value, number, HistoryData>}
   */
  #history?: StateHistory<Value, number, HistoryData>;

  /**
   * Creates an instance of `State`.
   * @constructor
   * @param {Value} state 
   * @param {?DataConstructors<Value, [DataType, HistoryData]>} [data] 
   */
  constructor(
    state: Value,
    track: number = 0,
    data?: DataConstructors<Value, [DataType, HistoryData]>
  ) {
    super(state, Array.isArray(data) ? data[0] : Data as unknown as DataConstructor<Value, DataType>);
    typeof track === 'number' && track > 0 && (this.#history = new StateHistory(
      {value: state, size: track},
      Array.isArray(data) ? data[1] : Data as unknown as DataConstructor<Value[], HistoryData>
    ));
    this.#history?.onRedo((value: Value) => this.set(value));
    this.#history?.onUndo((value: Value) => this.set(value));
  }

  /**
   * @description Clears the state by removing all stored values.
   * @public
   * @returns {this} 
   */
  public clear(): this {
    return this;
  }

  /**
   * @description Destroys the state by removing all stored values and references.
   * This method is typically used to clean up resources when the state is no longer needed.
   * @public
   * @returns {this} 
   */
  public destroy(): this {
    return this;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Value} value 
   * @returns {this} 
   */
  public override set(value: Value) {
    super.set(value);
    this.#history?.set(value);
    return this;
  }
}
