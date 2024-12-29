
<a href="https://www.typescriptlang.org/">
  <img
    src="https://raw.githubusercontent.com/typescript-package/core/refs/heads/main/ts-package-barcode-logo-512.png"
    width="20%"
    title="@typescript-package/state"
  />
</a>

## typescript-package/state

Simple state management for TypeScript.

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

<br>

## Table of contents

* [Installation](#installation)
* [Api](#api)
  * [`Ability`](#ability)
  * [`ArrayState`](#arraystate)
  * [`BooleanArrayState`](#booleanarraystate)
  * [`NamedArrayState`](#namedarraystate)
  * `NamedBooleanArrayState`
  * `Boolean`
  * [`BooleanState`](#booleanstate)
  * `Enum`
  * [`EnumState`](#enumstate)
  * [`BooleanActionObjectState`](#booleanactionobjectstate)
  * `BooleanObjectState`
  * `NamedObjectState`
  * `ObjectState`
  * `ImmutableState`
  * [`NullState`](#nullstate)
  * [`NumberState`](#numberstate)
  * `State`
* [Immutability](#immutability)
  * [Sealed](#sealed)
  * [Frozen](#frozen)
  * [Locked](#locked)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)

## Installation

```bash
npm install @typescript-package/state
```

## Api

```typescript
import {
  Ability,

  // Array.
  ArrayState,
  BooleanArrayState,
  NamedArrayState,
  NamedBooleanArrayState,

  // Boolean.
  Boolean,
  BooleanState,

  // Enum.
  Enum,
  EnumState,

  // Object.
  BooleanActionObjectState,
  BooleanObjectState,
  NamedObjectState,
  ObjectState,

  NullState,
  NumberState,
  ImmutableState,
  State
} from '@typescript-package/state';
```

### `Ability`

```typescript
import { Ability } from '@typescript-package/state';

// Extend the Ability class for a specific type
export class Connection extends Ability {}

// Initialize the connection.
const connection = new Connection();

// Disables the connection.
connection.disable();
connection.isDisabled();

// Enables the connection.
connection.enable();
connection.isEnabled();
```

### `ArrayState`

```typescript
import { ArrayState } from '@typescript-package/state';

// Extend the ArrayState class for a specific type
export class Numbers extends ArrayState<number> {
  // Additional custom methods specific to Numbers can be added if needed
}

// Initialize `Numbers`.
const numbers = new Numbers([27, 28, 29]);

// Append a number to the array state
numbers.append(30);
console.log(numbers.state); // Output: [27, 28, 29, 30]

// Insert a number at a specific index
numbers.insert(2, 99);
console.log(numbers.state); // Output: [27, 28, 99, 29, 30]

// Remove a number by index
numbers.remove(1);
console.log(numbers.state); // Output: [27, 99, 29, 30]

// Pick specific indexes
const picked = numbers.pick(0, 2);
console.log(picked); // Output: [27, 29]

// Swap two elements
numbers.swap(1, 3);
console.log(numbers.state); // Output: [27, 30, 29, 99]

// Reset the state to its initial state
numbers.reset();
console.log(numbers.state); // Output: [27, 28, 29]
```

A simple queue implementation.

```typescript
import { ArrayState } from '@typescript-package/state';

// Extend the ArrayState class for a specific type
export class Queue extends ArrayState<number> {
  /**
   * Adds an item to the end of the queue (enqueue operation).
   * @param {number} value - The number to add to the queue.
   * @returns {this}
   */
  public enqueue(value: number): this {
    return this.append(value);
  }

  /**
   * Removes and returns the item at the front of the queue (dequeue operation).
   * @returns {number | undefined} - The dequeued number or undefined if the queue is empty.
   */
  public dequeue(): number | undefined {
    const front = this.first();
    this.remove(0); // Remove the first element
    return front;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   * @returns {number | undefined} - The number at the front of the queue.
   */
  public peek(): number | undefined {
    return this.first();
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean} - True if the queue is empty, false otherwise.
   */
  public isEmpty(): boolean {
    return this.length === 0;
  }
}

// Initialize `Queue`.
const queue = new Queue([27, 28, 29]);

// Enqueue a number
queue.enqueue(30);
console.log(queue.state); // Output: [27, 28, 29, 30]

// Dequeue a number
const dequeued = queue.dequeue();
console.log(dequeued); // Output: 27
console.log(queue.state); // Output: [28, 29, 30]

// Peek at the front of the queue
const front = queue.peek();
console.log(front); // Output: 28

// Check if the queue is empty
console.log(queue.isEmpty()); // Output: false

// Dequeue all items
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue.isEmpty()); // Output: true
```

### `BooleanArrayState`

```typescript
import { BooleanArrayState as AbstractBooleanArrayState } from '@typescript-package/state';

// Extend the AbstractBooleanArrayState class for a specific type
export class BooleanArrayState extends AbstractBooleanArrayState {
  // Additional custom methods specific to BooleanArrayState can be added if needed
}

let booleanArrayState = new BooleanArrayState(false, false, true, true);

// Sets all values to `false`.
booleanArrayState.false();
console.log(booleanArrayState.state); // Output: [false, false, false, false]

// Toggles all values to `true`.
booleanArrayState.toggle();
console.log(booleanArrayState.state); // Output: [true, true, true, true]

// Toggles all values to `false`.
booleanArrayState.toggle();
console.log(booleanArrayState.state); // Output: [false, false, false, false]

// Sets all values to `true`.
booleanArrayState.true();
console.log(booleanArrayState.state); // Output: [true, true, true, true]
```

### `NamedArrayState`

```typescript
import { NamedArrayState } from '@typescript-package/state';

// Extend the NamedArrayState class for a specific type
export class AppConfiguration extends NamedArrayState<'theme' | 'language' | 'notifications', string | boolean> {
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

// Initialize.
const config = new AppConfiguration();

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

// Reset the configuration state to its initial value
config.reset();
console.log(config.toObject()); // Output: { theme: 'dark', language: 'en', notifications: true }
```

### `BooleanState`

```typescript
import { BooleanState } from '@typescript-package/state';

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

// Initialize.
const activeState = new ActiveState();

// Deactivate the initial state.
activeState.deactivate();
```

### `EnumState`

```typescript
import { EnumState } from '@typescript-package/state';

// Define example enum.
enum Active {
  Yes,
  No
}

// Use the `EnumState`.
export class ActiveEnum extends EnumState<typeof Active, Active> {
  constructor(state: Active) {
    super(state, Active);
  }
}

// Initialize.
const activeEnum = new ActiveEnum(Active.No);

// Check whether enum is set to `No`.
activeEnum.is(Active.No)
```

### `BooleanActionObjectState`

```typescript
import { BooleanActionObjectState } from '@typescript-package/state';

// Extend the BooleanActionObjectState class for a specific type
export class Connection<Names extends PropertyKey, Actions extends string> extends BooleanActionObjectState<Names, Actions> {
  /**
   * Checks whether connection is connected.
   * @returns {boolean}
   */
  public isConnected() {
    return this.is("connected" as any, true);
  }
}
// Initialize the `Connection` with state `connected` and actions `connect` and `disconnect`.
const connection = new Connection(['connected'], ['connect', 'disconnect']);

// Dispatches the `connect` action.
connection.dispatch('connect');
console.log(connection.isConnected()); // Output: true

// Dispatches the `disconnect` action.
connection.dispatch('disconnect');
console.log(connection.isConnected()); // Output: false

// Dispatches the `connect` action.
connection.dispatch('connect');
console.log(connection.isConnected()); // Output: true
```

### `NullState`

```typescript
import { NullState } from '@typescript-package/state';

// Use the `NullState`.
export class Nullified extends NullState {}

// Initialize.
const nullified = new Nullified();

// Sets the state to `null`.
nullified.set();

// Sets the state to `undefined`.
nullified.unset();
```

### `NumberState`

```typescript
import { NumberState } from '@typescript-package/state';

// Use the `NumberState`.
export class NumberedState extends NumberState {
  public override reset() {
    super.reset();
    return this;
  }
}

// Initialize.
const numberedState = new NumberedState();

// Decrement state by 1.
numberedState.decrement();

// Increment state by 1.
numberedState.increment();

// Increment state by 5.
numberedState.increment(5);

// Reset state to 0.
numberedState.reset();
```

## Immutability

### Sealed

Provides structural immutability, but not value immutability. The least strict form of immutability.

### Frozen

Provides structural and shallow immutability. Stricter than seal.

### Locked

It's not native JavaScript state. Combines the features of `freeze` but extends immutability to nested structures(deep immutability).

## GIT

### Commit

* [AngularJS Git Commit Message Conventions][git-commit-angular]
* [Karma Git Commit Msg][git-commit-karma]
* [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/state
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/state
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/state
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/state
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/state/issues
  [typescript-package-forks]: https://github.com/typescript-package/state/network
  [typescript-package-license]: https://github.com/typescript-package/state/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/state/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fstate.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fstate

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
