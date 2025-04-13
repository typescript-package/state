// Class.
import { Ability } from '../ability/ability.abstract';
import {
  Boolean as Deselected,
  Boolean as Selected,
  Boolean as Untouched
} from '../../../lib/boolean';
/**
 * @description Manages the selected state by using private fields.
 * @export
 * @class Selectable
 * @extends {Ability}
 */
export abstract class SelectablePrivate extends Ability {
  /**
   * @description
   * @public
   * @static
   * @type {boolean}
   */
  public static selected: boolean = false;

  /**
   * @description Returns the `string` tag representation of the `SelectablePrivate` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return SelectablePrivate.name;
  }

  /**
   * @description Privately stored state of selectable was deselected from selected.
   * @type {Deselected}
   */
  #deselected = new Deselected().false();

  /**
   * @description Privately stored selected state. Defaults to, `false`.
   * @type {Selected}
   */
  #selected = new Selected().false();

  /**
   * @description Privately stored state of selectable was never touched.
   * @type {Untouched}
   */
  #untouched = new Untouched().true();

  /**
   * Creates an instance of `Selectable`.
   * @constructor
   * @param {?boolean} [selected] 
   * @param {?boolean} [enabled] 
   */
  constructor(selected?: boolean, enabled?: boolean) {
    super(enabled);
    (selected === true || SelectablePrivate.selected === true) && this.#selected.true();
  }

  /**
   * @description Sets the selectable state to deselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public deselect(): this {
    super.isEnabled() && this.isSelected() && (this.#selected.false(), this.#deselected.true(), this.#untouched.false());
    return this;
  }

  /**
   * @description Checks whether the selectable state is deselected .
   * @public
   * @returns {boolean}
   */
  public isDeselected(): boolean {
    return this.#deselected.is();
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
    super.isEnabled() && (this.#selected.true(), this.#deselected.false(), this.#untouched.false());
    return this;
  }

  /**
   * @description Toggles the selectable state between selected and deselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public override toggle(): this {
    super.isEnabled() && this.isUntouched() ? this.select() : (this.#selected.toggle(), this.#deselected.toggle(), this.#untouched.false());
    return this;
  }

  /**
   * @description Checks whether the selectable is in the untouched state.
   * @public
   * @returns {boolean} 
   */
  public isUntouched(): boolean {
    return this.#untouched.is();
  }
}
