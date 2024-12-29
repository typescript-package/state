import { EnumState } from "../lib/enum";

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

console.group('EnumState');
console.log(activeEnum.is(Active.No));
console.groupEnd();
