// Abstract.
import { StateHistory } from "./state-history.abstract";
/**
 * @description Handles and manages the `number` type state.
 * @export
 * @abstract
 * @class NumberState
 * @template {number} [Type=number] 
 * @extends {StateHistory<Type>}
 */
export abstract class NumberState<Type extends number = number> extends StateHistory<Type> {
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
   * @description Returns the current `Type` state.
   * @public
   * @readonly
   * @type {Type}
   */
  public override get state(): Type {
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
   * Creates an instance of `NumberState`.
   * @constructor
   * @param {Type} [state=0 as Type] Sets the initial, and reset state value(if not set).
   * @param {number} [increment=1] Sets incremental size.
   * @param {?number} [resetValue] Sets the reset state value. Defaults, retrieved from the `state`.
   */
  constructor(
    state: Type = 0 as Type,
    increment = 1,
    resetValue?: number,
  ) {
    super(state);
    this.#incrementValue = typeof increment === 'number' ? increment : 1;
    this.#resetValue = typeof resetValue === 'number' ? resetValue as Type : super.state;
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
    const state = super.state as unknown as number;
    this.set((state - amount) as Type);
    return this;
  }

  /**
   * @description Increments the state of `number` type of given `amount`.
   * @public
   * @param {number} [amount=this.#incrementValue] The amount the state is incremented. Defaults, `incrementValue`.
   * @returns {this}
   */
  public increment(amount: number = this.#incrementValue): this {
    const state = super.state as unknown as number;
    this.set((state + amount) as Type);
    return this;
  }

  /**
   * @description Checks whether current state is equal to the `state`.
   * @public
   * @param {Type} state
   * @returns {boolean}
   */
  public is(state: Type) {
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
    const state = super.state as unknown as number;
    return typeof min === 'number' && state >= min && typeof max === 'number' && state <= max; 
  }

  /**
   * @description Sets the state of `Type` type to the given `state`. 
   * @public
   * @param {Type} state The `Type` type state to set.
   * @returns {this}
   */
  public override set(state: Type): this {
    typeof state === 'number' && super.set(state);
    return this;
  }
  
  /**
   * @description Sets the state between minimum and maximum.
   * @public
   * @param {Type} state The state of `Type` type to set between `min` and `max`.
   * @param {number} min The minimum value of the `state`.
   * @param {number} max The maximum value of the `state`.
   * @returns {this}
   */
  public setBetween(state: Type, min: number, max: number) {
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