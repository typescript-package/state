// Abstract.
import { StateImmutable } from "./state-immutable.abstract";
/**
 * @description State storage `abstract class` for storing the state of the generic type variable `Type` in the `WeakMap`.
 * 1. **Memory Efficiency**: Uses weak references to allow for garbage collection of state when the object is no longer in use.
 * 2. **Enhanced Encapsulation**: State is stored separately from the object, ensuring it is only accessible through the provided methods.
 * 3. **Flexible State Management**: Enables dynamic and isolated state handling, allowing for better extensibility and control over state across instances. * @export
 * @abstract
 * @class StateStorage
 * @template Type
 * @extends {StateImmutable}
 */
export abstract class StateStorage<Type> extends StateImmutable {
  /**
   * @description Privately stored state of `Type`.
   * @static
   * @readonly
   * @type {WeakMap}
   */
  static readonly #state = new WeakMap<StateStorage<any>, any>();
  
  /**
   * @description Returns the `string` tag representation of the `StateStorage` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return StateStorage.name;
  }

  /**
   * @description Returns the current `Readonly` state of `Type`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get state() {
    const state = StateStorage.#state.get(this);
    return (typeof state !== "object" || state === null) ? state : Object.freeze<Type>({...state});
  }

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} initialState Initial state of `Type`.
   */
  constructor(initialState: Type) {
    super();
    StateStorage.#state.set(this, initialState)
  }

  /**
   * @description Removes the state from `WeakMap`.
   * @public
   */
  public destroy() {
    StateStorage.#state.delete(this);
  }

  /**
   * @description Checks whether the instance has the state.
   * @public
   * @returns {boolean} 
   */
  public has(): boolean {
    return StateStorage.#state.has(this);
  }

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public override lock() {
    StateImmutable.deepFreeze(StateStorage.#state.get(this));
    // Prevent modifications to the `WeakMap`.
    StateStorage.#state.set = () => {
      throw new Error('Cannot modify the `WeakMap` after lock.');
    };
    StateStorage.#state.delete = () => {
      throw new Error('Cannot delete from the `WeakMap` after lock.');
    };
    super.lock();
    return this;
  }

  /**
   * @description Performs the `callback` function on `state`.
   * @public
   * @param {(state: Type) => void} stateCallback The callback function with a `state` to perform.
   * @returns {this}
   */
  public on(stateCallback: (state: Type) => void): this {
    stateCallback(StateStorage.#state.get(this));
    return this;
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
    StateStorage.#state.set(this, state);
    return this;
  }
}
