import * as PIXI from 'pixi.js';
import Scene from './Scene.js';

export default class Fantasia {
  constructor() {
    /** @type {PIXI.WebGLRenderer} */
    this.renderer = PIXI.autoDetectRenderer(800, 600);

    /** @type {HTMLElement} */
    this.parent = null;

    /** @type {Scene} */
    this.scene = null;

    /** @type {number} */
    this.lastMove_ = NaN;

    this.runner_ = this.run.bind(this);
  }
  /**
   * @param {HTMLElement} parent 
   */
  start(parent) {
    this.parent = parent;
    this.parent.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
  }

  /**
   * 
   * @param {Scene} scene 
   */
  enterScene(scene) {
    this.scene = scene;
  }

  run() {
    window.requestAnimationFrame(this.runner_);
    this.scene.draw(this.renderer);
    const now = new Date().getTime();
    if(Number.isNaN(this.lastMove_)) {
      this.lastMove_ = now;
    }
    const delta = now - this.lastMove_;
    this.scene.move(delta);
    this.lastMove_ = now;
  }
}