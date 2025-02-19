// Abstract,
import { StateHistory } from "./state-history.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class StringState
 * @template {string} [Type=string] 
 * @extends {StateHistory<Type>}
 */
export abstract class StringState<Type extends string = string> extends StateHistory<Type> {
  /**
   * @inheritdoc
   * @protected
   * @param {Type} state The state of `Type` constrained by the `string`.
   * @returns {this} 
   */
  protected override set(state: Type): this {
    typeof state === 'string' && super.set(state);
    return this;
  }
}
