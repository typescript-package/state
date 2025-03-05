
export abstract class History<Type> {
  /**
   * @description 
   * @public
   * @static
   * @type {boolean}
   */
  public static history: boolean = false;

  /**
   * @description
   * @public
   * @static
   * @template [Type=any] 
   * @param {History<Type>} instance 
   * @returns {(Readonly<Type[]> | undefined)} 
   */
  public static redo<Type = any>(instance: History<Type>): Readonly<Type[]> | undefined {
    return Object.freeze(this.#redo.get(instance));
  }

  /**
   * @description The static method returns read-only undo/redo history of the specified `instance`.
   * @public
   * @static
   * @template [Type=any] 
   * @param {History<Type>} instance 
   * @returns {(Readonly<Type[]> | undefined)} 
   */
  public static undo<Type = any>(instance: History<Type>): Readonly<Type[]> | undefined {
    return Object.freeze(this.#undo.get(instance));
  }

  /**
   * @description A private undo for history of `WeakMap` type.
   * @static
   * @readonly
   * @type {WeakMap}
   */
  static readonly #undo = new WeakMap<any, any[]>();

  /**
   * @description
   * @static
   * @readonly
   * @type {WeakMap}
   */
  static readonly #redo = new WeakMap<any, any[]>();

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
   * @description
   * @type {boolean}
   */
  #history: boolean = false;

  /**
   * Creates an instance of `History`.
   * @constructor
   */
  constructor(value?: Type) {
    History.#undo.set(this, []);
    History.#redo.set(this, []);
    value && this.set(value);
  }

  /**
   * @description
   * @public
   * @returns {this} 
   */
  public clear(): this {
    const undoHistory = History.#undo.get(this);
    const redoHistory = History.#redo.get(this);
    undoHistory && (undoHistory.length = 0);
    redoHistory && (redoHistory.length = 0);
    return this;
  }

  /**
   * @inheritdoc
   * @public
   */
  public destroy() {
    History.#undo.delete(this);
    History.#redo.delete(this);
  }

  /**
   * @description
   * @public
   * @returns {boolean} 
   */
  public isEnabled() {
    return this.#history === true;
  }

  /**
   * @description
   * @public
   * @param {Type} value 
   * @returns {this} 
   */
  public set(value: Type): this {
    History.#undo.get(this)?.push(value);
    History.#redo.set(this, []);
    return this;
  }

  public redo(): Type | null {
    if (this.#history === true) {
      const redo = History.#redo.get(this);
      if (redo?.length) {
        const redoValue = redo.pop();
        History.#undo.get(this)?.push(redoValue);
        return redoValue;
      }  
    }
    return null;
  }

  public undo(): Type | null {
    if (this.#history === true) {
      const undo = History.#undo.get(this);
      if (undo?.length) {
        const previousValue = undo.pop();
        History.#redo.get(this)?.push(previousValue);
        return previousValue;
      }
    }
    return null;
  }
}
