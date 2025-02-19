// Abstract.
import { ImmutableState } from "./immutable-state.abstract";
/**
 * @description Common `abstract class` for setting the state of the generic type variable `Type`.
 * @export
 * @abstract
 * @class State
 * @template Type
 * @extends {ImmutableState}
 */
export abstract class State<Type> extends ImmutableState {
  /**
   * @description Privately stored state of `Type`.
   * @static
   * @readonly
   * @type {WeakMap}
   */
  static readonly #state = new WeakMap<State<any>, any>();

  /**
   * @description Returns the current state of `Type`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get state(): Readonly<Type> {
    return State.#state.get(this);
  }

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} initialState Initial state of `Type`.
   */
  constructor(initialState: Type) {
    super();
    State.#state.set(this, initialState)
  }
  
  /**
   * @description Performs the `callback` function on `state`.
   * @public
   * @param {(state: Type) => void} stateCallback The callback function with a `state` to perform.
   * @returns {this}
   */
  public on(stateCallback: (state: Type) => void): this {
    stateCallback(State.#state.get(this));
    return this;
  }

  /**
   * @description Removes the state from `WeakMap`.
   * @public
   */
  public destroy() {
    State.#state.delete(this);
  }

  /**
   * @description Sets the state if the object is not locked and is allowed.
   * @public
   * @param {Type} state The state of `Type` to set.
   * @returns {this}
   */
  protected set(state: Type): this {
    if (super.isLocked()) {
      throw new Error('Cannot set when object is locked.');
    }
    State.#state.set(this, state);
    return this;
  }
}
