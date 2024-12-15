// Abstract.
import { State } from "./state.abstract";
/**
 * @description Handles and manages the `number` type state.
 * @export
 * @abstract
 * @class NumberState
 * @extends {State<number>}
 */
export abstract class NumberState extends State<number> {
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
   * @description Returns the current `number` state.
   * @public
   * @readonly
   * @type {number}
   */
  public override get state(): number {
    return super.state;
  }

  /**
   * @description Returns the current reset state of `number` type.
   * @protected
   * @readonly
   * @type {number}
   */
  protected get resetValue(): number {
    return this.#resetValue;
  }

  /**
   * @description Incremental size of the state.
   * @type {number}
   */
  #incrementValue;

  /**
   * @description Privately stored reset state value of `number` type.
   * @type {number}
   */
  #resetValue;

    /**
   * Creates an instance of child class.
   * @constructor
   * @param {?number} [state] Sets the initial, and reset state value(if not set).
   * @param {number} [increment=this.#incrementValue] Sets incremental size.
   * @param {?number} [resetValue] Sets the reset state value. Defaults, retrieved from the `state`.
   */
  constructor(
    state: number = 0,
    increment = 1,
    resetValue?: number,
  ) {
    super(state);
    this.#incrementValue = typeof increment === 'number' ? increment : 1;
    this.#resetValue = typeof resetValue === 'number' ? resetValue : super.state;
  }
  
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
    this.set(this.state - amount);
    return this;
  }

  /**
   * @description Increments the state of `number` type of given `amount`.
   * @public
   * @param {number} [amount=this.#incrementValue] The amount the state is incremented. Defaults, `incrementValue`.
   * @returns {this}
   */
  public increment(amount: number = this.#incrementValue): this {
    this.set(this.state + amount);
    return this;
  }

  /**
   * @description Checks whether current state is equal to the `state`.
   * @public
   * @param {number} state
   * @returns {boolean}
   */
  public is(state: number) {
    return typeof state === 'number' && super.state === state;
  }

  /**
   * @description Checks whether state is between `min` and `max`.
   * @public
   * @param {number} min Minimum value to check whether state is.
   * @param {number} max Maximum value to check whether state is.
   * @returns {boolean}
   */
  public isBetween(min: number, max: number) {
    return typeof min === 'number' && super.state >= min && typeof max === 'number' && super.state <= max; 
  }

  /**
   * @description Sets the state of `number` type to the given `state`. 
   * @public
   * @param {number} state The `number` type state to set.
   * @returns {this}
   */
  public override set(state: number): this {
    typeof state === 'number' && super.set(state);
    return this;
  }
  
  /**
   * @description Sets the state between minimum and maximum.
   * @public
   * @param {number} state The state of `number` type to set between `min` and `max`.
   * @param {number} min The minimum value of the `state`.
   * @param {number} max The maximum value of the `state`.
   * @returns {this}
   */
  public setBetween(state: number, min: number, max: number) {
    typeof state === 'number'
      && typeof min === 'number' && state >= min
      && typeof max === 'number' && state <= max
      && super.set(state);
    return this;
  }

  /**
   * @description Resets the state of `number` type to the `resetValue`. Defaults, `state` or `resetValue`.
   * @protected
   * @returns {this}
   */
  protected reset(): this {
    super.set(this.#resetValue);
    return this;
  }
}