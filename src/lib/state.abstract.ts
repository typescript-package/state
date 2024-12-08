// Abstract.
import { ImmutableState } from "./immutable-state.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class State
 * @typedef {State}
 * @template Type
 * @extends {ImmutableState}
 */
export abstract class State<Type> extends ImmutableState {
  /**
   * @description
   * @public
   * @readonly
   * @type {Type}
   */
  public get state() {
    return this.#state;
  }

  /**
   * @description
   * @private
   * @type {Type}
   */
  #state!: Type;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {Type} [initialState]
   */
  constructor(initialState: Type) {
    super();
    this.set(initialState);
  }

  /**
   * @description Sets the state if the object is not locked.
   * @public
   * @param {Type} state
   * @returns {this}
   */
  protected set(state: Type) {
    if (super.isLocked()) {
      throw new Error('Cannot set when object is locked.');
    }
    this.#state = state;
    return this;
  }
}
