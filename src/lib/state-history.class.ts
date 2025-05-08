// Data.
import { Data, DataCore } from "@typescript-package/data";
// History.
import {
  CurrentHistory,
  History,
  HistoryCore,
  HistoryCurrent,
  RedoHistory,
  UndoHistory,
} from "@typescript-package/history";
/**
 * @description The class to handle the history of the state.
 * @export
 * @class StateHistory
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<readonly Value[]>} [DataType=Data<readonly Value[]>] 
 * @template {HistoryCurrent<Value, DataType>} [CurrentType=CurrentHistory<Value, DataType>] 
 * @template {HistoryCore<Value, Size, DataType>} [RedoType=RedoHistory<Value, Size, DataType>] 
 * @template {HistoryCore<Value, Size, DataType>} [UndoType=UndoHistory<Value, Size, DataType>] 
 * @extends {History<Value, Size, DataType, CurrentType, RedoType, UndoType>}
 */
export class StateHistory<
  Value,
  Size extends number = number,
  DataType extends DataCore<readonly Value[]> = Data<readonly Value[]>,
  CurrentType extends HistoryCurrent<Value, DataType> = CurrentHistory<Value, DataType>,
  RedoType extends HistoryCore<Value, Size, DataType> = RedoHistory<Value, Size, DataType>,
  UndoType extends HistoryCore<Value, Size, DataType> = UndoHistory<Value, Size, DataType>
> extends History<
  Value,
  Size,
  DataType,
  CurrentType,
  RedoType,
  UndoType
> {
  /**
   * @description The default size of the history.
   * @public
   * @static
   * @type {number}
   */
  public static track: number = 0;

  /**
   * @description Returns the `string` tag representation of the `StateHistory` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return StateHistory.name;
  }
}
