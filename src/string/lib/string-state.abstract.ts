// Abstract,
import { Data, DataCore } from "@typescript-package/data";
import { State } from "../../lib";
/**
 * @description Handles and manages the state of generic type variable `Value` constrained by the `string` with customizable state and its history data holder.
 * @export
 * @abstract
 * @class StringState
 * @template {string} [Value=string] 
 * @template {DataCore<Readonly<Value>>} [DataType=Data<Readonly<Value>>] 
 * @template {DataCore<Readonly<Value>[]>} [HistoryData=Data<Readonly<Value>[]>] 
 * @extends {State<Value, DataType, HistoryData>}
 */
export abstract class StringState<
  Value extends string = string,
  DataType extends DataCore<Readonly<Value>> = Data<Readonly<Value>>,
  HistoryData extends DataCore<Readonly<Value>[]> = Data<Readonly<Value>[]>,
> extends State<Value, DataType, HistoryData> {
  /**
   * @description Returns the `string` tag representation of the `StringState` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return StringState.name;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Value} value The state of `Value` constrained by the `string`.
   * @returns {this} 
   */
  public override set(value: Value): this {
    typeof value === 'string' && super.set(value);
    return this;
  }
}
