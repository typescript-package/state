// Class.
import { BooleanObjectState } from "./boolean-object-state.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class BooleanActionObjectState
 * @template {string} [Names=string]
 * @template {string} [Actions=string]
 * @extends {BooleanObjectState<Names>}
 */
export abstract class BooleanActionObjectState<
  Names extends PropertyKey = PropertyKey,
  Actions extends string = string,
> extends BooleanObjectState<Names> {
  /**
   * @description
   * @type {*}
   */
  #actions = new Set<Actions>();

  /**
   * Creates an instance of child `class`.
   * @constructor
   * @param {Names[]} names
   * @param {?Actions[]} [actions]
   */
  constructor(
    names: Names[],
    actions?: Actions[],
  ) {
    super(names);
    actions?.forEach(action => this.#actions.add(action));
    this.#actions.size > 0 && this.true(super.names[0]).false(...super.names.slice(1));
  }

  /**
   * @description Dispatch the `action` to set the first value in 
   * @public
   * @template {Actions} Action
   * @param {Action} action
   */
  public dispatch<Action extends Actions>(action: Action) {
    for (const [actions, names] of this.#actions) {
      if (actions.includes(action)) {
        if (actions.indexOf(action) === 0) {
          this.true(super.names[0]).false(...super.names.slice(1));
        } else {
          this.false(super.names[0]).true(...super.names.slice(1));
        }
        break;
      }
    }
  }
}
