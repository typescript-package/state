// Abstract.
import { State } from "./state.abstract";
/**
 * @description Handles the `enum` type state.
 * @export
 * @abstract
 * @class EnumState
 * @template {object} EnumObject
 * @template {EnumObject[keyof EnumObject]} Type
 * @extends {State<Type>}
 */
export abstract class EnumState<
  EnumObject extends object,
  Type extends EnumObject[keyof EnumObject]
> extends State<Type> {
  /**
   * Creates an instance of child class.
   * @constructor
   * @param {Type} state
   * @param {EnumObject} enumObject
   */
  constructor(state: Type, enumObject: EnumObject) {
    super(state);
  }

  /**
   * @description Checks whether the state is of the specific enum.
   * @public
   * @param {Type} state The specific enum to check whether state is.
   * @returns {boolean}
   */
  public is(state: Type) {
    return super.state === state;
  }
}
