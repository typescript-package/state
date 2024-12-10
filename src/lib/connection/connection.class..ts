// Class.
import { Ability } from '../ability/ability.class';
import { Connected } from './connected.class';
import { Disconnected } from './disconnected.class';
/**
 * @description Manages the connected/disconnected state.
 * @export
 * @class Connection
 * @typedef {Connection}
 * @extends {Ability}
 */
export class Connection extends Ability {
  /**
   * @description
   * @type {*}
   */
  #connected = new Connected();

  /**
   * @description
   * @type {*}
   */
  #disconnected = new Disconnected();
  
  /**
   * @description Sets the connection state to connected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public connect(): this {
    super.isEnabled() && (this.#disconnected.false(), this.#connected.true());
    return this;
  }

  /**
   * @description Sets the connection state to disconnected if the ability is enabled.
   * @public
   * @returns {this}
   */
  public disconnect(): this {
    super.isEnabled() && (this.#disconnected.true(), this.#connected.false());
    return this;
  }

  /**
   * @description Checks whether the connection state is connected.
   * @public
   * @returns {boolean}
   */
  public isConnected(): boolean {
    return this.#connected.is();
  }

  /**
   * @description Checks whether the connection state is disconnected.
   * @public
   * @returns {boolean}
   */
  public isDisconnected(): boolean {
    return this.#disconnected.is();
  }
}
