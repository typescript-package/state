// Abstract.
import { Data, DataCore } from "@typescript-package/data";
import { StateBase } from "./state-base.abstract";
// Class.
import { CurrentHistory, RedoHistory, UndoHistory } from "@typescript-package/history";
// Type.
import { DataConstructors } from "../type";
/**
 * @description Common `abstract class` for setting the state of the generic type variable `Value`.
 * @export
 * @abstract
 * @class State
 * @template Value 
 * @template {number} Size 
 * @template {DataCore<Value>} [DataType=Data<Value>] 
 * @template {DataCore<readonly Value[]>} [HistoryData=Data<readonly Value[]>] 
 * @extends {StateBase<Value, Size, DataType, HistoryData, CurrentHistory<Value, HistoryData>,
 *  RedoHistory<Value, Size, HistoryData>,
 *  UndoHistory<Value, Size, HistoryData>>
 * }
 */
export abstract class State<
  Value,
  Size extends number,
  DataType extends DataCore<Value> = Data<Value>,
  HistoryData extends DataCore<readonly Value[]> = Data<readonly Value[]>,
> extends StateBase<
  Value,
  Size,
  DataType,
  HistoryData,
  CurrentHistory<Value, HistoryData>,
  RedoHistory<Value, Size, HistoryData>,
  UndoHistory<Value, Size, HistoryData>
> {
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
   * Creates an instance of `State` child class.
   * @constructor
   * @param {Value} value The initial value of `Value`.
   * @param {number} [track=0] Undo history tracking size.
   * @param {?DataConstructors<Value, [DataType, HistoryData]>} [data] Custom data holder for state and its history.
   */
  constructor(
    value: Value,
    track: Size = 0 as Size,
    data?: DataConstructors<Value, [DataType, HistoryData]>,
  ) {
    super(value, track, data, { current: CurrentHistory, redo: RedoHistory, undo: UndoHistory });
  }
}
