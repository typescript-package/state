// Class.
import { Ability } from '../ability/ability.class';
import { Expanded } from './expanded.class';
/**
 * @description Manages the ability state of `boolean` type.
 * @export
 * @class Expandable
 * @typedef {Expandable}
 * @extends {Ability}
 */
export class Expandable extends Ability {
  /**
   * @description
   * @type {*}
   */
  #expanded = new Expanded(false);
  
  /**
   * @description Expand the expandable if the ability is enabled.
   * @public
   * @returns {this}
   */
  public expand(): this {
    super.isEnabled() && this.#expanded.true();
    return this;
  }

  /**
   * @description Fold the expandable.
   * @public
   * @returns {this}
   */
  public fold(): this {
    super.isEnabled() && this.#expanded.false();
    return this;
  }

  /**
   * @description Checks whether the expandable is expanded.
   * @public
   * @returns {boolean}
   */
  public isExpanded(): boolean {
    return this.#expanded.is();
  }

  /**
   * @description Checks whether the expandable is folded.
   * @public
   * @returns {boolean}
   */
  public isFolded(): boolean {
    return this.#expanded.is() === false;
  }
}
