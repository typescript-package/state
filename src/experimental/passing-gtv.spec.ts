
type GetValue<C extends StateConfig<any, any, any, any, any, any, any>> = C extends StateConfig<infer V, any, any, any, any, any, any> ? V : never;
type GetDataType<C extends StateConfig<any, any, any, any, any, any, any>> = C extends StateConfig<any, any, infer D, any, any, any, any> ? D : never;

type GetSize<C extends StateConfig<any, any, any, any, any, any, any>> = C extends StateConfig<any, infer D, any, any, any, any, any> ? D extends number ? D : never : never;

type GetCurrentType<C extends StateConfig<any, any, any, any, any, any, any>> = C extends StateConfig<any, any, any, any, infer Cur, any, any> ? Cur : never;
type GetRedoType<C extends StateConfig<any, any, any, any, any, any, any>> = C extends StateConfig<any, any, any, any, any, infer R, any> ? R : never;
type GetUndoType<C extends StateConfig<any, any, any, any, any, any, any>> = C extends StateConfig<any, any, any, any, any, any, infer U> ? U : never;


interface StateConfig<
  Value,
  Size extends number,
  DataType extends DataCore<Value>,
  HistoryData extends DataCore<readonly Value[]>,
  CurrentType extends HistoryCurrent<Value, HistoryData>,
  RedoType extends HistoryCore<Value, Size, HistoryData>,
  UndoType extends HistoryCore<Value, Size, HistoryData>
> {
  value?: Value,
  size?: Size,
  dataType?: DataType;
}

class State1<C extends StateConfig<any, any, any, any, any, any, any>> {
  readonly value!: GetValue<C>;
  readonly data!: GetDataType<C>;
  readonly current!: GetCurrentType<C>;
  readonly redo!: GetRedoType<C>;
  readonly undo!: GetUndoType<C>;
  readonly size!: GetSize<C>;

  constructor(config: C) {
    // this.value = config.value;
  }
}

const a = new State1({value: ['a', 27], size: 'll'} as const);
a.size //  (property) State1<{ value: (string | number)[]; }>.value: (string | number)[]



type NumericLiteral = number & { readonly __brand?: unique symbol };

interface StateConfig<
  Value,
  Size extends NumericLiteral,
  ...
> { ... }
