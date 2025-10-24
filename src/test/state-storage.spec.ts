import { Data, DataCore } from '@typescript-package/data';
import { StateStorage as AbstractStateStorage } from '../lib/state-storage.abstract';
import { DataConstructor } from '../type';

export class DataStorage<Value> extends DataCore<Value> {
  public get value(): Value {
    return JSON.parse(localStorage.getItem('data') || 'null');
  }

  public override clear(): this {
    return localStorage.clear(), this;
  }
  public override destroy(): this {
    return this;
  }
  public set(value: Value): this {
    return localStorage.setItem('data', JSON.stringify(value)), this;
  }
}

export class StateStorage<
  Value,
  DataType extends DataStorage<Value> = DataStorage<Value>
> extends AbstractStateStorage<Value, DataType> {

  constructor(value: Value) {
    super(value, DataStorage as unknown as DataConstructor<Value, DataType>);
  }

  public get value(): Value {
    return this.state;
  }

  public clear() {
    return super.data.clear(), this;
  }

  public destroy() {
    return super.data.destroy(), this;
  }
}

const stateStorage = new StateStorage({count: 1});

stateStorage.set({count: 2});
