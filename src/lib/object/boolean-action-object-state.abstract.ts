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
  #actions = new Map<Actions[], Names[]>();

  /**
   * Creates an instance of child `class`.
   * @constructor
   * @param {Names[]} names
   * @param {?[Actions[], Names[]][]} [actions]
   */
  constructor(
    names: Names[],
    actions?: [Actions[], Names[]][],
  ) {
    super(names);
    actions?.forEach(([names, states]) => this.#actions.set(names, states))
    this.#actions.forEach(names => this.true(names[0]).false(...names.slice(1)));
  }

  /**
   * @description
   * @public
   * @template {Actions} Action
   * @param {Action} action
   */
  public dispatch<Action extends Actions>(action: Action) {
    for (const [actions, names] of this.#actions) {
      if (actions.includes(action)) {
        if (actions.indexOf(action) === 0) {
          this.true(names[0]).false(...names.slice(1));
        } else {
          this.false(names[0]).true(...names.slice(1));
        }
        break;
      }
    }
  }
}
