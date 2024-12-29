import { Ability, Boolean as Checked, Boolean as Disabled } from "../lib";

export class Checkbox extends Ability {
  private checked = new Checked();

  constructor(checked: boolean, enabled: boolean = true) {
    super(enabled);

    checked && this.checked.true();
  }
}


const checkbox = new Checkbox(false);

console.log(`Checkbox`, checkbox.disable());
