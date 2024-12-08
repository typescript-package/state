/**
 * @description Manages the immutability states of `this` current instance.
 * @export
 * @abstract
 * @class ImmutableState
 * @typedef {ImmutableState}
 */
export abstract class ImmutableState {
  /**
   * @description Privately stored locked state as 'locked' if locked, otherwise `undefined`.
   * @type {?'locked'}
   */
  #state?: 'locked';

  /**
   * @description "Prevents the modification of existing property attributes and values, and prevents the addition of new properties."
   * @public
   * @returns {this}
   */
  public freeze(): this {
    if (this.isLocked()) {
      throw new Error('Cannot freeze a locked object.');
    }
    Object.freeze(this);
    return this;
  }

  /**
   * @description Checks whether `this` current instance is frozen.
   * @public
   * @returns {boolean}
   */
  public isFrozen(): boolean {
    return Object.isFrozen(this);
  }

  /**
   * @description Checks whether the current instance is locked.
   * @public
   * @returns {"locked"}
   */
  public isLocked() {
    return this.#state === 'locked';
  }

  /**
   * @description Checks whether the object is mutable.
   * @public
   * @returns {boolean} True if the object is mutable, otherwise `false`.
   */
  public isMutable(): boolean {
    return !this.isSealed() && !this.isFrozen() && !this.isLocked();
  }

  /**
   * @description Checks whether `this` current instance is sealed.
   * @public
   * @returns {boolean}
   */
  public isSealed(): boolean {
    return Object.isSealed(this);
  }

  /**
   * @description Freezes and locks the object - sets the lock state to 'locked'. The state
   * prevents changes in the private `#` variables.
   * @public
   * @returns {this}
   */
  public lock(): this {
    if (!this.isFrozen()) {
      this.freeze();
    }
    this.#state = 'locked';
    return this;
  }

  /**
   * @description "Prevents the modification of attributes of existing properties, and prevents the addition of new properties."
   * @public
   * @returns {this}
   */
  public seal(): this {
    if (this.isLocked()) {
      throw new Error('Cannot seal a locked object.');
    }
    Object.seal(this);
    return this;
  }
}