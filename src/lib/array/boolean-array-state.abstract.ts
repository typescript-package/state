// Abstract.
import { ArrayState } from "./array-state.abstract";
/**
 * @description Manages the `array` of `boolean` type state.
 * @export
 * @abstract
 * @class BooleanArrayState
 * @extends {ArrayState<boolean>}
 */
export abstract class BooleanArrayState extends ArrayState<boolean> {
  /**
   * Creates an instance of child class.
   * @constructor
   * @param {...boolean[]} states
   */
  constructor(...states: boolean[]) {
    super(states);
  }

  /**
   * @description Sets the specified `indexes` to `false` in the `array` state of `boolean` type.
   * @public
   * @param {...number[]} indexes Indexes to set to `false`.
   * @returns {this}
   */
  public false(...indexes: number[]): this {
    super.set(this.updateState(indexes, () => false));
    return this;
  }

  /**
   * @description Toggles the specified `indexes` between `true` and `false` in the `array` state of `boolean` type.
   * @public
   * @param {...number[]} indexes Indexes to toggle.
   * @returns {this}
   */
  public toggle(...indexes: number[]): this {
    super.set(this.updateState(indexes, (index) => !super.state[index]));
    return this;
  }

  /**
   * @description Sets the specified `indexes` to `true` in the `array` state of `boolean` type.
   * @public
   * @param {...number[]} indexes Indexes to set to `true`.
   * @returns {this}
   */
  public true(...indexes: number[]): this {
    super.set(this.updateState(indexes, () => true));
    return this;
  }

  /**
   * @description Updates the `boolean` states of the specified `indexes`.
   * @private
   * @param {number[]} indexes Indexes to update the state.
   * @param {(index: number) => boolean} state The state of `function` type to update.
   * @returns {boolean[]}
   */
  private updateState(indexes: number[], state: (index: number) => boolean): boolean[] {
    return super.state.map((value, index) => indexes.includes(index) ? state(index) : value);
  }
}
