// Abstract.
import { State } from "./state.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class EnumState
 * @typedef {EnumState}
 * @template {object} EnumObject
 * @template {EnumObject[keyof EnumObject]} T
 * @extends {State<T>}
 */
export abstract class EnumState<
  EnumObject extends object,
  T extends EnumObject[keyof EnumObject]
> extends State<T> {
  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {T} state
   * @param {EnumObject} enumObject
   */
  constructor(state: T, enumObject: EnumObject) {
    super(state);
  }

  public is(state: T) {
    return super.state === state;
  }
}
