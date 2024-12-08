import { EnumState } from "../lib/enum-state.abstract";

enum Active {
  Yes,
  No
}

export class ActiveEnum extends EnumState<typeof Active, Active> {
  constructor(state: Active) {
    super(state, Active);
  }

}

const activeEnum = new ActiveEnum(Active.No);

console.log(activeEnum.is(Active.No));
