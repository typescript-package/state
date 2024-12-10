// Class.
import { Ability } from '../ability/ability.class';
import { Restricted } from '../restricted.class';
import { Accessible } from './accessible.class';
import { Inaccessible } from './inaccessible.class';
/**
 * @description Manages the accessible/inaccessible state.
 * @export
 * @class Accessibility
 * @typedef {Accessibility}
 * @extends {Ability}
 */
export class Accessibility extends Ability {
  /**
   * @description Default state for the `Accessible` instance.
   * @public
   * @static
   * @type {boolean}
   */
  public static accessible = true;

  /**
   * @description Default state for the `Inaccessible` instance.
   * @public
   * @static
   * @type {boolean}
   */
  public static inaccessible = true;

  /**
   * @description
   * @type {*}
   */
  #accessible = new Accessible();

  /**
   * @description
   * @type {*}
   */
  #restricted = new Restricted();

  /**
   * @description
   * @type {*}
   */
  #inaccessible = new Inaccessible();
  
  /**
   * @description Sets the accessibility state to accessible if the ability is enabled.
   * @public
   * @returns {this}
   */
  public accessible(): this {
    super.isEnabled() && (this.#inaccessible.false(), this.#accessible.true());
    return this;
  }

  /**
   * @description Sets the accessibility state to inaccessible if the ability is enabled.
   * @public
   * @returns {this}
   */
  public inaccessible(): this {
    super.isEnabled() && (this.#inaccessible.true(), this.#accessible.false());
    return this;
  }

  /**
   * @description Checks whether the accessibility state is accessible.
   * @public
   * @returns {boolean}
   */
  public isAccessible(): boolean {
    return this.#accessible.is();
  }

  /**
   * @description Checks whether the accessibility state is inaccessible.
   * @public
   * @returns {boolean}
   */
  public isInaccessible(): boolean {
    return this.#inaccessible.is();
  }
}
