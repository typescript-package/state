import { Selectable } from "../lib/selectable";
import { SelectableGroup } from "../lib/selectable/selectable-group.abstract";


// new SelectableGroup();

// Initialize individual Selectable elements
export class Checkbox extends Selectable {
  public check() {
    super.select();
  }

  public uncheck() {
    super.select();
  }
}

export class Checkboxes extends SelectableGroup<Selectable> {
  constructor(selectable: Selectable[], enabled = true) {
    super(selectable, enabled);
  }

  // You can add additional functionality if needed, for example:
  public countSelected(): number {
    return this.selectable.filter(selectable => selectable.isSelected()).length;
  }
}

const item1 = new Checkbox();
const item2 = new Checkbox();
const item3 = new Checkbox();

// Create a ConcreteSelectableGroup with the created Selectable items
const group = new Checkboxes([item1, item2, item3]);

console.log(`group`, group);
