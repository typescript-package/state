import { SelectablePrivate } from '../lib/selectable/selectable-private.abstract';

export class Checkbox extends SelectablePrivate {}

let checkbox = new Checkbox(true);

describe(`Selectable`, () => {
  beforeEach(() => {
    checkbox = new Checkbox(undefined, true);
  });

  it(`enable()`, () => {
    expect(checkbox.isDisabled()).toBeFalse();
    checkbox.enable();
    expect(checkbox.isDisabled()).toBeFalse();
    expect(checkbox.isEnabled()).toBeTrue();
  });

  it(`disable()`, () => {
    checkbox.disable()
    expect(checkbox.isDisabled()).toBeTrue();
    expect(checkbox.isEnabled()).toBeFalse();
  });

  it(`isSelected()`, () => {
    expect(checkbox.isSelected()).toBeFalse();
  });

  it(`deselect)`, () => {
    checkbox.deselect();
    expect(checkbox.isSelected()).toBeFalse();
  });

  it(`select()`, () => {
    checkbox.deselect();
    expect(checkbox.isSelected()).toBeFalse();
    checkbox.select();
    expect(checkbox.isSelected()).toBeTrue();
  });

  it(`toggle()`, () => {
    expect(checkbox.isSelected()).toBeFalse();
    checkbox.toggle();
    expect(checkbox.isSelected()).toBeTrue();
    checkbox.toggle();
    expect(checkbox.isSelected()).toBeFalse();
  });
});
