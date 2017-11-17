import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';

export default class MenuScene extends Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    super(fantasia);
    const text = new PIXI.Text("zoi", {fill: '0xffffffff'});
    this.stage.addChild(text);
    text.x = 30;
    text.y = 90;
  }

  /**
   * 
   * @param {number} delta 
   */
  move(delta) {
    /** @type {PIXI.Text} */
    const text = this.stage.getChildAt(0);
    text.text = delta.toString();
  }
}
