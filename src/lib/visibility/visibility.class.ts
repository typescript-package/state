// Class.
import { Ability } from '../ability/ability.class';
import { Invisible } from './invisible.class';
import { Visible } from './visible.class';
/**
 * @description Manages the visibility state.
 * @export
 * @class Visibility
 * @typedef {Visibility}
 * @extends {Ability}
 */
export class Visibility extends Ability {
  /**
   * @description
   * @type {*}
   */
  #visible = new Visible();

  /**
   * @description
   * @type {*}
   */
  #invisible = new Invisible();
  
  /**
   * @description Sets the visibility to visible if the ability is enabled.
   * @public
   * @returns {this}
   */
  public visible(): this {
    super.isEnabled() && (this.#invisible.false(), this.#visible.true());
    return this;
  }

  /**
   * @description Sets the visibility to invisible if the ability is enabled.
   * @public
   * @returns {this}
   */
  public invisible(): this {
    super.isEnabled() && (this.#invisible.true(), this.#visible.false());
    return this;
  }

  /**
   * @description Checks whether the visibility is visible.
   * @public
   * @returns {boolean}
   */
  public isVisible(): boolean {
    return this.#visible.is();
  }

  /**
   * @description Checks whether the visibility is invisible.
   * @public
   * @returns {boolean}
   */
  public isInvisible(): boolean {
    return this.#invisible.is();
  }
}
