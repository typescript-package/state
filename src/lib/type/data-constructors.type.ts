export type DataConstructors<Value, DataType extends any[]> = Partial<[
  new (state: Value) => DataType[0],
  new (state: Value[]) => DataType[1]
]>;