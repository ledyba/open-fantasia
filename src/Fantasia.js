import * as PIXI from 'pixi.js';
import Scene from './Scene.js';
import LoadingScene from './scenes/LoadingScene';

export default class Fantasia {
  constructor() {
    /**
     * @type {PIXI.WebGLRenderer}
     * @public
     */
    this.renderer = PIXI.autoDetectRenderer(1024, 576, {antialias:true});

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
    /**
     * @type {number}
     * @private
     */
    this.sceneStarted_ = NaN;
    
    this.runner_ = this.run.bind(this);
  }
  /**
   * @param {HTMLElement} parent 
   */
  start(parent) {
    this.parent_ = parent;
    this.parent_.appendChild(this.renderer.view);
  }

  /**
   * 
   * @param {Scene} scene 
   */
  enterScene(scene) {
    if(this.scene_) {
      this.scene_.onEnd();
    }
    if(scene.loadingRequired) {
      scene = new LoadingScene(this, scene);
    }
    this.scene_ = scene;
    this.sceneStarted_ = new Date().getTime();
    if(this.scene_) {
      this.scene_.onStart();
    }
  }

  run() {
    window.requestAnimationFrame(this.runner_);
    const now = new Date().getTime();
    if(Number.isNaN(this.lastMove_)) {
      this.lastMove_ = now;
    }
    this.scene_.move(now - this.sceneStarted_, now - this.lastMove_);
    this.lastMove_ = now;
    this.scene_.draw(this.renderer);
  }
}