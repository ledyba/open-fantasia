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

    this.loader.add("resources/music/TheAutumnsOurs.mp3");
  }

  /**
   * 
   * @param {number} delta 
   */
  move(delta) {
  }
}
