// Abstract.
import { EnumState } from "./enum-state.abstract";
/**
 * @description
 * @export
 * @class Enum
 * @typedef {Enum}
 * @template {object} EnumObject
 * @template {EnumObject[keyof EnumObject]} Type
 * @extends {EnumState<EnumObject, Type>}
 */
export class Enum<
  EnumObject extends object,
  Type extends EnumObject[keyof EnumObject]
> extends EnumState<EnumObject, Type> {}
