// Abstract.
import { StateImmutable } from "./state-immutable.abstract";
/**
 * @description Common `abstract class` for setting the state of the generic type variable `Type`.
 * 1. **Memory Efficiency**: Uses weak references to allow for garbage collection of state when the object is no longer in use.
 * 2. **Enhanced Encapsulation**: State is stored separately from the object, ensuring it is only accessible through the provided methods.
 * 3. **Flexible State Management**: Enables dynamic and isolated state handling, allowing for better extensibility and control over state across instances. * @export
 * @abstract
 * @class State
 * @template Type
 * @extends {StateImmutable}
 */
export abstract class State<Type> extends StateImmutable {
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
