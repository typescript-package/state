// Abstract.
import { DataCore } from "@typescript-package/data";
/**
 * @description
 * @export
 * @template Value 
 * @template {[DataCore<Readonly<Value>>, DataCore<Readonly<Value>[]>]} DataType 
 */
export type DataConstructors<Value, DataType extends [DataCore<Readonly<Value>>, DataCore<readonly Value[]>]> = Partial<[
  new (value: Readonly<Value>) => DataType[0],
  new (value: readonly Value[]) => DataType[1]
]>;
