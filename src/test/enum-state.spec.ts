import { EnumState } from "../lib/enum-state.abstract";

enum Active {
  Yes,
  No
}

export class TestEnum extends EnumState<typeof Active, Active> {
  constructor(state: Active) {
    super(state, Active);
  }

}

const enumState = new TestEnum(Active.No);

console.log(enumState.is(Active.No));
