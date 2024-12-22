// Abstract.
import { NamedArrayState } from "./named-array-state.abstract";
/**
 * @description Manages the `array` state of `boolean` type with the specified names of generic type variable `Names`.
 * @export
 * @abstract
 * @class NamedBooleanArrayState  
 * @template {string} Names
 * @extends {ArrayState<boolean>}
 */
export abstract class NamedBooleanArrayState<
  Names extends string
> extends NamedArrayState<Names, boolean> {
  /**
   * Creates an instance of child `class`.
   * @constructor
   * @param {...Names[]} names Arbitrary parameter `names` of generic type variable `Names` to associate `boolean` values.
   */
  constructor(...names: Names[]) {
    super(...names);
  }

  /**
   * @description Sets to `false` elements of the specified `names`.
   * @public
   * @param {...Names[]} names Arbitrary parameter of generic type variable `Names` to set the elements to `false`.
   * @returns {this}
   */
  public false(...names: Names[]): this {
    super.set(this.updateState(this.indexesOf(...names), () => false));
    return this;
  }

  /**
   * @description Toggles between `false` and `true` specified `names`.
   * @public
   * @param {...Names[]} names Arbitrary parameter of generic type variable `Names` to toggle their values.
   * @returns {this}
   */
  public toggle(...names: Names[]): this {
    super.set(super.updateState(this.indexesOf(...names), index => !super.state[index]));
    return this;
  }

  /**
   * @description Sets the `true` under the specified `names` in the `array` state.
   * @public
   * @param {...Names[]} names Arbitrary parameter of generic type variable `Names` to set the elements to `true`.
   * @returns {this}
   */
  public true(...names: Names[]): this {
    super.set(super.updateState(this.indexesOf(...names), () => true));
    return this;
  }
}
