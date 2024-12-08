// Abstract.
import { State } from "./state.abstract";
/**
 * @description Handles and manages the `null` type state.
 * @export
 * @abstract
 * @class NullState
 * @typedef {NullState}
 * @extends {State<null | undefined>}
 */
export abstract class NullState extends State<null | undefined> {
  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {?null} [state]
   */
  constructor(state?: null) {
    super(state);
  }

  /**
   * @description Checks whether state is `null`.
   * @public
   * @returns {boolean}
   */
  public isNull() {
    return super.state === null;
  }

  /**
   * @inheritdoc
   * @public
   * @param {?null} [state]
   * @returns {this}
   */
  public override set() {
    super.set(null);
    return this;
  }

  /**
   * @description Removes the `null` state.
   * @public
   * @returns {this}
   */
  public unset() {
    super.set(undefined);
    return this;
  }
}
