import * as PIXI from 'pixi.js';
import Fantasia from './Fantasia.js';

export default class Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    /**
     * @type {Fantasia}
     * @protected
     */
    this.fantasia = fantasia;

    /**
     * @type {PIXI.Container}
     * @protected
     */
    this.stage = new PIXI.Container();

    /**
     * @type {PIXI.loaders.Loader}
     * @private
     */
    this.loader_ = null;
    /**
     * @type {boolean}
     * @private
     */
    this.loaded_ = false;
  }

  /**
   * @type {PIXI.loaders.Loader}
   * @protected
   */
  get loader() {
    if(!this.loader_){
      this.loader_ = new PIXI.loaders.Loader();
      this.loader_.once('complete', () =>{
        this.loaded_ = true;
      });
    }
    return this.loader_;
  }

  /**
   * @returns {boolean}
   */
  get loadingRequired() {
    return !!this.loader_ && !this.loaded_;
  }
  
  /**
   * @param {number} elapsed 
   * @param {number} delta 
   */
  move(elapsed, delta) {
    throw new Error("Please implement move");
  }

  /**
   * シーンが開始する時に呼ばれる
   */
  onStart() {
  }

  /**
   * シーンが終わる時に呼ばれる
   */
  onEnd() {
    if(this.loader_) {
      this.loader_.destroy();
    }
  }
  /**
   * 
   * @param {PIXI.WebGLRenderer} renderer 
   */
  draw(renderer) {
    renderer.render(this.stage);
  }
}