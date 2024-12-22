// Abstract.
import { State } from "../state.abstract";
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
   * @description Returns the frozen object of the current state.
   * @public
   * @readonly
   * @type {Type}
   */
  public override get state(): Readonly<Type> {
    return Object.freeze(super.state);
  }

  /**
   * @description The initial state that used in resetting the state.
   * @type {*}
   */
  #initialState;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} initialState The initial state of `Type`.
   */
  constructor(initialState: Type) {
    super(initialState);
    this.#initialState = initialState;
  }

  /**
   * @description
   * @public
   * @template {keyof Type} Key
   * @param {Key} key
   * @returns {Type[Key]}
   */
  public get<Key extends keyof Type>(key: Key): Type[Key] {
    return this.state[key];
  }

  /**
   * @description
   * @public
   * @template {keyof Type} Keys
   * @param {...Keys[]} keys
   * @returns {Pick<Type, Keys>}
   */
  public pick<Keys extends keyof Type>(...keys: Keys[]): Pick<Type, Keys> {
    return keys.reduce<Type>((object, key) => (Object.assign(object, {[key]: this.state[key]}), object), {} as Type);
  }

  /**
   * @description Resets the state to the initial state set in the `constructor`.
   * @public
   * @returns {this}
   */
  public reset(): this {
    super.set(this.#initialState);
    return this;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Type} state
   * @returns {this}
   */
  public override set(state: Type): this {
    super.set(state);
    return this;
  }

  /**
   * @description Converts the state to JSON string.
   * @public
   * @returns {string}
   */
  public toJSON(): string {
    return JSON.stringify(super.state);
  }

  /**
   * @description Updates the state with `partial` value.
   * @public
   * @param {Partial<Type>} partial The partial `object` to merge into the state.
   * @returns {this}
   */
  public update(partial: Partial<Type>): this {
    this.set({ ...super.state, ...partial });
    return this;
  }
}
