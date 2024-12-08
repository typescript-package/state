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
  }

  public deactivate() {
    super.false();
  }
}
