// Abstract.
import { ObjectState } from "./object-state.abstract";
/**
 * @description The `abstract class` handles the `object` state with the specified `names`.
 * @export
 * @abstract
 * @class NamedObjectState
 * @template [Type=any]
 * @template {PropertyKey} [Names=PropertyKey]
 * @extends {ObjectState<{[Name in Names]: Type}>}
 */
export abstract class NamedObjectState<
  Type = any,
  Names extends PropertyKey = PropertyKey,
> extends ObjectState<{[Name in Names]: Type}> {
  /**
   * @description 
   * @public
   * @readonly
   * @type {Names[]}
   */
  public get names(): Names[] {
    return this.#names;
  }

  /**
   * @description
   * @type {Names[]}
   */
  #names: Names[];

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Names[]} names The names to 
   */
  constructor(names: Names[]) {
    super({} as {[Name in Names]: Type});
    this.#names = names;
  }

  /**
   * @inheritdoc
   * @public
   * @template {Names} Name
   * @param {Name} name
   * @returns {Type}
   */
  public override get<Name extends Names>(name: Name): Type {
    return super.get(name);
  }

  /**
   * @inheritdoc
   * @public
   * @template {Names} Name
   * @param {...Name[]} names
   * @returns {Pick<{[Name in Names]: Type}, Name>}
   */
  public override pick<Name extends Names>(...names: Name[]): Pick<{[Name in Names]: Type}, Name> {
    return super.pick(...names);
  }
}
