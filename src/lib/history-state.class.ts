// Class.
import { State } from "./state.abstract";
/**
 * @description
 * @export
 * @abstract
 * @class HistoryState
 * @template Type 
 * @extends {State<Type>}
 */
export abstract class HistoryState<Type> extends State<Type> {
  /**
   * @description
   * @static
   * @readonly
   * @type {WeakMap}
   */
  static readonly #history = new WeakMap<any, { undo: any[], redo: any[] }>();

  /**
   * Creates an instance of `HistoryState`.
   * @constructor
   * @param {Type} initialState 
   */
  constructor(initialState: Type) {
    super(initialState);
    HistoryState.#history.set(this, { undo: [], redo: [] });
  }

  /**
   * @inheritdoc
   * @public
   */
  public override destroy() {
    HistoryState.#history.delete(this);
    super.destroy();
  }

  /**
   * @description
   * @public
   * @returns {this} 
   */
  public undo(): this {
    const history = HistoryState.#history.get(this);
    if (history?.undo.length) {
      const previousState = history.undo.pop();
      const redoState = super.state
      history.redo.push(redoState); // Save current state to redo stack

      super.set(previousState); // Set the previous state
    }
    return this;
  }

  /**
   * @description
   * @public
   * @returns {this} 
   */
  public redo(): this {
    const history = HistoryState.#history.get(this);
    if (history?.redo.length) {
      const nextState = history.redo.pop();
      const undoState = super.state
      history.undo.push(undoState); // Save current state to undo stack

      super.set(nextState); // Set the next state from redo stack
    }
    return this;
  }

  /**
   * @inheritdoc
   * @protected
   * @param {Type} state 
   * @returns {this} 
   */
  protected override set(state: Type): this {
    if (super.isLocked()) {
      throw new Error('Cannot set history when object is locked.');
    }

    // Push current state to undo stack before changing it
    const history = HistoryState.#history.get(this);
    if (history) {
      history.undo.push(super.state);  // Save the current state before modification
      history.redo.length = 0; // Clear redo history when a new state is set
    }
    // Set the state.
    super.set(state);
    return this;
  }
}
