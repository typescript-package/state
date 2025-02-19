// Abstract,
import { State } from "./state.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class StringState
 * @extends {State<string>}
 */
export abstract class StringState extends State<string> {
  /**
   * @inheritdoc
   * @protected
   * @param {string} state
   * @returns {this}
   */
  protected override set(state: string): this {
    typeof state === 'string' && super.set(state);
    return this;
  }
}
