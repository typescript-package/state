// Class.
import { All } from "./all.class";
// Abstract.
import { BooleanState } from "../boolean-state.abstract";
/**
 * @description Manages the selected state of `boolean` type.
 * @export
 * @class Selected
 * @typedef {Selected}
 * @extends {BooleanState}
 */
export class Selected extends BooleanState {
  /**
   * @description
   * @public
   * @returns {*}
   */
  public get all() {
    return this.#all;
  }

  /**
   * @description
   * @type {boolean}
   */
  #all

  /**
   * Creates an instance of `Selected`.
   * @constructor
   * @param {?boolean} [selected]
   */
  constructor(selected?: boolean, all = false) {
    super(selected);
    this.#all = new All(false, () => this.true(), () => this.false());
    typeof all === 'boolean' && all === true && this.#all.true();
  }
}
