// Class.
import { Ability } from '../ability/ability.abstract';
import { Boolean as Selected } from '../boolean';
/**
 * @description Manages the selected state.
 * @export
 * @class Selectable
 * @extends {Ability}
 */
export abstract class Selectable extends Ability {
  /**
   * @description Privately stored selected state.
   * @type {Selected}
   */
  #selected = new Selected();

  /**
   * @description Sets the selectable state to unselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public deselect(): this {
    super.isEnabled() && this.#selected.false();
    return this;
  }

  /**
   * @description Checks whether the selectable state is selected.
   * @public
   * @returns {boolean}
   */
  public isSelected(): boolean {
    return this.#selected.is();
  }

  /**
   * @description Sets the selectable state to selected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public select(): this {
    super.isEnabled() && this.#selected.true();
    return this;
  }

  /**
   * @description Toggles the selectable state between selected and unselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public toggle(): this {
    super.isEnabled() && this.#selected.toggle();
    return this;
  }
}
