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
   * @description Dispatches the action where first action sets the first state to `true`.
   * @public
   * @template {Actions} Action 
   * @param {Action} action The action name to dispatch.
   * @returns {this}
   */
  public dispatch<Action extends Actions>(action: Action): this {
    const [firstValue] = [...this.#actions];
    const restNames = super.names.slice(1);
    if (firstValue === action) {
      this.true(super.names[0]);
      restNames.length > 0 && this.false(...restNames);
    } else {
      this.false(super.names[0]);
      restNames.length > 0 && this.true(...restNames);
    }
    return this;
  }
}
