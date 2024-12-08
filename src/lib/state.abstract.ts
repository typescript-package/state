// Abstract.
import { ImmutableState } from "./immutable-state.abstract";
/**
 * @description Common class for setting the state of `Type`.
 * @export
 * @abstract
 * @class State
 * @typedef {State}
 * @template Type
 * @extends {ImmutableState}
 */
export abstract class State<Type> extends ImmutableState {
  /**
   * @description Returns the current state of `Type`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get state() {
    return this.#state;
  }

  /**
   * @description Privately stored state of `Type`.
   * @private
   * @type {Type}
   */
  #state!: Type;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {Type} [initialState] Initial state of `Type`.
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
