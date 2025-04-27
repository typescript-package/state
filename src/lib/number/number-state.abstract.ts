// Abstract.
import { Data, DataCore } from '@typescript-package/data';
import { State } from '../state.abstract';
// Type.
import { DataConstructors } from '../type';
/**
 * @description Handles and manages the state of generic type variable `Value` constrained by the `string` with customizable state and its history data holder.
 * @export
 * @abstract
 * @class NumberState
 * @template {number} [Value=number] 
 * @template {DataCore<Value>} [DataType=Data<Value>] 
 * @template {DataCore<Value[]>} [HistoryData=Data<Value[]>] 
 * @extends {State<Value, DataType, HistoryData>}
 */
export abstract class NumberState<
  Value extends number = number,
  DataType extends DataCore<Value> = Data<Value>,
  HistoryData extends DataCore<Value[]> = Data<Value[]>
> extends State<Value, DataType, HistoryData> {
  /**
   * @description The default incremental value used for each increment operation in an instance.
   * @public
   * @static
   * @type {number}
   */
  public static incrementValue = 1;

  /**
   * @description The default undo history size for state changes.
   * @public
   * @static
   * @type {number}
   */
  public static track = 0;

  //#region get
  /**
   * @description Returns the increment value set initially.
   * @public
   * @readonly
   * @type {number}
   */
  public get incrementValue() {
    return this.#incrementValue;
  }

  /**
   * @description Returns the current state of `Value`.
   * @public
   * @readonly
   * @type {Value}
   */
  public override get state(): Value {
    return super.state;
  }

  /**
   * @description Returns the current reset value of `number` type.
   * @protected
   * @readonly
   * @type {number}
   */
  protected get resetValue(): number {
    return this.#resetValue;
  }
  //#endregion

  //#region #
  /**
   * @description Incremental value of the state.
   * @type {number}
   */
  #incrementValue;

  /**
   * @description Privately stored reset state value of `number` type.
   * @type {number}
   */
  #resetValue;
  //#endregion

  /**
   * Creates an instance of `NumberState` child class.
   * @constructor
   * @param {Value} [value=0 as Value] Sets the initial, and reset state value(if not set).
   * @param {{
   *       incrementValue?: number,
   *       resetValue?: number,
   *       track?: number
   *     }} [param0={}] 
   * @param {number} param0.incrementValue Sets the incremental value.
   * @param {number} param0.resetValue Sets the reset state value. Defaults, retrieved from the `value`.
   * @param {number} param0.track Undo history tracking size.
   * @param {?DataConstructors<Value, [DataType, HistoryData]>} [data] Custom data holder for state and its history.
   */
  constructor(
    value: Value = 0 as Value,
    {incrementValue, resetValue, track}: {
      incrementValue?: number,
      resetValue?: number,
      track?: number
    } = {},
    data?: DataConstructors<Value, [DataType, HistoryData]>
  ) {
    super(value, track ?? NumberState.track, data);
    this.#incrementValue = typeof incrementValue === 'number' ? incrementValue : NumberState.incrementValue;
    this.#resetValue = typeof resetValue === 'number' ? resetValue as Value : super.state;
  }
  
  //#region public method
  /**
   * @description Decrements the state of `number` type of given `amount`.
   * @public
   * @param {number} [amount=this.#incrementValue] The amount the state is decremented. Defaults, `incrementValue`.
   * @returns {this}
   */
  public decrement(amount: number = this.incrementValue): this {
    if (this.isLocked()) {
      throw new Error('Cannot modify in the locked state.');
    }
    this.set((super.state as unknown as number - amount) as Value);
    return this;
  }

  /**
   * @description Increments the state of `number` type of given `amount`.
   * @public
   * @param {number} [amount=this.#incrementValue] The amount the state is incremented. Defaults, `incrementValue`.
   * @returns {this}
   */
  public increment(amount: number = this.#incrementValue): this {
    this.set((super.state as unknown as number + amount) as Value);
    return this;
  }

  /**
   * @description Checks whether current state is equal to the `value`.
   * @public
   * @param {Value} value
   * @returns {boolean}
   */
  public is(value: Value) {
    return typeof value === 'number' && super.state === value;
  }

  /**
   * @description Checks whether state is between `min` and `max`.
   * @public
   * @param {number} min Minimum value to check whether state is.
   * @param {number} max Maximum value to check whether state is.
   * @returns {boolean}
   */
  public isBetween(min: number, max: number) {
    const state = super.value as unknown as number;
    return typeof min === 'number' && state >= min && typeof max === 'number' && state <= max; 
  }

  /**
   * @description Sets the state with the provided `value` of `Value` type. 
   * @public
   * @param {Value} value The `Value` type state to set.
   * @returns {this}
   */
  public override set(value: Value): this {
    typeof value === 'number' && super.set(value);
    return this;
  }
  
  /**
   * @description Sets the state between minimum and maximum.
   * @public
   * @param {Value} value The state value of `Value` type to set between `min` and `max`.
   * @param {number} min The minimum value of the `value`.
   * @param {number} max The maximum value of the `value`.
   * @returns {this}
   */
  public setBetween(value: Value, min: number, max: number) {
    typeof value === 'number'
      && typeof min === 'number' && value >= min
      && typeof max === 'number' && value <= max
      && super.set(value);
    return this;
  }
  //#endregion 

  //#region protected method
  /**
   * @description Resets the state of `number` type to the `resetValue`. Defaults, `state` or `resetValue`.
   * @protected
   * @returns {this}
   */
  protected reset(): this {
    super.set(this.#resetValue);
    return this;
  }
  //#endregion
}