// Abstract.
import { HistoryCore } from "./history-core.abstract";
/**
 * @description Class extends the `HistoryCore` class to maintain a history of values in a append manner.
 * This means that new entries are added to the end of the history, and as the history exceeds its size limit, entries from the beginning are removed.
 * @export
 * @abstract
 * @class HistoryAppend
 * @template Type 
 * @template {number} [Size=number] 
 */
export abstract class HistoryAppend<Type, Size extends number = number> extends HistoryCore<Type, Size> {
  /**
   * @description The default value of maximum history size.
   * @public
   * @static
   * @type {number}
   */
  public static size = 10;

  /**
   * @description Returns the `string` tag representation of the `HistoryAppend` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return HistoryAppend.name;
  }

  /**
   * Creates an instance of `HistoryAppend` child class.
   * @constructor
   * @param {Size} [size=HistoryAppend.size as Size] 
   */
  constructor(size: Size = HistoryAppend.size as Size) {
    super(size);
  }

  /**
   * @description Adds the value to the history.
   * @public
   * @param {Type} value The value to store.
   * @returns {this} The current instance.
   */
  public add(value: Type): this {
    const history = super.history;
    history.length >= super.size && history.shift();
    history.push(value);
    return this;
  }

  /**
   * @description Takes the last value.
   * @public
   * @returns {(Type | undefined)} 
   */
  public take(): Type | undefined {
    return super.history.pop();
  }
}
