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
   * @type {Type}
   */
  #initialState;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} state The initial state of `Type`.
   */
  constructor(state: Type) {
    super(state);
    this.#initialState = state;
  }

  /**
   * @description Returns the value from the specified `key`.
   * @public
   * @template {keyof Type} Key
   * @param {Key} key The key of generic type variable `Key` to get from the `object` state.
   * @returns {Type[Key]} The return value is the value from the specified `key` of the `object` state.
   */
  public get<Key extends keyof Type>(key: Key): Type[Key] {
    return this.state[key];
  }

  /**
   * @description Picks the specified `keys` to the returned `object`.
   * @public
   * @template {keyof Type} Keys
   * @param {...Keys[]} keys Arbitrary parameter `keys` of generic type variable `Keys` to pick from `object` state.
   * @returns {Pick<Type, Keys>} The returned value is an `object` of `Type` with the specified `keys`.
   */
  public pick<Keys extends keyof Type>(...keys: Keys[]): Pick<Type, Keys> {
    return keys.reduce<Type>(
      (object, key) => (
        Object.hasOwn(this.state, key) && Object.assign(object, {[key]: this.state[key]}),
        object
      ),
      {} as Type
    );
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
