// Abstract.
import { ArrayState } from "./array-state.abstract";
/**
 * @description Manages the `array` state of `Type` type with the specified names of generic type variable `Names`.
 * @export
 * @abstract
 * @class NamedArrayState
 * @template {string} Names
 * @template Type
 * @extends {ArrayState<Type>}
 */
export abstract class NamedArrayState<
  Names extends string,
  Type
> extends ArrayState<Type> {
  /**
   * @description Returns tuple an `array` where the first element contains an `array` of names and the second `array` contains their corresponding values.
   * @public
   * @returns {[Names[], Type[]]}
   */
  public get stateAsTuple(): [Names[], Type[]] {
    return [this.#names, [...super.state]];
  }

  /**
   * @description Returns an `array` state of tuple pairs name-type.
   * @public
   * @readonly
   * @type {[Names, Type][]}
   */
  public get stateWithNames(): [Names, Type][] {
    return this.#names.map((name, index) => [name, super.state[index]]);
  }

  /**
   * @description A private property, an `array` of generic type variable `Names`, used to associate `Type` values.
   * @type {Names[]}
   */
  #names: Names[];

  /**
   * Creates an instance of child `class`.
   * @constructor
   * @param {Names[]} names Arbitrary parameter `names` of generic type variable `Names` to associate `Type` values.
   * @param {Type[]} [values=[]] The `values` to set to the respective `names`.
   */
  constructor(names: Names[], values: Type[] = []) {
    super(values);
    this.#names = names;
  }

  /**
   * @description Returns the value from element of the specified `name`.
   * @public
   * @param {Names} name The name of generic type variable `Names` to get the value.
   * @returns {Type}
   */
  public get(name: Names): Type {
    return this.state[this.#names.indexOf(name)];
  }

  /**
   * @description Returns index of the specified `name`.
   * @public
   * @param {Names} name The name of generic type variable `Names` to get its index.
   * @returns {number}
   */
  public indexOf(name: Names): number {
    return this.#names.indexOf(name);
  }

  /**
   * @description Selects values from the specified `names`.
   * @public
   * @param {...Names[]} names Arbitrary parameter of names to select the values from `array` state.
   * @returns {Type[]}
   */
  public select(...names: Names[]): Type[] {
    return super.pick(...this.indexesOf(...names));
  }

  /**
   * @description Returns the `object` of names with their `Type` values.
   * @public
   * @returns {{ [Name in Names]: Type }}
   */
  public toObject() {
    return this.#names.reduce(
      (acc, name) => (acc[name] = super.state[this.indexOf(name)], acc),
      {} as { [Name in Names]: Type }
    );
  }

  /**
   * @description Returns the indexes of the specified `names`.
   * @protected
   * @param {...Names[]} names Arbitrary parameter of generic type variable `Names` to get their indexes.
   * @returns {number[]}
   */
  protected indexesOf(...names: Names[]): number[] {
    return names.map(name => this.#names.indexOf(name));
  }

  /**
   * @description Private method to update the state of the specified `indexes` by using function `state`.
   * @protected
   * @param {number[]} indexes `Array` type indexes of `number` type to update the value.
   * @param {(index: number) => Type} state The `function` to update the state under the specified `index`.
   * @returns {Type[]}
   */
  protected updateState(indexes: number[], state: (index: number) => Type): Type[] {
    return super.state.map((value, index) => indexes.includes(index) ? state(index) : value);
  }
}
