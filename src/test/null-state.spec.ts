import { NullState } from "../lib/null-state.abstract";


export class Nullified extends NullState {}

const n = new Nullified();

n.state


