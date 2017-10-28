import * as PIXI from 'pixi.js';

export default class Fantasia {
  constructor() {
    this.renderer = PIXI.autoDetectRenderer(800, 600);
    /** @type {HTMLElement} parent */
    this.parent = null;
    /** @type {PIXI.Container} scene */
    this.scene = null;
  }
  /**
   * @param {HTMLElement} parent 
   */
  start(parent) {
    this.parent = parent;
    this.parent.appendChild(this.renderer.view);
    this.scene = new PIXI.Container();
  }

  run() {
    window.requestAnimationFrame(this.run.bind(this));
    this.renderer.render(this.scene);
  }
}