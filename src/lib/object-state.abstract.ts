// Abstract.
import { State } from "./state.abstract";
/**
 * @description The `abstract class` handles the state of Javascript Object.
 * @export
 * @abstract
 * @class ObjectState
 * @template {object} Type
 * @extends {State<Type>}
 */
export abstract class ObjectState<Type extends object> extends State<Type> {
  /**
   * @description Returns a newly created and frozen clone of the current state.
   * @public
   * @readonly
   * @type {Type}
   */
  public override get state(): Readonly<Type> {
    return Object.freeze(Object.create(super.state));
  }

  /**
   * @description
   * @type {*}
   */
  #initialState;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} initialState
   */
  constructor(initialState: Type) {
    super(initialState);
    this.#initialState = initialState;
  }

  /**
   * @description
   * @public
   * @returns {this}
   */
  public reset(): this {
    super.set(this.#initialState);
    return this;
  }

  /**
   * @description Converts the state to JSON.
   * @public
   * @returns {*}
   */
  public toJSON() {
    return JSON.stringify(super.state);
  }

  /**
   * @description Updates the state with `partial` value.
   * @public
   * @param {Partial<Type>} partial The partial object to merge into the state.
   * @returns {this}
   */
  public update(partial: Partial<Type>): this {
    this.set({ ...super.state, ...partial });
    return this;
  }
}
