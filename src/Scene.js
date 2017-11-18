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
     * @protected
     */
    this.loader = new PIXI.loaders.Loader();
  }

  /**
   * 
   * @param {number} delta 
   */
  move(delta) {
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
    this.loader.destroy();
  }
  /**
   * 
   * @param {PIXI.WebGLRenderer} renderer 
   */
  draw(renderer) {
    renderer.render(this.stage);
  }
}