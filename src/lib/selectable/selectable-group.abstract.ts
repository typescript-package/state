// Abstract.
import { Ability } from "../ability/ability.abstract";
// Class.
import { Selectable } from "./selectable.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class SelectableGroup
 * @template {Selectable} T
 * @extends {Ability}
 */
export abstract class SelectableGroup<T extends Selectable> extends Ability {

  /**
   * @description
   * @protected
   * @type {T[]}
   */
  protected selectable: T[];

  /**
   * Creates an instance of `SelectableGroup`.
   * @constructor
   * @param {T[]} selectable
   * @param {boolean} [enabled=true]
   */
  constructor(selectable: T[], enabled = true) {
    super(enabled);
    this.selectable = selectable;
  }

  /**
   * @description
   * @public
   * @returns {this}
   */
  public selectAll(): this {
    this.selectable.forEach(selectable => selectable.select());
    return this;
  }

  /**
   * @description
   * @public
   * @returns {this}
   */
  public deselectAll(): this {
    this.selectable.forEach(selectable => selectable.deselect());
    return this;
  }

  /**
   * @description
   * @public
   * @returns {this}
   */
  public toggleSelection(): this {
    this.selectable.forEach(selectable => selectable.toggle());
    return this;
  }
}
