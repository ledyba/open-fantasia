import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';

export default class TitleScene extends Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    super(fantasia);
    const text = new PIXI.Text("オープンファンタジア", {fill: '0xffffffff'});
    this.stage.addChild(text);
    text.anchor.x = 0.5;
    text.x = fantasia.renderer.width/2;
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
