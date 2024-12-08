import { BooleanState } from "../lib";

export class ActiveState extends BooleanState {
  public override get state() {
    return super.state;
  }

  public override false() {
    super.false();
    return this;
  }


  public activate() {
    super.true();
    return this;
  }

  public deactivate() {
    super.false();
    return this;
  }
}

const activeState = new ActiveState();

activeState.seal();

console.log(`--Sealed`);
console.log(activeState);
console.log(activeState.false());
console.log(activeState.activate());

activeState.freeze();

console.log(`--Frozen`);
console.log(activeState.activate());
console.log(activeState.false());

activeState.lock();

console.log(`--Locked`);
// console.log(activeState.activate());
// console.log(activeState.false());

