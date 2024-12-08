// Abstract.
import { State } from "./state.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class NullState
 * @typedef {NullState}
 * @extends {State<null | undefined>}
 */
export abstract class NullState extends State<null | undefined> {
  /**
   * Creates an instance of parent class.
   * @constructor
   * @param {?null} [state]
   */
  constructor(state?: null) {
    super(state);
  }

  /**
   * @description
   * @public
   * @returns {boolean}
   */
  public isNull() {
    return super.state === null;
  }

  /**
   * @inheritdoc
   * @public
   * @param {?null} [state]
   * @returns {this}
   */
  public override set() {
    super.set(null);
    return this;
  }

  /**
   * @description
   * @public
   * @returns {this}
   */
  public unset() {
    super.set(undefined);
    return this;
  }
}








































// export abstract class NullState<T> {
//   private state: T | null;

//   constructor(initialState: T | null = null) {
//     this.state = initialState;
//   }

//   public get value(): T | null {
//     return this.state;
//   }

//   public set(value: T): this {
//     this.state = value;
//     return this;
//   }

//   public clear(): this {
//     this.state = null;
//     return this;
//   }
// }
