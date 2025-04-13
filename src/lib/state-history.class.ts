// Data.
import { Data, DataCore } from "@typescript-package/data";
// History.
import { HistoryBase } from "@typescript-package/history";
/**
 * @description
 * @export
 * @class StateHistory
 * @template Value 
 * @template {number} [Size=number] 
 * @template {DataCore<Value[]>} [DataType=Data<Value[]>] 
 * @extends {HistoryBase<Value, Size, DataType>}
 */
export class StateHistory<
  Value,
  Size extends number = number,
  DataType extends DataCore<Value[]> = Data<Value[]>
> extends HistoryBase<Value, Size , DataType> {
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
