// Abstract.
import { Immutability } from "./immutability.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class Data
 * @template Type 
 */
export abstract class Data<Type> extends Immutability {
  /**
   * @description Privately stored data of `Type`.
   * @static
   * @readonly
   * @type {WeakMap}
   */
  static readonly #value = new WeakMap<Data<any>, any>();
  
  /**
   * @description Returns the `string` tag representation of the `Data` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return Data.name;
  }

  /**
   * @description Returns the data of `Type`.
   * @public
   * @readonly
   * @type {Type}
   */
  public get value(): Type {
    return Data.#value.get(this);
  }

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} value Initial data of `Type`.
   */
  constructor(value: Type) {
    super();
    Data.#value.set(this, value)
  }

  /**
   * @description Removes the data from `WeakMap`.
   * @public
   */
  public destroy() {
    Data.#value.delete(this);
  }

  /**
   * @description Checks whether the instance has the data.
   * @public
   * @returns {boolean} 
   */
  public has() {
    return Data.#value.has(this);
  }

  /**
   * @description Sets the data.
   * @public
   * @param {Type} data The data of `Type` to set.
   * @returns {this}
   */
  public set(data: Type) {
    Data.#value.set(this, data);
    return this;
  }
}
