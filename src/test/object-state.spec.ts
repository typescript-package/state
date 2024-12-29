import { ObjectState as AbstractObjectState } from "../lib/object/object-state.abstract";

export interface UserInterface {
  id: number,
  firstName: string;
  surname: string;
}

export class User<Type extends object> extends AbstractObjectState<Type> {}

const user = new User({
  id: 27,
  firstName: 'Firstname',
  surname: 'Surname'
});

user.update({'surname': 'test'});
// user.state.firstName = 'a';

console.log(user);

export class FormState<Type extends object> extends AbstractObjectState<Type> {}
