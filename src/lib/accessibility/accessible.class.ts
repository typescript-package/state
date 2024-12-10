// Abstract.
import { BooleanState } from "../boolean-state.abstract";
/**
 * @description Manages the accessible state as a `boolean` type .
 * @export
 * @class Accessible
 * @typedef {Accessible}
 * @extends {BooleanState}
 */
export class Accessible extends BooleanState {
  /**
   * Creates an instance of `Accessible`.
   * @constructor
   * @param {?boolean} [state]
   */
  constructor(state?: boolean) {
    super(state);
  }

  /**
   * @description Sets the state to `false`.
   * @public
   * @returns {this}
   */
  public override false(): this {
    super.false();
    return this;
  }

  /**
   * @inheritdoc Toggles `true` and `false` the accessible state.
   * @public
   * @returns {this}
   */
  public override toggle(): this {
    super.toggle();
    return this;
  }

  /**
   * @description Sets the state to `true`.
   * @public
   * @returns {this}
   */
  public override true(): this {
    super.true();
    return this;
  }
}