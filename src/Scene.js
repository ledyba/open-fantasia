import * as PIXI from 'pixi.js';
import Fantasia from './Fantasia.js';

export default class Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    this.fantasia_ = fantasia;

    /** @type {PIXI.Container} */
    this.stage = new PIXI.Container();
  }

  /**
   * 
   * @param {number} delta 
   */
  move(delta) {
    throw new Error("Please implement move");
  }
  /**
   * 
   * @param {PIXI.WebGLRenderer} renderer 
   */
  draw(renderer) {
    renderer.render(this.stage);
  }
}