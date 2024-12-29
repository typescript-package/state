// Abstract.
import { NamedObjectState } from "./named-object-state.abstract";
/**
 * @description Manages the `object` state of pairs name-boolean.
 * @export
 * @abstract
 * @class BooleanObjectState
 * @template {PropertyKey} Names
 * @extends {NamedObjectState<Names, boolean>}
 */
export abstract class BooleanObjectState<
  Names extends PropertyKey,
> extends NamedObjectState<boolean, Names> {
  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Names[]} names
   */
  constructor(names: Names[]) {
    super(names); 
    const partial: Partial<{[Name in Names]: boolean}> = {};
    names.forEach(name => Object.assign(partial, {[name]: true}));
    this.update(partial);
  }

  /**
   * @description Sets the state to `false in `Object` states of the specified `names`.
   * @public
   * @template {Names} Name
   * @param {...Name[]} names The names to set the state to `false`.
   * @returns {this}
   */
  public false<Name extends Names>(...names: Name[]): this {
    this.updateNames(names, () => false);
    return this;
  }

  /**
   * @description
   * @public
   * @template {Names} Name
   * @param {Name} name
   * @param {?boolean} [expected]
   * @returns {Object}
   */
  public is<Name extends Names>(name: Name, expected?: boolean) {
    return expected ? super.state[name] === expected : super.state[name];
  }

  /**
   * @description Toggles the state of the specified `names`.
   * @public
   * @template {Names} Name
   * @param {...Name[]} names The `names` to toggle the state.
   * @returns {this}
   */
  public toggle<Name extends Names>(...names: Name[]): this {
    this.updateNames(names, name => !this.state[name]);
    return this;
  }

  /**
   * @description Sets the `boolean` value to `true in `object` state in the specified `names`.
   * @public
   * @template {Names} Name
   * @param {...Name[]} names Arbitrary parameter of state `names` to sets to `true`.
   * @returns {this}
   */
  public true<Name extends Names>(...names: Name[]): this {
    this.updateNames(names, () => true);
    return this;
  }

  /**
   * @description Updates the state of the specified `names` with the `valueFn`.
   * @private
   * @param {Names[]} [names=[]]
   * @param {(name: Names) => boolean} callbackFn The function to update the value under the specified `name`.
   * @returns {this}
   */
  private updateNames(names: Names[] = [], callbackFn: (name: Names) => boolean): this {
    names.length > 0 && this.update(
      (names.length > 0 ? names : Object.keys(this.state) as Names[]).reduce<Partial<{[Name in Names]: boolean}>>(
        (partial, name) => (Object.assign(partial, { [name]: callbackFn(name) }), partial), {}
      )
    );
    return this;
  }
}
