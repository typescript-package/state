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
   * @description
   * @type {(boolean | ((newState: Type, currentState: Type) => boolean))}
   */
  #canChange: boolean | ((newState: Type, currentState: Type) => boolean) = true;

  /**
   * @description Privately stored state of `Type`.
   * @private
   * @type {Type}
   */
  #state!: Type;

  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {Type} initialState Initial state of `Type`.
   * @param {(boolean | ((newState: Type, currentState: Type) => boolean))} [canChange=true]
   */
  constructor(
    initialState: Type,
    canChange: boolean | ((newState: Type, currentState: Type) => boolean) = true
  ) {
    super();
    this.set(initialState);
    this.#canChange = canChange;
  }

  /**
   * @description
   * @public
   * @param {(boolean | ((newState: Type, currentState: Type) => boolean))} [canChange=true]
   * @returns {this}
   */
  public canChange(
    canChange: boolean | ((newState: Type, currentState: Type) => boolean) = true,
  ): this {
    this.#canChange = canChange;
    return this;
  }

  /**
   * @description Performs the `callback` function on `state`.
   * @public
   * @param {(state: Type) => void} stateCallback The callback function with a `state` to perform.
   * @returns {this}
   */
  public on(stateCallback: (state: Type) => void): this {
    stateCallback(this.#state);
    return this;
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

    const canChange = typeof this.#canChange === 'boolean'
      ? this.#canChange
      : this.#canChange(state, this.#state);

    canChange === true && (this.#state = state);
    return this;
  }
}
