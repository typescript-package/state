import { DataCore } from "@typescript-package/data";

export type DataConstructor<Value, DataType extends DataCore<Readonly<Value>>> =
  new (value: Readonly<Value>) => DataType;