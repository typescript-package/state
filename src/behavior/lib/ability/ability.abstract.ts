// Abstract.
import { BooleanState } from "../../../lib/boolean";
/**
 * @description Ability as a `boolean` state (enabled/disabled).
 * @export
 * @abstract
 * @class Ability
 */
export abstract class Ability extends BooleanState {
  /**
   * @description Returns the `string` tag representation of the `Ability` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return Ability.name;
  }

  /**
   * Creates an instance of `Ability` child class.
   * @constructor
   * @param {?boolean} [enabled]
   */
  constructor(enabled?: boolean) {
    super(enabled);
  }

  /**
   * @description Disables the ability.
   * @returns {this}
   */
  public disable(): this {
    super.false();
    return this;
  }

  /**
   * @description Enables the ability.
   * @returns {this}
   */
  public enable(): this {
    super.true();
    return this;
  }

  /**
   * @description Gets the current disabled status of the ability.
   * @returns {boolean}
   */
  public isDisabled(): boolean {
    return super.isFalse();
  }

  /**
   * @description Gets the current status of the ability.
   * @returns {boolean}
   */
  public isEnabled(): boolean {
    return super.isTrue();
  }
}
