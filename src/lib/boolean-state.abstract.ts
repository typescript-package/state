// Abstract.
import { State } from "./state.abstract";
/**
 * @description Handles the `boolean` type state.
 * @export
 * @abstract
 * @class BooleanState
 * @typedef {BooleanState}
 * @extends {State<boolean>}
 */
export abstract class BooleanState extends State<boolean> {
  /**
   * @description Default state for the instance.
   * @public
   * @static
   * @type {boolean}
   */
  public static state = true;

  /**
   * @description Privately stored callback function performed on state set to `false`.
   * @type {*}
   */
  #onFalseCallback;

  /**
   * @description Privately stored callback function performed on state set to `true`.
   * @type {*}
   */
  #onTrueCallback;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {boolean} [state=BooleanState.state] Sets initially `boolean` state.
   * @param {(boolean | ((newState: boolean, currentState: boolean) => boolean))} [canChange=true]
   * @param {?() => any} [onTrueCallback] Optional callback function performed on each state change to `true`.
   * @param {?() => any} [onFalseCallback] Optional callback function performed on each state change to `false`.
   */
  constructor(
    state: boolean = BooleanState.state,
    canChange: boolean | ((newState: boolean, currentState: boolean) => boolean) = true,
    onTrueCallback?: () => any,
    onFalseCallback?: () => any,
  ) {
    super(state, canChange);
    this.#onTrueCallback = onTrueCallback;
    this.#onFalseCallback = onFalseCallback;
    state ? onTrueCallback?.() : onFalseCallback?.();
  }

  /**
   * @description Sets boolean state to `false`.
   * @public
   * @param {*} [callback=this.#onFalseCallback] Performs the callback function if provided.
   * @returns {this}
   */
  public false(callback = this.#onFalseCallback): this {
    super.set(false);
    typeof callback === 'function' && callback();
    return this;
  }

  /**
   * @description Checks the active state and perform callback.
   * @public
   * @param {?boolean} [expected] Expected state of `boolean` type.
   * @param {?(result: boolean) => void} [callback] The callback function with a expected `result`.
   * @returns {boolean}
   */
  public is(expected?: boolean, callback?: (result: boolean) => void): boolean {
    const result = typeof expected === 'boolean' ? this.state === expected : this.state;
    callback?.(result);
    return result;
  }

  /**
   * @description Checks whether the state is `false`.
   * @public
   * @returns {boolean}
   */
  public isFalse() {
    return super.state === false;
  }

  /**
   * @description Checks whether the state is `true`.
   * @public
   * @returns {boolean}
   */
  public isTrue() {
    return super.state === true
  }

  /**
   * @description Performs the `callback` function on state `false`.
   * @public
   * @param {() => void} callback The callback function to perform on state `false`.
   * @returns {this}
   */
  public onFalse(callback: () => void): this {
    this.isFalse() && callback();
    return this;
  }

  /**
   * @description Performs the `callback` function on state `true`.
   * @public
   * @param {() => void} callback The callback function to perform on state `true`.
   * @returns {this}
   */
  public onTrue(callback: () => void): this {
    this.isTrue() && callback();
    return this;
  }

  /**
   * @description Sets the callback function performed on state set to `false`.
   * @public
   * @param {() => void} onFalseCallback The callback function performed on state `false`.
   * @returns {this}
   */
  public setOnFalse(onFalseCallback: () => void): this {
    typeof onFalseCallback === 'function' && (this.#onFalseCallback = onFalseCallback);
    return this;
  }

  /**
   * @description Sets the callback function performed on state set to `true`.
   * @public
   * @param {() => void} onTrueCallback The callback function performed on state `true`.
   * @returns {this}
   */
  public setOnTrue(onTrueCallback: () => void): this {
    typeof onTrueCallback === 'function' && (this.#onTrueCallback = onTrueCallback);
    return this;
  }

  /**
   * @description Toggle boolean state.
   * @public
   * @returns {this}
   */
  public toggle(): this {
    super.set(!super.state);
    this.#onFalseCallback && this.onFalse(this.#onFalseCallback);
    this.#onTrueCallback && this.onTrue(this.#onTrueCallback);
    return this;
  }

  /**
   * @description Sets boolean state to `true`.
   * @public
   * @param {?() => void} [callback] Performs the callback function if provided.
   * @returns {this}
   */
  public true(callback = this.#onTrueCallback): this {
    super.set(true);
    typeof callback === 'function' && callback();
    return this;
  }
}