import * as PIXI from 'pixi.js';
import Scene from './Scene.js';

export default class Fantasia {
  constructor() {
    /**
     * @type {PIXI.WebGLRenderer}
     * @public
     */
    this.renderer = PIXI.autoDetectRenderer(800, 600);

    /**
     * @type {HTMLElement}
     * @private
     */
    this.parent_ = null;

    /**
     * @type {Scene}
     * @private
     */
    this.scene_ = null;

    /**
     * @type {number}
     * @private
     */
    this.lastMove_ = NaN;

    this.runner_ = this.run.bind(this);
  }
  /**
   * @param {HTMLElement} parent 
   */
  start(parent) {
    this.parent_ = parent;
    this.parent_.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
  }

  /**
   * 
   * @param {Scene} scene 
   */
  enterScene(scene) {
    this.scene_ = scene;
  }

  run() {
    window.requestAnimationFrame(this.runner_);
    this.scene_.draw(this.renderer);
    const now = new Date().getTime();
    if(Number.isNaN(this.lastMove_)) {
      this.lastMove_ = now;
    }
    const delta = now - this.lastMove_;
    this.scene_.move(delta);
    this.lastMove_ = now;
  }
}