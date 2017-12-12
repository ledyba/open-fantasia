import * as PIXI from 'pixi.js';
import 'pixi-sound';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';
import Map from './field/Map.js'

/**
 * ローグライクのフィールド画面を表すScene
 */
export default class FieldScene extends Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    super(fantasia);

    /** @private */
    this.map_ = new Map(40,30);

  }

  /**
   * @param {number} elapsed 
   * @param {number} delta 
   * @override
   */
  move(elapsed, delta) {
    const renderer = this.fantasia.renderer;

  }

  /**
   * @override
   */
  onStart() {
    super.onStart();
  }

  /**
   * @override
   */
  onEnd() {
    super.onEnd();
  }
}
