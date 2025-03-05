// Class.
import { Data } from "./data.abstract";
import { History as AbstractHistory } from "./history.abstract";
/**
 * @description Container with the **undo/redo** history functionality, allowing the data to be reverted to previous versions, and
 * restored from **redo** history.
 * @export
 * @abstract
 * @class Container
 * @template Type 
 * @extends {Data<Type>}
 */
export abstract class Container<Type> extends Data<Type> {
  /**
   * @description 
   * @public
   * @static
   * @type {boolean}
   */
  public static history: boolean = false;

  /**
   * @description Returns the `string` tag representation of the `Container` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return Container.name;
  }

  /**
   * @description
   * @type {boolean}
   */
  #history;

  /**
   * Creates an instance of `Container` child class.
   * @constructor
   * @param {Type} initialData 
   */
  constructor(initialData: Type, history = Container.history) {
    super(initialData);
    this.#history = new class History<Type> extends AbstractHistory<Type>{}(initialData);
  }

  /**
   * @inheritdoc
   * @public
   */
  public override destroy() {
    this.#history.destroy();
    super.destroy();
  }

  /**
   * @description
   * @public
   * @returns {boolean} 
   */
  public isHistoryEnabled() {
    return this.#history.isEnabled();
  }

  /**
   * @description Sets the data to the recent version stored in the `redo` history, if exists.
   * @public
   * @returns {this} 
   */
  public redo(): this {
    if (super.isLocked()) {
      throw new Error('Cannot redo when container is locked.');
    }
    if (this.#history.isEnabled()) {
      const nextData = this.#history.redo();
      nextData && super.set(nextData);
    }
    return this;
  }

  /**
   * @description Sets the data to the recent version stored in the `undo` history, if available.
   * @public
   * @returns {this} 
   */
  public undo(): this {
    if (super.isLocked()) {
      throw new Error('Cannot undo when container is locked.');
    }

    if (this.#history.isEnabled()) {
      const previousData = this.#history.undo();
      previousData && super.set(previousData);
    }
    return this;
  }

  /**
   * @description Sets the new data, stores current in the **undo** history , and clears the **redo** history.
   * @protected
   * @param {Type} data The data to set of `Type`.
   * @returns {this} 
   */
  public override set(data: Type): this {
    if (this.#history.isEnabled()) {
      if (super.isLocked()) {
        throw new Error('Cannot set history when container is locked.');
      }

      this.#history.set(super.value);
    }
    super.set(data);
    return this;
  }
}
