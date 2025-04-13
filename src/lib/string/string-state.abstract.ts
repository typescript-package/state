// Abstract,
import { State } from "../state.abstract";
/**
 * @description 
 * @export
 * @abstract
 * @class StringState
 * @template {string} [Type=string] 
 * @extends {State<Type>}
 */
export abstract class StringState<Type extends string = string> extends State<Type> {
  /**
   * @description Returns the `string` tag representation of the `StringState` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return StringState.name;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Type} state The state of `Type` constrained by the `string`.
   * @returns {this} 
   */
  public override set(state: Type): this {
    typeof state === 'string' && super.set(state);
    return this;
  }
}
