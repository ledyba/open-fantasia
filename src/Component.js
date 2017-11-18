import * as PIXI from 'pixi.js';

export default class Component {
  /**
   * 
   * @param {PIXI.Container} parent
   * @param {PIXI.DisplayObject} container
   */
  constructor(parent, container) {
    /**
     * @type {PIXI.Container} 
     * @protected
     */
    this.parent = parent;
    /**
     * @type {PIXI.Container}
     * @protected
     */
    this.container = container || new PIXI.Container();
  }

  /**
   * 
   * @param {number} delta 
   */
  move(delta) {
    throw new Error("Please implement move");
  }

  enter() {
    this.parent.addChild(this.container);
  }

  leave() {
    this.parent.removeChild(this.container);
  }
}