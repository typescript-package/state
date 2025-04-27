// Abstract.
import { DataCore } from "@typescript-package/data";
// Type.
import { DataConstructor } from './data-constructor.type';
/**
 * @description
 * @export
 * @template Value 
 * @template {[DataCore<Readonly<Value>>, DataCore<Readonly<Value>[]>]} DataType 
 */
export type DataConstructors<Value, DataType extends [DataCore<Readonly<Value>>, DataCore<Readonly<Value>[]>]> = Partial<[
  DataConstructor<Value, DataType[0]>,
  DataConstructor<Value[], DataType[1]>,
]>;