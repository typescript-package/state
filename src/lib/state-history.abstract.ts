// Class.
import { State } from "./state.abstract";
/**
 * @description A state with the **undo/redo** history functionality, allowing the state to be reverted to previous states, and
 * restored from **redo** history.
 * @export
 * @abstract
 * @class HistoryState
 * @template Type 
 * @extends {State<Type>}
 */
export abstract class StateHistory<Type> extends State<Type> {
  /**
   * @description A private storage for history of `WeakMap` type.
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
    StateHistory.#history.set(this, { undo: [], redo: [] });
  }

  /**
   * @inheritdoc
   * @public
   */
  public override destroy() {
    StateHistory.#history.delete(this);
    super.destroy();
  }

  /**
   * @description Sets the state to the recent state stored in the `redo` history, if exists.
   * @public
   * @returns {this} 
   */
  public redo(): this {
    const history = StateHistory.#history.get(this);
    if (history?.redo.length) {
      const nextState = history.redo.pop();
      const undoState = super.state
      history.undo.push(undoState);
      super.set(nextState);
    }
    return this;
  }

  /**
   * @description Sets the state to the recent state stored in the `undo` history, if available.
   * @public
   * @returns {this} 
   */
  public undo(): this {
    const history = StateHistory.#history.get(this);
    if (history?.undo.length) {
      const previousState = history.undo.pop();
      const redoState = super.state
      history.redo.push(redoState);
      super.set(previousState);
    }
    return this;
  }

  /**
   * @description Sets the new state, stores current in the **undo** history , and clears the **redo** history.
   * @protected
   * @param {Type} state The state to set of `Type`.
   * @returns {this} 
   */
  protected override set(state: Type): this {
    if (super.isLocked()) {
      throw new Error('Cannot set history when object is locked.');
    }
    const history = StateHistory.#history.get(this);
    if (history) {
      history.undo.push(super.state);
      history.redo.length = 0;
    }
    super.set(state);
    return this;
  }
}
