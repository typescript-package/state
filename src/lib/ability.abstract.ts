// Class.
import { Boolean as Disabled, Boolean as Enabled } from "./boolean";
/**
 * @description Ability as a `boolean` state (enabled/disabled)
 * @export
 * @abstract
 * @class Ability
 */
export abstract class Ability {
  /**
   * @description Default state for the `Disabled` instance.
   * @public
   * @static
   * @type {boolean}
   */
  public static disabled = false;

  /**
   * @description Default state for the `Enabled` instance.
   * @public
   * @static
   * @type {boolean}
   */
  public static enabled = true;

  /**
   * @description Privately stored disabled state.
   * @type {Disabled}
   */
  #disabled = new Disabled(Ability.disabled);

  /**
   * @description Privately stored enabled state.
   * @type {Enabled}
   */
  #enabled = new Enabled(Ability.enabled);

  /**
   * Creates an instance of `Ability`.
   * @constructor
   * @param {?boolean} [enabled]
   */
  constructor(enabled?: boolean) {
    if (typeof enabled == 'boolean') {
      enabled === true ? this.enable() : this.disable();
    }
  }

  /**
   * @description Disables the ability.
   * @returns {this}
   */
  public disable(): this {
    this.#enabled.false();
    this.#disabled.true();
    return this;
  }

  /**
   * @description Enables the ability.
   * @returns {this}
   */
  public enable(): this {
    this.#enabled.true();
    this.#disabled.false();
    return this;
  }

  /**
   * @description Gets the current disabled status of the ability.
   * @returns {boolean}
   */
  public isDisabled(): boolean {
    return this.#disabled.is();
  }

  /**
   * @description Gets the current status of the ability.
   * @returns {boolean}
   */
  public isEnabled(): boolean {
    return this.#enabled.is();
  }
}
