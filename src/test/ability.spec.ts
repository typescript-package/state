import { Ability } from "../lib";


export class Connection extends Ability {}

let connection = new Connection();

describe(`Ability`, () => {
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
