// Abstract.
import { Data, DataCore } from "@typescript-package/data";
import {
  CurrentHistory,
  HistoryCore,
  HistoryCoreConstructor,
  HistoryCurrent,
  HistoryCurrentConstructor,
  RedoHistory, 
  UndoHistory
} from "@typescript-package/history";
import { StateStorage } from "./state-storage.abstract";
// Class.
import { StateHistory } from "./state-history.class";
// Type.
import { DataConstructor, DataConstructors } from './type';
/**
 * @description Common `abstract class` for setting the state of the generic type variable `Value`.
 * @export
 * @abstract
 * @class StateBase
 * @template Value 
 * @template {number} Size 
 * @template {DataCore<Value>} [DataType=Data<Value>] 
 * @template {DataCore<readonly Value[]>} [HistoryData=Data<readonly Value[]>] 
 * @template {HistoryCurrent<Value, HistoryData>} [CurrentType=CurrentHistory<Value, HistoryData>] 
 * @template {HistoryCore<Value, Size, HistoryData>} [RedoType=RedoHistory<Value, Size, HistoryData>] 
 * @template {HistoryCore<Value, Size, HistoryData>} [UndoType=UndoHistory<Value, Size, HistoryData>] 
 * @extends {StateStorage<Value, DataType>}
 */
export abstract class StateBase<
  Value,
  Size extends number,
  DataType extends DataCore<Value> = Data<Value>,
  HistoryData extends DataCore<readonly Value[]> = Data<readonly Value[]>,
  CurrentType extends HistoryCurrent<Value, HistoryData> = CurrentHistory<Value, HistoryData>,
  RedoType extends HistoryCore<Value, Size, HistoryData> = RedoHistory<Value, Size, HistoryData>,
  UndoType extends HistoryCore<Value, Size, HistoryData> = UndoHistory<Value, Size, HistoryData>,
> extends StateStorage<Value, DataType> {
  /**
   * @description Returns the `string` tag representation of the `State` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return StateBase.name;
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
   * @type {Value}
   */
  public get value(): Value {
    return this.state;
  }

  /**
   * @description The `StateHistory` object that is used to store the history of the state.
   * @type {?StateHistory<Value, Size, HistoryData, CurrentType, RedoType, UndoType>}
   */
  #history?: StateHistory<Value, Size, HistoryData, CurrentType, RedoType, UndoType>;

  /**
   * Creates an instance of `StateBase` child class.
   * @constructor
   * @param {Value} value The initial value of `Value`.
   * @param {number} [track=0] Undo and redo history tracking size.
   * @param {?DataConstructors<Value, [DataType, HistoryData]>} [data] Custom data holder for state and its history.
   * @param {{
   *       current?: HistoryCurrentConstructor<Value, HistoryData, CurrentType>,
   *       redo?: HistoryCoreConstructor<Value, Size, HistoryData, RedoType>,
   *       undo?: HistoryCoreConstructor<Value, Size, HistoryData, UndoType>,
   *     }} [history={}] 
   */
  constructor(
    value: Value,
    track: number = 0,
    data?: DataConstructors<Value, [DataType, HistoryData]>,
    history: {
      current?: HistoryCurrentConstructor<Value, HistoryData, CurrentType>,
      redo?: HistoryCoreConstructor<Value, Size, HistoryData, RedoType>,
      undo?: HistoryCoreConstructor<Value, Size, HistoryData, UndoType>,
    } = {},
  ) {
    super(value, Array.isArray(data) ? data[0] : Data as unknown as DataConstructor<Value, DataType>);
    typeof track === 'number' && track > 0 && (this.#history = new StateHistory<Value, Size, HistoryData, CurrentType, RedoType, UndoType>(
      {value: value, size: track as Size},
      Array.isArray(data) ? data[1] : Data as unknown as DataConstructor<Value[], HistoryData>,
      history
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

