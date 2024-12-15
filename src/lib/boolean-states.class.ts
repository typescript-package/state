// Class.
import { Boolean } from "./boolean.class";
/**
 * @description The class to handle multiple `Boolean` states of the specified names.
 * @export
 * @class BooleanStates
 * @template {string} [Names=string]
 * @template {Boolean} [Object=Boolean]
 */
export class BooleanStates<
  Names extends string = string,
  Object extends Boolean = Boolean
> {
  /**
   * @description The state object of the specified `names`.
   * @public
   * @type {{ [K in Names]: Object }}
   */
  public state: { [K in Names]: Object } = {} as any;

  /**
   * Creates an instance of `BooleanStates`.
   * @constructor
   * @param {Names[]} names The names of `Object` states.
   * @param {new (...args: any[]) => Object} [object=Boolean as unknown as new (...args: any[]) => Object]
   */
  constructor(
    names: Names[],
    object: new (...args: any[]) => Object = Boolean as unknown as new (...args: any[]) => Object
  ) {
    names.forEach((name) => this.state[name] = new object());
  }

  /**
   * @description Sets the state to `false in `Object` states of the specified `names`.
   * @public
   * @template {Names} Name
   * @param {...Name[]} names The names to set the state to `false`.
   * @returns {this}
   */
  public false<Name extends Names>(...names: Name[]): this {
    (names || Object.keys(this.state)).forEach(name => this.get(name).false());
    return this;
  }

  /**
   * @description Gets the `Object` state of the specified `name`.
   * @public
   * @template {Names} Name
   * @param {Name} name The name of generic type variable `Name` to get.
   * @returns {Object}
   */
  public get<Name extends Names>(name: Name): Object {
    if (this.state.hasOwnProperty(name)) {
      return this.state[name];
    } else {
      throw new Error(`State with name '${name}' does not exist.`);
    }
  }

  /**
   * @description Picks the states of the specified `names` into the returned `object`.
   * @public
   * @template {Names} Name
   * @param {...Name[]} names The names to pick to the returned `object`.
   * @returns {{ [Key in Name]: Object }}
   */
  public pick<Name extends Names>(...names: Name[]) {
    const result = {} as { [Key in Name]: Object };
    ((names || Object.keys(this.state)) as Name[]).reduce((acc, name) => (Object.assign(acc, {[name]: this.get(name)}), acc), result);
    return result;
  }

  /**
   * @description Toggles the state of the specified `names`.
   * @public
   * @template {Names} Name
   * @param {...Name[]} names The `names` to toggle the state.
   * @returns {this}
   */
  public toggle<Name extends Names>(...names: Name[]): this {
    (names || Object.keys(this.state)).forEach(name => this.get(name).toggle());
    return this;
  }

  /**
   * @description Sets the state to `true in `Object` states of the specified `names`.
   * @public
   * @template {Names} Name
   * @param {...Name[]} names Arbitrary list of state `names` to sets to `true`.
   * @returns {this}
   */
  public true<Name extends Names>(...names: Name[]): this {
    (names || Object.keys(this.state)).forEach(name => this.get(name).true());
    return this;
  }
}
