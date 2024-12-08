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
   * Creates an instance of parent class.
   * @constructor
   * @param {?boolean} [state] Sets initially boolean state.
   */
  constructor(state: boolean = true) {
    super(state);
  }

  /**
   * @description Sets boolean state to `false`.
   * @protected
   * @returns {this}
   */
  protected false(): this {
    super.set(false);
    return this;
  }

  /**
   * @description Checks whether state is `false`.
   * @protected
   * @returns {boolean}
   */
  protected isFalse() {
    return super.state === false;
  }

  /**
   * @description Checks whether state is `true`.
   * @protected
   * @returns {boolean}
   */
  protected isTrue() {
    return super.state === true;
  }

  /**
   * @description Toggle boolean state.
   * @protected
   * @returns {this}
   */
  protected toggle(): this {
    super.set(!super.state)
    return this;
  }

  /**
   * @description Sets boolean state to `true`.
   * @protected
   * @returns {this}
   */
  protected true(): this {
    super.set(true);
    return this;
  }
}