import { Ability, Boolean as Checked, Boolean as Disabled, NamedArrayState } from "../lib";

export class Checkbox extends Ability {
  private checked = new Checked();

  constructor(checked: boolean, enabled: boolean = true) {
    super(enabled);

    checked && this.checked.true();
  }
}


const checkbox = new Checkbox(false);

console.log(`Checkbox`, checkbox.disable());


// NamedArrayState

class AppConfiguration extends NamedArrayState<'theme' | 'language' | 'notifications', string | boolean> {
  constructor() {
    super(
      ['theme', 'language', 'notifications'], // Names of the configuration settings
      ['dark', 'en', true]                    // Default values
    );
  }

  /**
   * Updates the value of a specific configuration by name.
   * @param {string} name - The name of the configuration to update.
   * @param {string | boolean} value - The new value to set.
   */
  public updateConfiguration(name: 'theme' | 'language' | 'notifications', value: string | boolean) {
    this.update(this.indexOf(name), value);
  }
}

const config = new AppConfiguration();

console.group(`NamedArrayState`);

// View the current state as an object
console.log(config.toObject()); // Output: { theme: 'dark', language: 'en', notifications: true }

// Get the value of a specific setting
console.log(config.get('theme')); // Output: 'dark'

// Update a specific configuration setting
config.updateConfiguration('theme', 'light');
console.log(config.get('theme')); // Output: 'light'

// Selecting multiple configuration options
const selectedValues = config.select('theme', 'language');
console.log(selectedValues); // Output: ['light', 'en']

// Retrieve state with names as tuples
console.log(config.stateWithNames); // Output: [['theme', 'light'], ['language', 'en'], ['notifications', true]]

// Reset the configuration state to its initial values
config.reset();
console.log(config.toObject()); // Output: { theme: 'dark', language: 'en', notifications: true }

console.groupEnd();
