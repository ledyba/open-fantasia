import * as PIXI from 'pixi.js';
import 'pixi-sound';
import Fantasia from '../Fantasia';
import Scene from '../Scene';
import Map from './field/Map'

/**
 * ローグライクのフィールド画面を表すScene
 */
export default class FieldScene extends Scene {
  private readonly map_: Map;
  constructor(fantasia: Fantasia) {
    super(fantasia);

    /** @private */
    this.map_ = new Map(40,30);

  }

  move(elapsed: number, delta: number) {
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
