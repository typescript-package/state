// Abstract.
import { Container } from "./container.abstract";
import { Immutability } from "./immutability.abstract";
/**
 * @description State container `abstract class` for storing the state of the generic type variable `Type` in the `WeakMap`.
 * 1. **Memory Efficiency**: Uses weak references to allow for garbage collection of state when the object is no longer in use.
 * 2. **Enhanced Encapsulation**: State is stored separately from the object, ensuring it is only accessible through the provided methods.
 * 3. **Flexible State Management**: Enables dynamic and isolated state handling, allowing for better extensibility and control over state across instances. * @export
 * @export
 * @abstract
 * @class StateContainer
 * @template Type 
 * @extends {Container<Type>}
 */
export abstract class StateContainer<Type> extends Container<Type> {  
  /**
   * @description Returns the `string` tag representation of the `StateContainer` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return StateContainer.name;
  }

  /**
   * @description Returns the current `Readonly` state of `Type`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get state() {
    const state = super.value;
    return (typeof state !== "object" || state === null) ? state : Object.freeze<Type>({...state});
  }

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} initialState Initial state of `Type`.
   */
  constructor(initialState: Type) {
    super(initialState);
  }

  /**
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public override lock() {
    Immutability.deepFreeze(super.value);
    this.set = () => {
      throw new Error('Cannot modify the state data in container after lock.');
    };
    this.destroy = () => {
      throw new Error('Cannot delete from the state data in container after lock.');
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
    stateCallback(super.value);
    return this;
  }

  /**
   * @description Sets the state if it is not locked and is allowed.
   * @public
   * @param {Type} state The state of `Type` to set.
   * @returns {this}
   */
  public override set(state: Type): this {
    if (super.isLocked()) {
      throw new Error('Cannot set when state is locked.');
    }
    super.set(state);
    return this;
  }
}
