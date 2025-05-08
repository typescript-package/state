import { Data, DataCore } from '@typescript-package/data';
import { StateStorage as AbstractStateStorage } from '../lib/state-storage.abstract';


export class StateStorage<
  Value,
  DataType extends DataCore<Value> = Data<Value>
> extends AbstractStateStorage<Value, DataType> {
  public get value(): Value {
    return 'a' as any;
  }

  public clear() {
    return this;
  }
  public destroy() {
    return this;
  }
}


const stateStorage = new StateStorage('a');

stateStorage
