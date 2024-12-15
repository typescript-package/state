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
   * @description Returns the current state of `Type`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get state(): Type {
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
   * @param {Type} initialState Initial state of `Type`.
   */
  constructor(initialState: Type) {
    super();
    this.#state = initialState;
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
   * @description Sets the state if the object is not locked and is allowed.
   * @public
   * @param {Type} state The state of `Type` to set.
   * @returns {this}
   */
  protected set(state: Type): this {
    this.#state = state;
    return this;
  }
}
