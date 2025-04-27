// Abstract.
import { Data, DataCore } from "@typescript-package/data";
import { StateStorage } from "./state-storage.abstract";
// Class.
import { StateHistory } from "./state-history.class";
// Type.
import { DataConstructor, DataConstructors } from './type';
/**
 * @description Common `abstract class` for setting the state of the generic type variable `Value`.
 * @export
 * @abstract
 * @class State
 * @template Value 
 * @template {DataCore<Readonly<Value>>} [DataType=Data<Readonly<Value>>] 
 * @template {DataCore<Readonly<Value>[]>} [HistoryData=Data<Readonly<Value>[]>] 
 * @extends {StateStorage<Value, DataType>}
 */
export abstract class State<
  Value,
  DataType extends DataCore<Readonly<Value>> = Data<Readonly<Value>>,
  HistoryData extends DataCore<Readonly<Value>[]> = Data<Readonly<Value>[]>,
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
   * @type {StateHistory<Readonly<Value>, number>}
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
   * Creates an instance of `State` child class.
   * @constructor
   * @param {Value} value The initial value of `Value`.
   * @param {number} [track=0] Undo history tracking size.
   * @param {?DataConstructors<Value, [DataType, HistoryData]>} [data] Custom data holder for state and its history.
   */
  constructor(
    value: Value,
    track: number = 0,
    data?: DataConstructors<Value, [DataType, HistoryData]>
  ) {
    super(value, Array.isArray(data) ? data[0] : Data as unknown as DataConstructor<Value, DataType>);
    typeof track === 'number' && track > 0 && (this.#history = new StateHistory(
      {value: value, size: track},
      Array.isArray(data) ? data[1] : Data as unknown as DataConstructor<Value[], HistoryData>
    ));
    this.#history?.onRedo((value: Value) => super.set(value));
    this.#history?.onUndo((value: Value) => super.set(value));
  }

  /**
   * @description Clears the state by removing all stored values.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    super.data.clear();
    this.#history?.clear();
    return this;
  }

  /**
   * @description Destroys the state by removing all stored values and references.
   * This method is typically used to clean up resources when the state is no longer needed.
   * @public
   * @returns {this} The current instance.
   */
  public destroy(): this {
    super.data.destroy();
    this.#history?.destroy();
    return this;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Value} value The value to set.
   * @returns {this} The current instance.
   */
  public override set(value: Value) {
    super.set(value);
    this.#history?.set(value);
    return this;
  }
}
