import { NamedArrayState as AbstractNamedArrayState } from "../../lib";


export class Profile<
  Names extends string,
  Type
> extends AbstractNamedArrayState<Names, Type> {}


let namedArrayState = new Profile(['firstname', 'surname', 'age'], ['Name', 'Valkovitz', 39]);


// namedArrayState.