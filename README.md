
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
  * [`BooleanState`](#booleanstate)
  * [`EnumState`](#enumstate)
  * [`NullState`](#nullstate)
  * [`NumberState`](#numberstate)
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
  BooleanState,
  EnumState,
  NullState,
  NumberState,
  ImmutableState,
  State
} from '@typescript-package/state';
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

```

### `EnumState`

```typescript
import { EnumState } from '@typescript-package/state';

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
```

### `NullState`

```typescript
import { NullState } from '@typescript-package/state';

export class Nullified extends NullState {}

const n = new Nullified();

n.set();

console.log(`NullState`);
console.log(n.state);

n.unset();
console.log(n.state);

```

### `NumberState`

```typescript
import { NumberState } from '@typescript-package/state';

export class NumberedState extends NumberState {
  public override reset() {
    super.reset();
    return this;
  }
}

const n = new NumberedState();

const numberedState = new NumberedState();

console.log(numberedState.state);
numberedState.decrement();
console.log(numberedState.state);
numberedState.increment();
console.log(numberedState.state);
numberedState.increment(5);
console.log(numberedState.state);
numberedState.reset();
console.log(numberedState.state);
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
