// Abstract.
import { BooleanState } from "./boolean-state.abstract";
/**
 * @description Handles the `boolean` type state.
 * @export
 * @class Boolean
 * @template {boolean} [Type=boolean] 
 * @extends {BooleanState<Type>}
 */
export class Boolean<Type extends boolean = boolean> extends BooleanState<Type> {
  /**
   * @description A static method that creates and returns a new instance of `Boolean`.
   * @public
   * @static
   * @template {boolean} [Type=boolean] 
   * @param {Type} value The new state value.
   * @returns {Boolean<Type>} A new instance of `Boolean` with the provided value.
   */
  public static create<Type extends boolean = boolean>(value: Type): Boolean<Type> {
    return new Boolean(value);
  }

  /**
   * @description Returns the `string` tag representation of the `Boolean` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return Boolean.name;
  }

  /**
   * @description The method to create a new instance with a new type.
   * @public
   * @template {boolean} [WithType=boolean] 
   * @param {WithType} value The new state value.
   * @returns {Boolean<WithType>} A new instance of `Boolean` with the updated state.
   */
  public with<WithType extends boolean = boolean>(value: WithType) {
    return Boolean.create(value);
  }
}
