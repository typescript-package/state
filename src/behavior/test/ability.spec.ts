import { Ability } from "../lib";

describe(`Ability`, () => {
  class Connection extends Ability {}

  let connection = new Connection();

  beforeEach(() => {
    connection = new Connection(true);
  });

  
  it(`enable()`, () => {
    expect(connection.isDisabled()).toBeFalse();
    connection.enable();
    expect(connection.isDisabled()).toBeFalse();
    expect(connection.isEnabled()).toBeTrue();
  });

  it(`disable()`, () => {
    connection.disable()
    expect(connection.isDisabled()).toBeTrue();
    expect(connection.isEnabled()).toBeFalse();
  });

});
