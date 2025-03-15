// Abstract.
import { HistoryPrepend } from "./history-prepend.abstract";
import { HistoryAppend } from "./history-append.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class History
 * @template Type 
 */
export abstract class History<Type> {
  /**
   * @description Returns the `string` tag representation of the `History` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return History.name;
  }

  /**
   * @description Gets the current value stored in history.
   * @public
   * @readonly
   * @type {Type}
   */
  public get current(): Type {
    return this.#current;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {RedoHistory<any, number>}
   */
  public get redoHistory() {
    return this.#redo;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {UndoHistory<any, number>}
   */
  public get undoHistory() {
    return this.#undo;
  }

  /**
   * @description
   * @type {RedoHistory}
   */
  #redo;

  /**
   * @description
   * @type {UndoHistory}
   */
  #undo

  /**
   * @description A private field to store the current value.
   * @private
   * @type {Type}
   */
  #current: Type;

  /**
   * Creates an instance of `History` child class.
   * @constructor
   * @param {?Type} [value] 
   */
  constructor(value?: Type, size?: number) {
    this.#current = value as Type;
    this.#redo = new class RedoHistory<Type = any, Size extends number = number> extends HistoryPrepend<Type, Size>{}(size);
    this.#undo = new class UndoHistory<Type = any, Size extends number = number> extends HistoryAppend<Type, Size>{}(size);
  }

  /**
   * @description Clears the history `undo` and `redo`.
   * @public
   * @returns {this} The current instance.
   */
  public clear(): this {
    this.#redo.clear();
    this.#undo.clear();
    return this;
  }

  /**
   * @description Destroys the history of this instance.
   * @public
   * @returns {this} The current instance.
   */
  public destroy(): this {
    this.#undo.destroy();
    this.#redo.destroy();
    return this;
  }

  /**
   * @description Gets the undo and redo history.
   * @public
   * @returns {{ undo: Readonly<Type[]>; redo: Readonly<Type[]> }} 
   */
  public get(): { undo: Readonly<Type[]>; redo: Readonly<Type[]> } {
    return {
      undo: this.#undo.get(),
      redo: this.#redo.get(),
    };
  }
  
  /**
   * @description The instance method returns read-only redo history of the specified `instance`.
   * @public
   * @template Type
   * @returns {(Readonly<Type[]> | undefined)} 
   */
  public getRedo(): Readonly<Type[]> | undefined {
    return this.#redo.get();
  }

  /**
   * @description The instance method returns read-only undo history of the specified `instance`.
   * @public
   * @template Type 
   * @returns {(Readonly<Type[]> | undefined)} 
   */
  public getUndo(): Readonly<Type[]> | undefined {
    return this.#undo.get();
  }

  /**
   * @description Pick the undo or redo history.
   * @public
   * @param {('undo' | 'redo')} type 
   * @returns {Readonly<Type[]>} 
   */
  public pick(type: 'undo' | 'redo'): Readonly<Type[]> {
    return (type === 'undo' ? this.#undo : this.#redo).get();
  }

  /**
   * @description Redoes the last undone action.
   * @public
   * @returns {this} The current instance.
   */
  public redo(): this {
    const redo = this.#redo;
    if (redo.get()?.length) {
      const redoValue = redo.take();
      this.#undo.add(this.#current);
      this.#current = redoValue;
    }
    return this;
  }

  /**
   * @description Sets a new value and updates the undo history.
   * @public
   * @param {Type} value 
   * @returns {this} The current instance.
   */
  public set(value: Type): this {
    this.#undo.add(this.#current);
    this.#current = value;
    this.#redo.clear();
    return this;
  }

  /**
   * @description Undoes the last action and moves it to redo history.
   * @public
   * @returns {this} The current instance.
   */
  public undo(): this {
    const undo = this.#undo;
    if (undo.get()?.length) {
      const lastValue = undo.take();
      this.#redo.add(this.#current);
      this.#current = lastValue;
    }
    return this;
  }
}
