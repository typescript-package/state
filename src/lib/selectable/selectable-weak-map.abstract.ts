// Class.
import { Ability } from '../ability/ability.abstract';
import {
  Boolean as Deselected,
  Boolean as Selected,
  Boolean as Untouched
} from '../boolean';
/**
 * @description Manages the selected state with the `WeakMap`.
 * @export
 * @class Selectable
 * @extends {Ability}
 */
export abstract class SelectableWeakMap extends Ability {
  /**
   * @description
   * @public
   * @static
   * @type {boolean}
   */
  public static selected: boolean = false;
  
  /**
   * @description Privately stored selected state. Defaults to, `false`.
   * @static
   * @readonly
   * @type {*}
   */
  static readonly #selected = new WeakMap<SelectableWeakMap, Selected>();
  
  /**
   * @description Privately stored state of selectable was deselected from selected.
   * @static
   * @readonly
   * @type {*}
   */
  static readonly #deselected = new WeakMap<SelectableWeakMap, Deselected>();

  /**
   * @description Privately stored state of selectable was never touched.
   * @static
   * @readonly
   * @type {*}
   */
  static readonly #untouched = new WeakMap<SelectableWeakMap, Untouched>();

  /**
   * @description Returns the `string` tag representation of the `Selectable` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return 'SelectableWeakMap';
  }

  /**
   * Creates an instance of `Selectable`.
   * @constructor
   * @param {?boolean} [selected] 
   * @param {?boolean} [enabled] 
   */
  constructor(selected?: boolean, enabled?: boolean) {
    super(enabled);

    // Initialize states in the WeakMap.
    SelectableWeakMap.#selected.set(this, new Selected().false());
    SelectableWeakMap.#deselected.set(this, new Deselected().false());
    SelectableWeakMap.#untouched.set(this, new Untouched().true());

    (selected === true || SelectableWeakMap.selected === true) && SelectableWeakMap.#selected.get(this)!.true();
  }

  /**
   * @description Sets the selectable state to deselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public deselect(): this {
    super.isEnabled() && this.isSelected() && (
      SelectableWeakMap.#selected.get(this)?.false(),
      SelectableWeakMap.#deselected.get(this)?.true(),
      SelectableWeakMap.#untouched.get(this)?.false()
    );
    return this;
  }

  /**
   * @description Checks whether the selectable state is deselected .
   * @public
   * @returns {boolean}
   */
  public isDeselected(): boolean {
    return SelectableWeakMap.#deselected.get(this)!.is();
  }

  /**
   * @description Checks whether the selectable state is selected.
   * @public
   * @returns {boolean}
   */
  public isSelected(): boolean {
    return SelectableWeakMap.#selected.get(this)!.is();
  }

  /**
   * @description Sets the selectable state to selected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public select(): this {
    super.isEnabled() && (
      SelectableWeakMap.#selected.get(this)!.true(),
      SelectableWeakMap.#deselected.get(this)!.false(),
      SelectableWeakMap.#untouched.get(this)!.false()
    );
    return this;
  }

  /**
   * @description Toggles the selectable state between selected and deselected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public toggle(): this {
    super.isEnabled() && this.isUntouched() ? this.select() : (
      SelectableWeakMap.#selected.get(this)!.toggle(),
      SelectableWeakMap.#deselected.get(this)!.toggle(),
      SelectableWeakMap.#untouched.get(this)!.false()
    );
    return this;
  }

  /**
   * @description Checks whether the selectable is in the untouched state.
   * @public
   * @returns {boolean} 
   */
  public isUntouched(): boolean {
    return SelectableWeakMap.#untouched.get(this)!.is();
  }
}
