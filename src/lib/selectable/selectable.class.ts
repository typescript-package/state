// Class.
import { Ability } from '../ability/ability.class';
import { Selected } from './selected.class';
/**
 * @description Manages the selected state.
 * @export
 * @class Selectable
 * @typedef {Selectable}
 * @extends {Ability}
 */
export class Selectable extends Ability {
  /**
   * @description Privately stored selected state.
   * @type {*}
   */
  #selected = new Selected();

  /**
   * @description Sets the selectable state to unselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public deselect(): this {
    super.isEnabled() && this.#selected.true();
    return this;
  }

  /**
   * @description Sets the selectable state to unselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public deselectAll(): this {
    super.isEnabled() && this.#selected.all.false();
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
   * @description Sets the selectable state to selected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public selectAll(): this {
    super.isEnabled() && this.#selected.all.true();
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
