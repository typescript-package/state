// Abstract.
import { Ability } from "./ability.abstract";
import { BooleanActionable } from "../actionable";
/**
 * @description
 * @export
 * @abstract
 * @class ActionableAbility
 * @template {PropertyKey} [Names=PropertyKey]
 * @template {string} [Actions=string]
 * @extends {Ability}
 */
export abstract class ActionableAbility<
  Names extends PropertyKey = PropertyKey,
  Actions extends string = string,
> extends Ability {
  /**
   * @description
   * @type {*}
   */
  #booleanActionable;

  /**
   * Creates an instance of `ActionableAbility`.
   * @constructor
   * @param {Names[]} names
   * @param {?{
   *       boolean?: [Actions[], Names[]][]
   *     }} [actions]
   */
  constructor(
    names: Names[],
    actions?: {
      boolean?: [Actions[], Names[]][]
    }
  ) {
    super();
    this.#booleanActionable = new BooleanActionable<Names, Actions>(names, actions?.boolean);
  }

  /**
   * @description
   * @public
   * @param {Actions} action
   */
  public dispatch<Action extends Actions>(action: Action) {
    this.isEnabled() && this.#booleanActionable.dispatch(action);
  }
}
