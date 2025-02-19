// Abstract.
import { SelectablePrivate } from "./selectable-private.abstract";
/**
 * @description The default `Selectable` that uses a modern approach private fields.
 * @export
 * @abstract
 * @class Selectable
 * @extends {SelectablePrivate}
 */
export abstract class Selectable extends SelectablePrivate {
  /**
   * @description Returns the `string` tag representation of the `Selectable` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return Selectable.name;
  }
}
